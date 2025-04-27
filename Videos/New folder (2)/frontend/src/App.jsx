import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/auth/Login";
import RegisterForm from "./components/auth/Register";
import HomePage from "./pages/HomePage";
import CartPage from "./components/common/CartPage";

const App = () => {
  return (
    <div>
      <BrowserRouter  >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
  
export default App;
