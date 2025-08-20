import React, { useState } from 'react';
import "../styles/ForgotPassword.css";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your registered email.");
            return;
        }

        setLoading(true);
        try {
            let registeredEmail = email;
            let result = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/password/forgot-password`,
                method: "POST",
                data: { registeredEmail: registeredEmail }
            });

            if (result.data.success) {
                let token = result.data.token;
                localStorage.setItem("token", token);
                toast.success("Reset link sent to your registered email!");
                setEmail('');
            } else {
                toast.error(result.data.message || "Email not registered!");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Email Not Registered");
        }
        setLoading(false);
    };

    return (
        <div className="forgot-password-card">
            <ToastContainer />
            <h2>Forgot Password ?</h2>
            <form className="forgot-password-form" onSubmit={handleReset}>
                <div className="input-group">
                    <label htmlFor="reset-email">Registered Email</label>
                    <input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        required
                        autoComplete="email"
                    />
                </div>
                <button className="reset-btn" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Reset"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;