import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const VerifyEmail2 = () => {
    let [query] = useSearchParams();
    let token = query.get("token");
    let navigate = useNavigate();

    const verifyEmail = async () => {
        if (!token) {
            toast.error("Invalid or missing token.");
            navigate("/login");
            return;
        }

        try {
            let result = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/consultant/verify-email-2`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            toast.success("Email verified successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Email verification failed.");
            navigate("/login");
        }
    };

    useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <div>
            <ToastContainer />
            <p>Verifying your email...</p>
        </div>
    );
};

export default VerifyEmail2;