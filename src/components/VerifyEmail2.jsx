import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

const VerifyEmail2 = () => {
    let [query] = useSearchParams();
    let token = query.get("token");

    let navigate = useNavigate();

    const verifyEmail = async () => {
        try {
            let result = await axios({
                url: "http://localhost:8000/consultant/verify-email-2",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <>
            {/* <div><ToastContainer></ToastContainer></div> */}
        </>
    )
}

export default VerifyEmail2;