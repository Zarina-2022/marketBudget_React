import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Modal from "../components/Modal";
import "../assets/styles/editExpense.css";

const EditExpense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [showSuccessModal,setShowSuccessModal]=useState(false)
  const [form, setForm] = useState({
    price: "",
    location: "",
    title: "",
    description: "",
    date:`${year}-${month}-${date}`,
    categoryId: "",
  });
  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  if (month < 10) month = `0${month}`;
  var date = new Date().getDate();
  if (date < 10) date = `0${date}`;

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/expenses/${params.expenseId}`)
      .then((resExpense) => {
        axios
          .get("http://localhost:3004/categories")
          .then((resCat) => {
            setCategories(resCat.data);
            setExpense(resExpense.data);
            setForm(resExpense.data);
            /*    veya(tam aciklamali):
            setForm({
              price: resExpense.data.price,
              location: resExpense.data.place,
              title: resExpense.data.title,
              description: resExpense.data.description,
              date: resExpense.data.date,
              categoryId: resExpense.data.categoryId,
            });
      */
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setShowErrorModel(true);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
       /* Validation */
       if (form.price === ""
       || form.title === ""
       || form.categoryId === ""
       || form.location === ""
       || form.description === ""
       || form.categoryId === "empty"
       || form.date === "") {
       alert("All fields are required.")
       return;
   }
   // API CALL
   axios
   .put(`http://localhost:3004/expenses/${params.expenseId}`,form)
   .then((res)=>{
    setShowSuccessModal(true)
   })
   .catch((err)=>{setShowErrorModel(true)})
  };

  // erken kacis satiri:
  if (expense === null && showErrorModel === false && categories === null)
    return null;
  if (showErrorModel === true) {
    return (
      <Modal
        title="Error"
        content="Something went wrong. Please try again later."
        cancelBtn="Back to homepage"
        cancelClick={() => navigate("/")}
      />
    );
  }

  return (
    <div>
      <div>
        <Header whichPage={"EditExpense"} navigateTo="/" />
        <div className="formWrapper">
          <form onSubmit={handleSubmit}>
            <div className="formElement">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type={"number"}
                value={form.price}
                onChange={(event) =>
                  setForm({ ...form, price: event.target.value })
                }
              />
            </div>
            <div className="formElement">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type={"text"}
                value={form.place}
                onChange={(event) =>
                  setForm({ ...form, place: event.target.value })
                }
              />
            </div>
            <div className="formElement">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type={"text"}
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
              />
            </div>
            <div className="formElement">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type={"text"}
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </div>
            <div className="formElement">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type={"date"}
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
              />
            </div>
            <div className="formElement">
              <label htmlFor="Category">Category</label>
              <select
                id="Category"
                defaultValue={form.categoryId}
                onChange={(event) =>
                  setForm({ ...form, categoryId: event.target.value })
                }
              >
                <option value={"empty"}>---</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="submitBtnWrapper">
              <button className="submitBtn" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {
        showSuccessModal === true && (
          <Modal 
          title = "Successful"
          content = "The update was successful."
          cancelBtn="Back to homepage"
          cancelClick={()=>navigate("/")}
          />
        )
      }
    </div>
  );
};

export default EditExpense;
