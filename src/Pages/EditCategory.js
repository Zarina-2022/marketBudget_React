import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../assets/styles/addCategory.css";
import Modal from "../components/Modal";
import { specialCharsFunction } from "../utils/functions";

const EditCategory = () => {
    const navigate = useNavigate()
  //const params = useParams();
  const { categoryId } = useParams();
  const [categoryEdit, setCategoryEdit] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [oldName, setOldName] = useState("");
  const [modal,setModal]=useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setAllCategories(res.data);
        const myCat = res.data.find((item) => item.id === categoryId);
        /*  find metodun yerine for da kullanabiliriz:
        let myCat = null
        for(let i=0; i<res.data.length; i++){
            if(res.data[i].id === categoryId){
                myCat =res.data[i]
            }
        }
        */
        setCategoryEdit(myCat);
        setOldName(myCat.name);
      })
      .catch((err) => {
        alert("An error occur");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation

    if (categoryEdit.name === "") {
      alert("Category field cannot be empty.");
      return;
    }

    if (categoryEdit.name.length <= 2) {
      alert("Category name must be at least three letters.");
      return;
    }
    const hasCategory = allCategories.find(
      (item) => item.name.toLowerCase() === categoryEdit.name.toLowerCase()
    );
    if (hasCategory !== undefined) {
      alert("This category already exist");
      return;
    }
    if (specialCharsFunction(categoryEdit.name)) {
      alert("Only characters A-Z, a-z, 0-9 and / are allowed!");
      return
    }
    axios.put(`http://localhost:3004/categories/${categoryId}`,categoryEdit)
    .then((res)=>{
        setModal(true)
    })
    .catch((err)=>{})
  };

  if (categoryEdit === null || allCategories === null) return null;

  return (
    <div>
      <Header whichPage={"/edit-category"} navigateTo="/category-operations" />
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="formElement">
            <label htmlFor="name">Category name: </label>
            <input
              id="name"
              type={"text"}
              value={categoryEdit.name}
              onChange={(event) =>
                setCategoryEdit({ ...categoryEdit, name: event.target.value })
              }
            />
          </div>

          <div className="submitBtnWrapper">
            <button
              className="submitBtn"
              type="submit"
              disabled={
                categoryEdit.name.toLowerCase() === oldName.toLowerCase() ||
                categoryEdit.name === "" ||
                categoryEdit.name.length <= 2
                  ? true
                  : false
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {
        modal && (
            <Modal 
            title = "Successful"
                 content = "Category successfully updated" 
                 cancelBtn="Back to category operations page" 
                 cancelClick={()=>navigate("/category-operations")} 
                 hasConfirm = {false} 
            />
        )
      }
    </div>
  );
};

export default EditCategory;

// es6 ternary operator (if/else) shorthand: a = b ? true : false
