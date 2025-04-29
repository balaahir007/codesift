import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import { toast } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const BASE_URL = 'http://localhost:5000/api/auth'
    console.log(formData);
    
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/"); 
      } else {
        setErrorMsg(data.message || data.errorMsg || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="login-form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-form-input"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="login-form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-form-input"
            placeholder="Enter password"
            required
          />
        </div>

        {errorMsg && <div className="login-form-error">{errorMsg}</div>}

        <button type="submit" className="login-form-button">
          Login
        </button>
      </form>

      <div className="login-form-link">
        <span>Don't have an account? </span>
        <a href="/register">Register here</a>
      </div>
    </div>
  );
};

export default LoginForm;
