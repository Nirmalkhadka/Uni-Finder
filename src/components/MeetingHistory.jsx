import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MeetingHistory.css";
import { toast, ToastContainer } from "react-toastify";

const MeetingHistory = () => {
    const [meetingDetails, setMeetingDetails] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const requestee = localStorage.getItem("loggedIn_email");

    const fetchMeetingHistory = async () => {
        try {
            let result = await axios({
                url: `http://localhost:8000/api/meeting/fetchMeetingLogs/${requestee}`,
                method: "GET"
            });

            // console.log(result); 
            setMeetingDetails(result.data.meetingDetails || []);
            setHistory(result.data.meetingLogs || []);

        } catch (error) {
            toast.error(error.response.data.message);
        }


    };

    useEffect(() => {
        fetchMeetingHistory();
    }, []);

    return (
        <div className="history-container">
            <ToastContainer></ToastContainer>
            <h2 className="history-title">Meeting History</h2>
            {/* {history.length === 0 ? (
                <div className="history-no-data">No meeting history found.</div>
            ) : (
                history.map((meeting, idx) => (
                    <div className="history-card" key={idx}>
                        <div className="history-label-row">
                            <span className="history-label"><b>Meeting Topic:</b></span>
                            <span className="history-value">{meeting.meetingTopic}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>Meeting ID:</b></span>
                            <span className="history-value">{meeting.meetingID}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>Requestor:</b></span>
                            <span className="history-value">{meeting.requestor}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>Requestor Email:</b></span>
                            <span className="history-value">{meeting.requestorEmail}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>Meeting Date:</b></span>
                            <span className="history-value">{meeting.meetingDate}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>Meeting Time:</b></span>
                            <span className="history-value">{meeting.meetingTime}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>Start Time:</b></span>
                            <span className="history-value">{meeting.startTime}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>End Time:</b></span>
                            <span className="history-value">{meeting.endTime}</span>
                        </div>
                        <div className="history-label-row">
                            <span className="history-label"><b>Total Duration:</b></span>
                            <span className="history-value">{meeting.totalDuration}</span>
                        </div>
                    </div>
                ))
            )}  */}


            {history.length === 0 ? (
                <div className="history-no-data">No meeting history found.</div>
            ) : (
                history.map((log, idx) => {
                    // Find the corresponding meeting detail for this log
                    const detail = meetingDetails.find(
                        md => md.meetingID === log.meetingID
                    );

                    return (
                        <div className="history-card" key={idx}>
                            <div className="history-label-row">
                                <span className="history-label"><b>Meeting Topic:</b></span>
                                <span className="history-value">{log.topic || detail?.meetingTopic}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>Meeting ID:</b></span>
                                <span className="history-value">{log.meetingID}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>Requestor:</b></span>
                                <span className="history-value">{detail?.initiatorFullName || detail?.requestor || "-"}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>Requestor Email:</b></span>
                                <span className="history-value">{detail?.initiator || detail?.requestorEmail || "-"}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>Meeting Date:</b></span>
                                <span className="history-value">{detail?.meetingDate?.split('T')[0] || "-"}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>Meeting Time:</b></span>
                                <span className="history-value">{detail?.meetingTime || "-"}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>Start Time:</b></span>
                                <span className="history-value">{log.startTime || "-"}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>End Time:</b></span>
                                <span className="history-value">{log.endTime || "-"}</span>
                            </div>
                            <div className="history-label-row">
                                <span className="history-label"><b>Total Duration:</b></span>
                                <span className="history-value">{log.duration || log.totalDuration || "-"} min</span>
                            </div>
                        </div>
                    );
                })
            )}

        </div>
    );
};

export default MeetingHistory;
