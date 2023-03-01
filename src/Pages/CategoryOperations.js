import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../assets/styles/categoryOperations.css";
import axios from "axios";
import addLight from "../assets/images/plusLight.png";
import addDark from "../assets/images/plusDark.png";
import { useNavigate,Link } from "react-router-dom";
import Modal from "../components/Modal";
import { uppercaseFirstLetter } from "../utils/functions";

const CategoryOperations = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [addBtn, setAddBtn] = useState(false);
  const [deleteModal,setDeleteModal]=useState(false)
  const [deleteCategory,setDeleteCategory]=useState("")
  const [didUpdate,setDidUpdate] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  }, [didUpdate]);

  const deleteCat=(id)=>{
    axios
    .delete(`http://localhost:3004/categories/${id}`)
    .then((res)=>{
        setDeleteModal(false)
        setDidUpdate(!didUpdate)    
    })
    .catch((err)=>{})
  }

  if (categories === null) return null;
  return (
    <div>
      <Header whichPage={"category-operations"} navigateTo="/" />
      <div className="categoryOperationsContainer">
        <button
          className="addBtn"
          onClick={() => navigate("/add-category")}
          onMouseEnter={() => setAddBtn(true)}
          onMouseLeave={() => setAddBtn(false)}
        >
          {addBtn === false ? <img src={addLight} /> : <img src={addDark} />}
        </button>

        <div className="categoryOperationsContentWrapper">
          {categories.length === 0 && (
            <p style={{marginTop:"25px",textAlign:"center",color:"red"}}>There are no registered categories yet.</p>
          )}
          {categories.length > 0 && (
            <>
              {categories.map((category) => (
                <div
                  className="categoryOperationscategoryWrapper"
                  key={category.id}
                >
                  <p>{uppercaseFirstLetter(category.name)}</p>
                  <div>
                    <button onClick={()=>{
                        setDeleteModal(true)
                        setDeleteCategory(category.id)
                    }} className="deleteBtn">Delete</button>
                    <Link to={`/edit-category/${category.id}`} className="editBtn">Edit</Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {
        deleteModal === true && (   /* deleteModal && () */
            <Modal 
            title = "Delete category"
            content = "When the category is deleted, all data belonging to the category is also deleted. Are you sure that you want to delete this category?" 
            cancelBtn="Cancel"
            cancelClick={()=>setDeleteModal(false)} 
            confirmBtn="Delete"
            confirmClick={()=>deleteCat(deleteCategory)}
            hasConfirm = {true}
            />    
        )
      }
    </div>
  );
};

export default CategoryOperations;
