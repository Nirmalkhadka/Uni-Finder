import React from "react";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();
    const adminToken = localStorage.getItem("adminToken");
    // Optional: Props can be used to handle click events, or use navigation

    // Handle logout logic
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/unifinder/login/admin"; // Redirect to admin login page
        // Or if using react-router-dom's useNavigate:
        // navigate("/unifinder/login/admin");
        if (onLogout) onLogout();
    };


    const onViewStudents = () => {
        if (adminToken) {
            navigate("/unifinder/login/admin/view-all-students");
        }
        else {
            navigate("/unifinder/login/admin");
        }

    }

    const onViewConsultants = () => {
        if (adminToken) {
            navigate("/unifinder/login/admin/view-all-consultants");
        }
        else {
            navigate("/unifinder/login/admin");
        }
    }

    const onViewMeetingLogs = ()=>{
        if(adminToken){
            navigate("/unifinder/login/admin/view-meeting-logs"); 
        }else{
            navigate("/unifinder/login/admin"); 
        }
    }

    return (
        <div className="admin-dashboard-container">
            <button
                className="admin-logout-btn"
                onClick={handleLogout}
                type="button"
                title="Log out"
            >
                Logout
            </button>
            <div className="admin-dashboard-card">
                <h2 className="admin-dashboard-title">Admin Dashboard</h2>
                <div className="admin-dashboard-buttons">
                    <button
                        className="admin-dashboard-btn"
                        onClick={onViewStudents}
                        type="button"
                    >
                        View All Students
                    </button>
                    <button
                        className="admin-dashboard-btn"
                        onClick={onViewConsultants}
                        type="button"
                    >
                        View All Consultants
                    </button>
                    <button
                        className="admin-dashboard-btn"
                        onClick={onViewMeetingLogs}
                        type="button"
                    >
                        View Meeting Logs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
