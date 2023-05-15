import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Pages/Home"
import { Order } from "./Pages/Order";

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Lambda Eats</h1>
     <ul>
      <li onClick={() => navigate("/")}>Home</li>
      <li onClick={() => navigate("/pizza")}>Order</li>
     </ul>
     <Routes>
      <Route path="" element={<Home />}/>
      <Route path="pizza" element={<Order />}/>
     </Routes>
    </>
  );
};
export default App;
