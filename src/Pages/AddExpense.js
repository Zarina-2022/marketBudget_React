import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../assets/styles/addExpense.css";
import { useNavigate } from "react-router-dom";


const AddExpense = () => {
    const navigate = useNavigate()
    // Inputun date'inde bugunku tarihi otomatik yazmasi icin:
    var year = new Date().getFullYear()
    var month = new Date().getMonth() + 1
    if (month < 10) month = `0${month}`
    var date = new Date().getDate()
    if (date < 10) date = `0${date}`

    // birden fazla input var ise baslangic degerinde obje olusturuyoruz:
    const [form, setForm] = useState({
        price: "",
        location: "",
        title: "",
        description: "",
        date: `${year}-${month}-${date}`, // year, month ve date yukarida tanimlandi
        categoryId: "",
    })

    const [categories, setCategories] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:3004/categories")
            .then((res) => {
                setCategories(res.data); // buraya gelen veri icin useState olustur
            })
            .catch((err) => { })
    }, [])

    // butona tiklandiginda defaultunu engellemek icin:
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(form);
        /* Validation */
        if (form.price === ""
            || form.title === ""
            || form.categoryId === ""
            || form.location === ""
            || form.description === ""
            || form.date === "") {
            alert("All fields are required.")
            return;
        }
        axios.post("http://localhost:3004/expenses", {
            ...form,
            id: String(new Date().getTime())
        })
            .then((res) => {
                navigate("/")
             })
            .catch((err) => { })
    }

    if (categories === null) return null;

    return (
        <div>
            <Header whichPage={"addExpense"} navigateTo="/" />
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
                    <div className="formElement">
                        <label htmlFor="price">Price</label>
                        <input id="price" type={"number"} value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
                    </div>
                    <div className="formElement">
                        <label htmlFor="location">Location</label>
                        <input id="location" type={"text"} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
                    </div>
                    <div className="formElement">
                        <label htmlFor="title">Title</label>
                        <input id="title" type={"text"} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
                    </div>
                    <div className="formElement">
                        <label htmlFor="description">Description</label>
                        <input id="description" type={"text"} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
                    </div>
                    <div className="formElement">
                        <label htmlFor="date">Date</label>
                        <input id="date" type={"date"} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
                    </div>
                    <div className="formElement">
                        <label htmlFor="Category">Category</label>
                        <select id="Category" defaultValue={categories[0].id} onChange={(event) => setForm({ ...form, categoryId: event.target.value })}>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className="submitBtnWrapper">
                        <button className="submitBtn" type="submit">Save</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddExpense

