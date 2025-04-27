import React from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const logoutHandler = ()=>{
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
          <button className="navbar-button" onClick={()=>navigate('/cart')}>Cart</button>
        </div>
        <div className="navbar-item">
          {
            user ? (
              <button className="navbar-button" onClick={logoutHandler}>Logout</button>
            ) : (
              <button className="navbar-button" onClick={()=>navigate('/login')}>Login</button>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
