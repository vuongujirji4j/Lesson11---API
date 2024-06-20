import { useEffect, useState } from 'react';
import './App.css';
import LHLCategory from './Component/TdtCategory';
import axios from "./API/LHLAPI";
import LHLCategoryForm from './Component/TdtCategoryForm';


function LHLApp() {
  // lấy dữ liệu từ api
  const [lhlCategories, setLhlCategories] = useState([]);

  const getCategories = async () => {
    try {
      const lhlCateResponse = await axios.get("LhlCategory");
      setLhlCategories(lhlCateResponse.data);
    } catch (error) {
      console.log("lỗi:", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("lhlCategories:", lhlCategories);
  }, [])

  //trạng thái form
  const [lhlCategoryIsForm, setLhlCategoryIsForm] = useState(false);
  //dữ liệu form : Add/Edit
  let lhlCategoryInit = {
    lhlId: 0,
    lhlCategoryName: "",
    lhlCategoryStatus: true,
}
  const [lhlCategoryEdit, setLhlCategoryEdit] = useState(lhlCategoryInit);
  const lhlHandleAddNew = (param) => {
    setLhlCategoryIsForm(param);
  }
  const lhlHandleCategoryCloseForm = (param) => {
    setLhlCategoryIsForm(param);
  }
  const lhlHandleCategorySubmit = (param) => {
    let id = lhlCategories[lhlCategories.length - 1].lhlId;
    console.log("Mã:", id);
    param.lhlId = id + 1;
    lhlCategories.push(param);
    setLhlCategories((prev) => {
      return [...prev];
    })
    setLhlCategoryIsForm(false);
  }
  //hàm xử lý sự kiện xóa
  const lhlhandleDelete = (lhlId)=>{
    console.log("App-Delete-lhlId:",lhlId);
    // const lhlResponse = axios.delete(`https://666c2e2e49dbc5d7145cfd4f.mockapi.io/lhlapi/lhlv1/LhlCategory/${lhlId}`);
    const lhlResponse = axios.delete(`LhlCategory/${lhlId}`);
    console.log("lhlResponse-Delete",lhlResponse);
    let lhldelete = lhlCategories.filter(x=>x.lhlId !== lhlId);
    setLhlCategories(lhldelete);
    console.log("Deleted:",lhldelete);
  }
  const lhlhandleEdit =(lhlCategory)=>{
    setLhlCategoryEdit(lhlCategory);
    setLhlCategoryIsForm(true);
  }
  return (
    <div className="container border my-3">
      <h1>Lê Hoàng Long - Call API</h1>

      <LHLCategory renderLHLCategories={lhlCategories}
        onAddNew={lhlHandleAddNew}
        onLhlDelete={lhlhandleDelete} 
        onLhlEdit={lhlhandleEdit}/>
      <hr />
      {
        lhlCategoryIsForm === true ? <LHLCategoryForm
          renderLHLCategory = {lhlCategoryEdit}
          oncloseForm={lhlHandleCategoryCloseForm}
          onCategorySubmit={lhlHandleCategorySubmit} /> : ""
      }

    </div>
  );
}
export default LHLApp;