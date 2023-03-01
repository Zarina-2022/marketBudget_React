import React from "react";
import "../assets/styles/categoryList.css";
import { useNavigate, Link } from "react-router-dom";
import { uppercaseFirstLetter } from "../utils/functions";

const CategoriesList = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();
  // props'un baslangic degeri bos bor dizi

  return (
    <div className="categoriesContainer">
      <div className="categoriesWrapper">
        <p
          onClick={() => setSelectedCategory({ id: "0", name: "All" })}
          className={`categoryItem ${
            selectedCategory.id === "0" ? "categoryItemActive" : ""
          }`}
        >
          All
        </p>

        {categories.map((category) => (
          <p
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`categoryItem ${
              selectedCategory.id === category.id ? "categoryItemActive" : ""
            }`}
          >
            {uppercaseFirstLetter(category.name)}
          </p>
        ))}
        
          <Link to={"/category-operations"} className="categoryOperations">
            Category Operations &gt;&gt;
          </Link>
        
      </div>
    </div>
  );
};

export default CategoriesList;
