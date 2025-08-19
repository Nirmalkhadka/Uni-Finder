import React, { useState } from 'react';
import "../styles/UpdatePassword.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const token = localStorage.getItem("token");

    const userRole = localStorage.getItem("userRole");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regex for new password validation
        const validPasswordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;


        if (currentPassword === newPassword) {
            toast.error("New Password should be different than Current Password.");
            return;
        }

        if (!validPasswordPattern.test(newPassword)) {
            toast.error("Password should be 8-12 characters long containing at least 1 upper case, 1 lower case, 1 number and 1 special character");
            return;
        }
        
        if (newPassword !== confirmPassword) {
            toast.error("New Password and Confirm Password do not match.");
            return;
        }
        else {
            let data = {
                oldPassword: currentPassword,
                newPassword: newPassword
            }

            if (userRole === "consultant") {
                //localhost:8000/consultant/update-password

                try {
                    let result = await axios({
                        url: "http://localhost:8000/consultant/update-password",
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: data
                    });
                    toast.success("Password Updated Successfully !");

                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");

                    localStorage.removeItem("token");
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("loggedIn_email");
                    localStorage.removeItem("f_Name");
                    localStorage.removeItem("country");
                } catch (error) {
                    toast.error(error.response.data.message);
                }
            } else {
                try {
                    let result = await axios({
                        url: "http://localhost:8000/student/update-password",
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: data
                    });
                    toast.success("Password Updated Successfully !");

                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");

                    localStorage.removeItem("token");
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("loggedIn_email");
                    localStorage.removeItem("f_Name");
                    localStorage.removeItem("country");


                } catch (error) {
                    toast.error(error.response.data.message);
                }
            }

        }

    };

    return (
        <div className="update-password-card">
            <ToastContainer />
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit} className="update-password-form">
                <div className="input-group">
                    <label>Current Password</label>
                    <div className="input-eye-wrapper">
                        <input
                            type={showCurrent ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            placeholder="Enter current password"
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowCurrent(!showCurrent)}
                            tabIndex={0}
                            role="button"
                            aria-label="Show/hide current password"
                        >
                            {showCurrent ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

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

                <button className="update-btn" type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdatePassword;
