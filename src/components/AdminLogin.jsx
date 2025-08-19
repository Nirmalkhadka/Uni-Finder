import React, { useState } from "react";
import "../styles/AdminLogin.css";

import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter email and password.");
            return;
        }
        setLoading(true);
        if(email==="admin.2025@gmail.com" && password==="unifinder-admin"){
            // alert(`Emaill is ${email} and Password is ${password}`); 
            localStorage.setItem("adminToken", "2020_UNIFINDER_2025");
            navigate("/unifinder/login/admin/admin-dashboard");  
        }
        else{
            toast.error("Invalid Login Credentials !")
        }

        setLoading(false);
    };

    return (
        <div className="admin-login-container">
            <ToastContainer />
            <div className="admin-login-card">
                <h2 className="admin-login-title">Admin Page</h2>
                <form className="admin-login-form" onSubmit={handleLogin}>
                    <div className="admin-input-group">
                        <label htmlFor="admin-email">Email</label>
                        <input
                            id="admin-email"
                            type="email"
                            value={email}
                            placeholder="Enter admin email"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="admin-input-group">
                        <label htmlFor="admin-password">Password</label>
                        <input
                            id="admin-password"
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        className="admin-login-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
