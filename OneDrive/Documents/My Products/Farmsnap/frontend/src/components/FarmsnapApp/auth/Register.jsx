import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import summuryApi from "../../../common/summuryApi";
import { assets } from "../../../assets/assets";
import { useAuthStore } from "../../../zustandStateManagement/useAuthstore";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const {register,isSigningUp,errorMsg} = useAuthStore()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    register(formData)
    if(!errorMsg){
      navigate('/')
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center mt-5 p-4">
      <div className="bg-white shadow- drop-shadow-2xl rounded-xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img src={assets.fsIcon} alt="Farmsnap Logo" className="w-16 h-16 mb-2" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Create Your Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Username"
            required
          />
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            required
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            required
          />

          {errorMsg && <span className="text-red-500 text-sm">{errorMsg}</span>}

          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-primary text-white font-semibold rounded-lg flex items-center justify-center"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-xs text-center text-gray-600 mt-2">
            By continuing, you agree to Farmsnap’s{" "}
            <Link to="/terms" className="text-blue-600">Terms of Use</Link> and{" "}
            <Link to="/privacy" className="text-blue-600">Privacy Policy</Link>.
          </p>

          <p
            className="text-sm text-blue-600 text-center cursor-pointer mt-3"
            onClick={() => navigate("/login")}
          >
            Existing User? Log in
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
