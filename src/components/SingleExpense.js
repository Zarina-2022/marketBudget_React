import React from "react";
import "../assets/styles/singleExpense.css"
import editIcon from "../assets/images/edit-icon.gif"
import deleteIcon from "../assets/images/delete.gif"

const SingleExpense = ({ expense, categories }) => {
    const myCategory=categories.find(item=>item.id === expense.categoryId)

    return (
        <div className="expenseWrapper">
            <h2 className="expenseTitle">{expense.title}</h2>
            <p className="expenseDescription">{expense.description}</p>
            <h1 className="expensePrice">{expense.price} &#8378;</h1>
            <div className="btnWrapper">
                <div>
                    <img className="expenseIcon" src={deleteIcon} />
                </div>
                <div>
                    <img className="expenseIcon" src={editIcon} />
                </div>
            </div>
            <p className="expenseCategoryName">{myCategory.name}</p>
        </div>
    )
}

export default SingleExpense