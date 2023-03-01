import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../assets/styles/addExpense.css";
import { useNavigate, Link } from "react-router-dom";
import { specialCharsFunction } from "../utils/functions";
import { formtDateForDateInput } from "../utils/functions";

const AddExpense = () => {
  const navigate = useNavigate();

  // birden fazla input var ise baslangic degerinde obje olusturuyoruz:
  const [form, setForm] = useState({
    price: "",
    location: "",
    title: "",
    description: "",
    date: formtDateForDateInput(new Date()),  // Inputun date'inde bugunku tarihi otomatik yazmasi icin
    categoryId: "",
  });

  const [categories, setCategories] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data); // buraya gelen veri icin useState olustur
      })
      .catch((err) => {});
  }, []);

  // butona tiklandiginda defaultunu engellemek icin:
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    /* Validation */
    if (
      form.price === "" ||
      form.title === "" ||
      form.categoryId === "" ||
      form.location === "" ||
      form.categoryId === "empty" ||
      form.date === ""
    ) {
      alert("All fields are required.");
      return;
    }
    
    if (specialCharsFunction(form.name)) {
      alert("Only characters A-Z, a-z, 0-9 and / are allowed!");
      return
    }
    axios
      .post("http://localhost:3004/expenses", {
        ...form,
        id: String(new Date().getTime()),
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };

  if (categories === null) return null;

  return (
    <div>
      <Header whichPage={"addExpense"} navigateTo="/" />
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
              value={form.location}
              onChange={(event) =>
                setForm({ ...form, location: event.target.value })
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
            {categories.length > 0 && (
              <>
                <label htmlFor="Category">Category</label>
                <select
                  id="Category"
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
              </>
            )}
            {categories.length <= 0 && (
              <div className="addCategory">
                <Link to={"/category-operations"}>
                  There is no category registered yet, so you must add a
                  category first &gt;&gt;
                </Link>
              </div>
            )}
          </div>

          <div className="submitBtnWrapper">
            <button className="submitBtn" type="submit" 
                disabled={categories.length <= 0 ? true : false}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
