import React,{useEffect,useState} from "react";
import Header from "./components/Header";
import CategoriesList from "./components/CategoriesList";
import axios from "axios";
import ListExpenses from "./components/ListExpenses";

function App() {
  const[expenses,setExpenses]=useState(null)
  const[categories,setCategories]=useState(null) // [] koyabiliriz
  const[selectedCategory,setSelectedCategory]=useState({
    id:"0",
    name:"All"
  })
  
  useEffect(()=>{
    axios.get("http://localhost:3004/categories")
    // basarili ise ekrana basmadan once useStatin icine cekip sakliyoruz
    .then((res)=>{
      setCategories(res.data) // useState(null) yani baslangic seviyesi null ise
    })
    .catch((err)=>{})
    axios.get("http://localhost:3004/expenses")
    .then((res)=>{
      setExpenses(res.data)
    })
    .catch((err)=>{})
  },[])

  if(categories === null || expenses === null) return null // useState(null) yani baslangic seviyesi null ise
  return (
    <div>
      <Header />
      <CategoriesList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      <ListExpenses selectedCategory={selectedCategory} categories={categories} expenses={expenses} />
    </div>
  );
}

export default App;
