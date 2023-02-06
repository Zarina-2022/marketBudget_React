import React, { useEffect, useState } from "react";
import "../assets/styles/listExpenses.css"
import SingleExpense from "./SingleExpense";
import addLight from "../assets/images/plusLight.png"
import addDark from "../assets/images/plusDark.png";
import { useNavigate } from "react-router-dom";

const ListExpenses = ({ expenses = [], categories, selectedCategory, didUpdate, setDidUpdate }) => {
    const [filteredExpenses, setFilteredExpenses] = useState(expenses)
    const [addHoveredBtn, setAddHoveredBtn] = useState(false);
    const navigate = useNavigate();

    // tum expense'lerin harcamalarini tek yerde gostermek icin:
    var total = 0
    for (let i = 0; i < expenses.length; i++) {
        total+=Number(expenses[i].price)  // ayni: total=total+expenses[i].price
    }

    // filtreleme useEffect ile yapiyoruz (her selectedCategory degistiginde)
    useEffect(() => {
        if (selectedCategory.id === "0") {
            setFilteredExpenses(expenses)
        } else {
            let tempExpenses = expenses.filter(item => item.categoryId === selectedCategory.id)
            setFilteredExpenses(tempExpenses)
        }
    }, [selectedCategory])

    return (
        <div>
            <div className="expensesContainer">
                <div className="totalPriceWrapper">
                    <p><span>Total: </span><span>{total} &euro;</span></p>
                </div>
                <button
                    onMouseEnter={() => setAddHoveredBtn(true)}
                    onMouseLeave={() => setAddHoveredBtn(false)}
                    onClick={() => navigate("/add-expense")}
                    className="addLightBtn">
                    {
                        addHoveredBtn === true ? (<img src={addDark} />) : (<img src={addLight} />)
                    }
                </button>
                <div className="expensesWrapper">
                    {
                        filteredExpenses.length === 0 ? (
                            <div className="emptyList">
                                There are no expenditures in the category you are looking for.
                            </div>
                        ) : (
                            <>
                                {
                                    filteredExpenses.map(expense => (
                                        <SingleExpense 
                                            categories={categories} 
                                            key={expense.id} 
                                            expense={expense} 
                                            didUpdate={didUpdate}
                                            setDidUpdate={setDidUpdate}  />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListExpenses