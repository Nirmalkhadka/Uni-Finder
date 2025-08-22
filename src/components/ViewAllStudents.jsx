import React, { useEffect, useState } from "react";
import "../styles/ViewAllStudents.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const ViewAllStudents = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            let result = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/admin/viewAllStudents`,
                method: "GET"
            });
            setStudents(result.data.result || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch students.");
        }
    };

    const handleDelete = async (id) => {
        try {
            let result = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/admin/deleteSpecificStudent/${id}`,
                method: "DELETE"
            });
            toast.success("Deleted Successfully!");
            fetchStudents();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete student.");
        }
    };

    return (
        <div className="view-all-students-container">
            <ToastContainer />
            <button
                className="students-back-arrow"
                onClick={() => navigate("/unifinder/login/admin/admin-dashboard")}
                aria-label="Go back to Admin Dashboard"
            >
                <FiArrowLeft size={28} />
            </button>
            <h2 className="students-title">All Students</h2>

            <div className="students-list">
                {students.length === 0 ? (
                    <div className="no-students-msg">No students found.</div>
                ) : (
                    students.map(student => (
                        <div className="student-card" key={student._id}>
                            <div className="student-profile-section">
                                <img
                                    src={student.profileImage || "/default-user.png"}
                                    alt={student.firstName}
                                    className="student-profile-img"
                                />
                            </div>
                            <div className="student-details">
                                <p><b>ID:</b> {student._id}</p>
                                <p><b>Name:</b> {student.firstName} {student.lastName}</p>
                                <p><b>Area of Interest:</b> {student.areaOfInterest || "N/A"}</p>
                                <p><b>Email:</b> {student.email}</p>
                                <p><b>Country:</b> {student.country}</p>
                            </div>
                            <button
                                className="delete-student-btn"
                                onClick={() => handleDelete(student._id)}
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

export default ViewAllStudents;