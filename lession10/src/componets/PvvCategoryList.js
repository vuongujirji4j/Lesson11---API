import React from 'react'

export default function PvvCategory({ renderPvvCategories, onAddNew, onPvvDelete, onPvvEdit }) {
    console.log("renderPvvCategories: ", renderPvvCategories);
    let PvvCategoriesElement = renderPvvCategories.map((PvvCategory, index) => {
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{PvvCategory.PvvId}</td>
                <td>{PvvCategory.PvvCategoryName}</td>
                <td>{PvvCategory.PvvCategoryStatus === true ? "Hiển Thị" : "Tạm Khóa"}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => PvvhandleDelete(PvvCategory.PvvId)}>Delete</button>
                    <button className='btn btn-success' onClick={() => PvvhandleEdit(PvvCategory)}>Edit</button>
                </td>
            </tr>
        )
    })
    const PvvhandleDelete = (PvvId) => {
        if (window.confirm('Bạn Có Muốn Xóa ['+PvvId+'] Không?')) {
            console.log("Delete:", PvvId);
            onPvvDelete(PvvId);
        } else {

        }
    }
    const PvvhandleEdit = (PvvCategory)=>{
        onPvvEdit(PvvCategory);
    }

    const PvvHandleAdd = () => {
        onAddNew(true);
    }
    return (
        <div className='container m-2'>
            <h2>Danh Sách Loại Sản Phẩm</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {PvvCategoriesElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={PvvHandleAdd}>Thêm Mới</button>
        </div>
    )
}