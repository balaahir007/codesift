import React, { useContext } from "react";
import './Navbar.css'; 
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { CartProductContext } from "../CartProductContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartProducts } = useContext(CartProductContext);

  const handleLogout = ()=>{
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="app-name">MyApp</span>
      </div>
      <div className="navbar-right">
        <div className="navbar-item">
          <button className="navbar-button cart-btn" onClick={() => navigate('/cart')}>
            <FaCartShopping />
          </button>
          {cartProducts.length > 0 && (
            <span className="cart-count">{cartProducts.length}</span>
          )}
        </div>
        <div className="navbar-item">
          <button className="navbar-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
