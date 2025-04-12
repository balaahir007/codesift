import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import summuryApi from "../../../common/summuryApi";
import { assets } from "../../../assets/assets";
import { useAuthStore } from "../../../zustandStateManagement/useAuthstore";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const comingFrom = location.state?.from;
    const {login,isLoggingIngUp,errorMsg} = useAuthStore()
    
    let responsiveTextForLoginPageHeading = null
    if(comingFrom === 'chat'){
        responsiveTextForLoginPageHeading = "Please log in to chat with our Farmer's"
    }


    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData)
        if(comingFrom === 'chat'){
            navigate('/chat')
            return;

        }        
        if(!errorMsg && !comingFrom){
            navigate('/')
        }
    };
    return (
        <div className="flex justify-center items-center max-h-screen  p-4 py-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                <h1 className="text-primary items-center flex mb-4 justify-center  ">{responsiveTextForLoginPageHeading || ''}</h1>
                <div className="flex flex-col items-center">
                    <img src={assets.fsIcon} alt="Farmsnap Logo" className="w-16 h-16 mb-2" />
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Hey, Welcome Again!</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    {errorMsg && <span className="text-red-500 text-sm">{errorMsg?.error}</span>}

                    <button
                        type="submit"
                        className="w-full py-3 cursor-pointer bg-primary text-white font-semibold rounded-lg flex items-center justify-center"
                        disabled={isLoggingIngUp}
                    >
                        {isLoggingIngUp ? (
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <p className="text-xs text-center text-gray-600 mt-2">
                        By continuing, you agree to Farmsnap’s{" "}
                        <Link to="/terms" className="text-blue-600">Terms of Use</Link> and{" "}
                        <Link to="/privacy" className="text-blue-600">Privacy Policy</Link>.
                    </p>

                    <p
                        className="text-sm text-blue-600 text-center cursor-pointer mt-3"
                        onClick={() => navigate("/register")}
                    >
                        New to Farmsnap? Create an account
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
