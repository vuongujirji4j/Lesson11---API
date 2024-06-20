import React, { useEffect, useState } from 'react'
import axios from "../API/PvvAPI";

export default function PvvCategoryForm({ oncloseForm, onCategorySubmit, renderPvvCategory }) {
    //state 
    const [PvvId, setPvvId] = useState(0);
    const [PvvCategoryName, setPvvCategoryName] = useState("");
    const [PvvCategoryStatus, setPvvCategoryStatus] = useState(true);

    useEffect(() => {
        setPvvId(renderPvvCategory.PvvId);
        setPvvCategoryName(renderPvvCategory.PvvCategoryName);
        setPvvId(renderPvvCategory.PvvCategoryStatus);
    });
    const PvvHandleClose = () => {
        oncloseForm(false);
    }
    const PvvHandleSubmit = async (event) => {
        event.preventDefault();
        if (PvvId === 0) { //thêm
            let PvvCategory = {
                PvvId: 0,
                PvvCategoryName: PvvCategoryName,
                PvvCategoryStatus: PvvCategoryStatus
            }
            await axios.post("PvvCategory", PvvCategory);
            onCategorySubmit(PvvCategory);
        } else {//sửa
            let PvvCategory = {
                PvvId: PvvId,
                PvvCategoryName: PvvCategoryName,
                PvvCategoryStatus: PvvCategoryStatus
            }
            await axios.put("PvvCategory", PvvCategory);
            onCategorySubmit(PvvCategory);
        }
    }
    return (
        <div>
            <form>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" class="form-control" name='PvvCategoryName'
                        value={PvvCategoryName}
                        onChange={(ev) => setPvvCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Status</span>
                    <select className='form-control'
                        name='PvvCategoryStatus'
                        value={PvvCategoryStatus}
                        onChange={(ev) => setPvvCategoryStatus(ev.target.value)}>
                        <option value={true}>Hiển Thị</option>
                        <option value={false}>Tạm Khóa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={PvvHandleSubmit}>Ghi Lại</button>
                <button className='btn btn-danger' onClick={PvvHandleClose}>Đóng</button>
            </form>
        </div>
    )
}