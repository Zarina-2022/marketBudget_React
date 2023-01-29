import React from "react";
import "../assets/styles/categoryList.css"

const CategoriesList = ({ categories = [], selectedCategory, setSelectedCategory }) => { // props'un baslangic degeri bos bor dizi

    return (
        <div className="categoriesContainer">
            <div className="categoriesWrapper">
                <p onClick={() => setSelectedCategory({ id: "0", name: "All" })}
                    className={`categoryItem ${selectedCategory.id === "0" ? "categoryItemActive" : ""}`}>All</p>

                {
                categories.map((category) => (
                    <p key={category.id} 
                       onClick={() => setSelectedCategory(category)}
                       className={`categoryItem ${selectedCategory.id === category.id ? "categoryItemActive" : ""}`}>{category.name}</p>))
                }

            </div>
        </div>
    )
}

export default CategoriesList