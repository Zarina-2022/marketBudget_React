import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../assets/styles/addCategory.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {specialCharsFunction} from "../utils/functions"

const AddCategory = () => {
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Validation */
    if (form.name === "") {
      alert("Category name is required.");
      return;
    }
    const hasCategory = categories.find(
      (item) => item.name.toLowerCase() === form.name.toLowerCase()
    );
    if (hasCategory !== undefined) {
      alert("This category already exists.");
      return;
    }
    
    if (specialCharsFunction(form.name)) {
      alert("Only characters A-Z, a-z, 0-9 and / are allowed!");
      return
    }

    axios
      .post("http://localhost:3004/categories", form)
      .then((res) => {
        navigate("/category-operations");
      })
      .catch((err) => {});
  };

  if (categories === null) return null;
  return (
    <div>
      <Header whichPage={"/add-category"} navigateTo="/category-operations" />

      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="formElement">
            <label htmlFor="name">Category name: </label>
            <input
              id="name"
              type={"text"}
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>

          <div className="submitBtnWrapper">
            <button className="submitBtn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
