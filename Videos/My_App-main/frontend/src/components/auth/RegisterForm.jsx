import React, { useState } from "react";
import './RegisterForm.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    password: "",
    username: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { mobileNumber, email, password, username } = formData;
    if (!mobileNumber || !email || !password || !username) {
      setErrorMsg("All fields are required!");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setErrorMsg("Please enter a valid mobile number!");
      return;
    }

    if (!/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address!");
      return;
    }
    const BASE_URL = 'http://localhost:5000/api/auth'
    try {
        const response = await fetch(`${BASE_URL}/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
          body: JSON.stringify(formData)
        })
        const data = await response.json()
        if(!response.ok) return;
        const updatedData = { _id: data._id, username: data.username };
        console.log(updatedData);
        
        localStorage.setItem("user", JSON.stringify(updatedData));
        toast.success("Account Created Successsfully")
        navigate('/')
     } catch (error) {
        setErrorMsg(error.errorMsg)
     }
    setErrorMsg("");
   
  };

  return (
    <div className="register-form-container">
     
      <h2 className="register-form-title">Create Account</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="register-form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="register-form-input"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label className="register-form-label" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            maxLength={10}
            className="register-form-input"
            placeholder="Enter mobile number"
          />
        </div>

        <div className="mb-4">
          <label className="register-form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-form-input"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="register-form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-form-input"
            placeholder="Enter password"
          />
        </div>

     

        {errorMsg && <div className="register-form-error">{errorMsg}</div>}

        <button
          type="submit"
          className="register-form-button"
        >
          Create Account
        </button>
      </form>

      <div className="register-form-link">
        <span>Already have an account? </span>
        <a href="/login">Login here</a>
      </div>
    </div>
  );
};

export default RegisterForm;
