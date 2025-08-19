import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/expert-profile.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const MeetingDetails = () => {
    const [meetingRequests, setMeetingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const initiator = localStorage.getItem("loggedIn_email");

    const fetchMeetingRequest = async () => {
        try {
            let result = await axios({
                url: "http://localhost:8000/api/meeting/fetchMeetingRequestStudent",
                method: "POST",
                data: { initiator } // FIXED: send as object!
            });
            setMeetingRequests(result.data.result || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error fetching meeting requests");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMeetingRequest();
    }, []);

    return (
        <div className="meeting-details-container">
            <ToastContainer />
            <h2 className="meeting-title">MEETING DETAILS</h2>
            <div className="meeting-requests-list">
                {loading ? (
                    <div>Loading...</div>
                ) : meetingRequests.length === 0 ? (
                    <div className="no-meeting-message">No meeting requests found.</div>
                ) : (
                    meetingRequests.map((meeting, idx) => (
                        <div className="meeting-card with-image" key={idx}>
                            <div className="meeting-card-image-section">
                                <img
                                    src={meeting.requesteeImage || "/default-user.png"} // fallback image if needed
                                    alt={meeting.requesteeFullName}
                                    className="meeting-consultant-photo"
                                />
                            </div>
                            <div className="meeting-info">
                                <div className="meeting-details">
                                    <h3 className="consultant-name">{meeting.requesteeFullName}</h3>
                                    <p><strong>Consultant's Email:</strong> {meeting.requestee}</p>
                                    <p><strong>Meeting Date:</strong> {meeting.meetingDate?.split('T')[0]}</p>
                                    <p><strong>Meeting Time:</strong> {meeting.meetingTime}</p>
                                    <p>
                                        <strong>Meeting Status:</strong>
                                        <span className={`status-text ${meeting.meetingStatus}`}> {meeting.meetingStatus}</span>
                                    </p>
                                    {meeting.meetingLink && (
                                        <p>
                                            <strong>Meeting Link:</strong> <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">{meeting.meetingLink}</a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="home-btn-wrapper">
                <button className="homepage-btn" onClick={() => navigate("/")}>
                    HomePage
                </button>
            </div>
        </div>
    );
};

export default MeetingDetails;

