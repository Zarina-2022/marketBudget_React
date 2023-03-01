import React,{useState} from "react";
import "../assets/styles/singleExpense.css"
import editIcon from "../assets/images/edit-icon.gif"
import deleteIcon from "../assets/images/delete.gif"
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const SingleExpense = ({ expense, categories=[], didUpdate, setDidUpdate }) => {
    const navigate = useNavigate()

    const [showDeleteModel,setShowDeleteModel] = useState(false)

    const myCategory = categories.find(item => item.id === expense.categoryId)

    const handleDelete = () => {
        axios.delete(`http://localhost:3004/expenses/${expense.id}`)
            .then((res) => {
                window.location.reload()
                //setDidUpdate(!didUpdate)
             })
            .catch((err) => { })
    }

    return (
        <div className="expenseWrapper">
            <h4 className="expenseTitle">{expense.title}</h4>
            <p className="expenseDescription">{expense.description}</p>
            <h4 className="expensePrice">{expense.price} &euro;</h4>
            <div className="btnWrapper">
                <div onClick={()=>setShowDeleteModel(true)}>
                    <img className="expenseIcon" src={deleteIcon} />
                </div>
                <div onClick={()=>navigate(`edit-expense/${expense.id}`)}>
                    <img className="expenseIcon" src={editIcon} />
                </div>
            </div>
            <p className="expenseCategoryName">{myCategory.name}</p>
            {
                showDeleteModel === true && (
                    <Modal title="DELETION" 
                    content = "Are you sure you want to delete?"
                    cancelBtn = "Cancel"
                    cancelClick = {()=>setShowDeleteModel(false)}
                    hasConfirm={true}
                    confirmBtn="Delete" 
                    confirmClick={handleDelete} />
                )
            }
        </div>
    )
}

export default SingleExpense