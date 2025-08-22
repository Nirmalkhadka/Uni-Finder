import React, { useEffect, useState } from "react";
import "../styles/ViewAllConsultants.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const ViewAllConsultants = () => {
    const [consultants, setConsultants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchConsultants();
    }, []);

    const fetchConsultants = async () => {
        try {
            let result = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/admin/viewAllConsultants`,
                method: "GET"
            });
            setConsultants(result.data.result || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch consultants.");
        }
    };

    const handleDelete = async (id) => {
        try {
            let result = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/admin/deleteSpecificConsultant/${id}`,
                method: "DELETE"
            });
            toast.success("Deleted Successfully!");
            fetchConsultants();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete consultant.");
        }
    };

    return (
        <div className="view-all-consultants-container">
            <ToastContainer />
            <button
                className="consultants-back-arrow"
                onClick={() => navigate("/unifinder/login/admin/admin-dashboard")}
                aria-label="Go back to Admin Dashboard"
            >
                <FiArrowLeft size={28} />
            </button>
            <h2 className="consultants-title">All Consultants</h2>

            <div className="consultants-list">
                {consultants.length === 0 ? (
                    <div className="no-consultants-msg">No consultants found.</div>
                ) : (
                    consultants.map(consultant => (
                        <div className="consultant-card" key={consultant._id}>
                            <div className="consultant-profile-section">
                                <img
                                    src={consultant.profileImage || "/default-user.png"}
                                    alt={consultant.firstName}
                                    className="consultant-profile-img"
                                />
                            </div>
                            <div className="consultant-details">
                                <p><b>Name:</b> {consultant.firstName} {consultant.lastName}</p>
                                <p><b>University:</b> {consultant.universityName}</p>
                                <p><b>Major:</b> {consultant.major || "N/A"}</p>
                                <p><b>Course:</b> {consultant.courseName || "N/A"}</p>
                                <p><b>Country:</b> {consultant.country}</p>
                                <p><b>Email:</b> {consultant.email}</p>
                            </div>
                            <button
                                className="delete-consultant-btn"
                                onClick={() => handleDelete(consultant._id)}
                            >
                                Delete Record
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewAllConsultants;