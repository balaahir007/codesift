import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMsg("All fields are required!");
      return;
    }

    if (!/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address!");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    const BASE_URL = "http://localhost:8000/api/auth";

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
      }
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
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
          />
        </div>

        {errorMsg && <div className="login-form-error">{errorMsg}</div>}

        <button type="submit" className="login-form-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="login-form-link">
        <span>Don't have an account? </span>
        <a href="/register">Create one here</a>
      </div>
    </div>
  );
};

export default LoginForm;
