import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/ResetPassword.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract token from URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token') || localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New Password and Confirm Password do not match.");
            return;
        }

        if (!token) {
            toast.error("Invalid or missing token.");
            return;
        }

        try {
            let result = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/password/reset-password`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                data: { newPassword }
            });

            toast.success("Password Reset Successfully!");
            setNewPassword("");
            setConfirmPassword("");
            localStorage.removeItem("token");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            toast.error(error?.response?.data?.message || "Password reset failed.");
        }
    };

    return (
        <div className="reset-password-card">
            <ToastContainer />
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="input-group">
                    <label>New Password</label>
                    <div className="input-eye-wrapper">
                        <input
                            type={showNew ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder="Enter new password"
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowNew(!showNew)}
                            tabIndex={0}
                            role="button"
                            aria-label="Show/hide new password"
                        >
                            {showNew ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                <div className="input-group">
                    <label>Confirm New Password</label>
                    <div className="input-eye-wrapper">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Re-enter new password"
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowConfirm(!showConfirm)}
                            tabIndex={0}
                            role="button"
                            aria-label="Show/hide confirm password"
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                <button className="reset-btn" type="submit">Reset</button>
            </form>
        </div>
    );
};

export default ResetPassword;