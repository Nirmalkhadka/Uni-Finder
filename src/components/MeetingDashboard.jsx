import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/MeetingDashboard.css';
import { ToastContainer, toast } from "react-toastify";

const MeetingsDashboard = () => {
    const [pendingMeetings, setPendingMeetings] = useState([]);
    const [rejectedMeetings, setRejectedMeetings] = useState([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    let requestee = localStorage.getItem("loggedIn_email");

    let selectedDate; 
    let selectedTime; 
    let status; 
    let initiator; 

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            //----------------------Hitting the API for fetching pending meetings only (upcomming pending)-----------------------
            let fetchingPendingMeetings = await axios({
                url: `http://localhost:8000/api/meeting/fetchPendingRequestsOnly/${requestee}`,
                method: "GET"
            });

            console.log("Rejcted Meetings Fetching.....")
            //----------------------Hitting the API for fetching rejected meetings only-----------------------
            let fetchingRejectedMeetings = await axios({
                url: `http://localhost:8000/api/meeting/fetchRejectedRequestsOnly/${requestee}`,
                method: "GET"
            });

            console.log("Upcoming Meetings Fetching.....")

            //----------------------Hitting the API for fetching upcoming meetings only-----------------------
            let fetchingUpcommingMeetings = await axios({
                url: `http://localhost:8000/api/meeting/fetchUpcommingRequestsOnly/${requestee}`,
                method: "GET"
            });

            setPendingMeetings(fetchingPendingMeetings.data.result || []);
            setRejectedMeetings(fetchingRejectedMeetings.data.result || []);
            setUpcomingMeetings(fetchingUpcommingMeetings.data.result || []);

        } catch (error) {
            toast.error("Error fetching meetings.");
        } finally {
            setLoading(false);
        }
    };

    // Helpers
    const getLocalTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return "";
        // Combine and convert to local
        const combinedDateTime = new Date(`${dateStr}T${timeStr}:00+05:45`);

        const localDate = new Date(combinedDateTime);
        const localTimeString = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        return localTimeString;
    };


    const handleConfirmConnect = async (date, time, status, initiator, requesteee) => {
        selectedDate = date;
        selectedTime = time;
        status = status;
        initiator = initiator;
        

        let data = {
            initiator: initiator,
            requestee: requestee,
            meetingDate: selectedDate.split('T')[0],
            meetingTime: selectedTime,

        }
        console.log(data);
        try {
            let result = await axios({
                url: "http://localhost:8000/api/meeting/checkExistingMeeting",
                method: "PATCH",
                data: data
            });
            // console.log(result); 
            toast.success(result.data.message);

            fetchMeetings();       


        } catch (error) {
            toast.error(error.response.data.message);
        }

    }


    const handleReject = async (date, time, status, initiator, requesteee) => {
    const
      selectedDate = date;
    selectedTime = time;
    status = status;
    initiator = initiator;
    // console.log(selectedDate); 
    // console.log(selectedTime); 
    // console.log(status); 

    let data = {
      initiator: initiator,
      requestee: requestee,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      status: status
    }
    try {
      let result = await axios({
        url: "http://localhost:8000/api/meeting/rejectMeetingRequest",
        method: "PATCH",
        data: data
      });
      // console.log(result); 
      toast.success(result.data.message);

      fetchMeetings();

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  



    return (
        <div className="meetings-dashboard">
            <ToastContainer />
            {/* PENDING MEETINGS */}
            <h2 className="card-title">Pending Meetings</h2>
            <div className="meetings-card">
                {loading ? (
                    <div>Loading...</div>
                ) : pendingMeetings.length === 0 ? (
                    <div>No Pending Meetings.</div>
                ) : (
                    pendingMeetings.map((m, idx) => {
                        const datePart = m.meetingDate?.split("T")[0] || "";
                        return (
                            <MeetingCard
                                key={idx}
                                data={m}
                                status="pending"
                                localTime={getLocalTime(datePart, m.meetingTime)}
                                handleConfirmConnect = {handleConfirmConnect}
                                handleReject = {handleReject}
                            />
                        );
                    })
                )}
            </div>

            {/* REJECTED MEETINGS */}
            <h2 className="card-title">Rejected Meetings</h2>
            <div className="meetings-card">
                {loading ? (
                    <div>Loading...</div>
                ) : rejectedMeetings.length === 0 ? (
                    <div>No Rejected Meetings.</div>
                ) : (
                    // rejectedMeetings.map((m, idx) => (
                    //     <MeetingCard
                    //         key={idx}
                    //         data={m}
                    //         status="rejected"
                    //         localTime={getLocalTime(m.meetingDate, m.meetingTime)}
                    //     />
                    // ))
                    rejectedMeetings.map((m, idx) => {
                        const datePart = m.meetingDate?.split("T")[0] || "";
                        return (
                            <MeetingCard
                                key={idx}
                                data={m}
                                status="rejected"
                                localTime={getLocalTime(datePart, m.meetingTime)}
                                handleReject={handleReject}
                            />
                        );
                    })
                )}
            </div>

            {/* UPCOMING MEETINGS */}
            <h2 className="card-title">Upcoming Meetings</h2>
            <div className="meetings-card">
                {loading ? (
                    <div>Loading...</div>
                ) : upcomingMeetings.length === 0 ? (
                    <div>No Upcoming Meetings.</div>
                ) : (
                    // upcomingMeetings.map((m, idx) => (
                    //     <MeetingCard
                    //         key={idx}
                    //         data={m}
                    //         status="upcoming"
                    //         localTime={getLocalTime(m.meetingDate, m.meetingTime)}
                    //     />
                    // ))
                    upcomingMeetings.map((m, idx) => {
                        const datePart = m.meetingDate?.split("T")[0] || "";
                        return (
                            <MeetingCard
                                key={idx}
                                data={m}
                                status="accepted"
                                localTime={getLocalTime(datePart, m.meetingTime)}
                                handleReject={handleReject}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

// --- MeetingCard Component ---
const MeetingCard = ({ data, status, localTime, handleConfirmConnect, handleReject }) => (
    <div className="meeting-card">
        <div className="meeting-img-section">
            <img
                src={data.initiatorImage || "/default-user.png"}
                alt="Image"
                className="meeting-img"
            />
        </div>
        <div className="meeting-details">
            <div className="meeting-label">
                <span className="meeting-label-key">Requestor:</span> {data.initiatorFullName}
            </div>
            <div className="meeting-label">
                <span className="meeting-label-key">Email:</span> {data.initiator}
            </div>
            <div className="meeting-label">
                <span className="meeting-label-key">Area of Interest:</span> {data.initiatorAOI}
            </div>
            <div className="meeting-label">
                <span className="meeting-label-key">Country:</span> {data.initiatorCountry}
            </div>
            <div className="meeting-label">
                <span className="meeting-label-key">Meeting Date:</span> {data.meetingDate?.split("T")[0]}
            </div>
            <div className="meeting-label">
                <span className="meeting-label-key">Meeting Time:</span> {data.meetingTime}
            </div>
            <div className="meeting-label">
                <span className="meeting-label-key">Your Local Time:</span> {localTime}
            </div>
            {status === "accepted" && (
                <div className="meeting-label">
                    <span className="meeting-label-key">Meeting ID:</span> {data.meetingID}
                    <p></p>
                    <span className="meeting-label-key">Meeting Link:</span> {data.meetingLink}

                </div>
            )}
        </div>
        <div className="meeting-actions">
            {status === "pending" && (
                <>
                    <button className="confirm-btn" onClick={() => handleConfirmConnect(data.meetingDate, data.meetingTime, data.meetingStatus, data.initiator, data.requestee)}>Confirm Connect</button>
                    <button className="reject-btn" onClick={() => handleReject(data.meetingDate, data.meetingTime, data.meetingStatus, data.initiator, data.requestee)}>Reject</button>
                </>
            )}
            {/* {status === "rejected" && (
                <button className="reject-btn" disabled>Rejected</button>
            )} */}
            {status === "accepted" && (
                <button className="reject-btn-2" onClick={() => handleReject(data.meetingDate, data.meetingTime, data.meetingStatus, data.initiator, data.requestee)}>Reject</button>
            )}
        </div>
    </div>
);

export default MeetingsDashboard;
