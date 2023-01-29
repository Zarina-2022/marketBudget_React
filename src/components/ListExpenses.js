import React, {useEffect,useState} from "react";
import "../assets/styles/listExpenses.css"
import SingleExpense from "./SingleExpense";

const ListExpenses = ({ expenses = [],categories, selectedCategory }) => {
    const[filteredExpenses,setFilteredExpenses]=useState(expenses)
    
    // filtreleme useEffect ile yapiyoruz (her selectedCategory degistiginde)
    useEffect(()=>{
        if(selectedCategory.id === "0"){
            setFilteredExpenses(expenses)
        }else{
            let tempExpenses = expenses.filter(item=>item.categoryId === selectedCategory.id)
            setFilteredExpenses(tempExpenses)
        }
    },[selectedCategory])

    return (
        <div className="expensesContainer">
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
                                <SingleExpense categories={categories} key={expense.id} expense={expense}/>
                              ))
                        }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ListExpenses