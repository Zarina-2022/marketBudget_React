import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Modal from "../components/Modal";

const EditExpense = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [expense, setExpense] = useState(null)
    const [showErrorModel, setShowErrorModel] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:3004/expenses/${params.expenseId}`)
            .then((res) => {
                setExpense(res.data)
            })
            .catch((err) => {
                setShowErrorModel(true)
            })
    }, [])

    // erken kacis satiri:
    if (expense === null && showErrorModel === false) return null
    if (showErrorModel === true) {
        return (
            <Modal
                title="Error"
                content="Something went wrong. Please try again later."
                cancelBtn="Back to homepage"
                cancelClick={() => navigate("/")} />
        )
    }

    return (
        <div>
            <div>
                <Header whichPage={"EditExpense"} navigateTo="/" />
            </div>

            <h1>Edit page</h1>

        </div>
    )
}

export default EditExpense