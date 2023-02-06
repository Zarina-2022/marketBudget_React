import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddExpense from "./Pages/AddExpense";
import EditExpense from "./Pages/EditExpense";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/edit-expense/:expenseId" element={<EditExpense />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
