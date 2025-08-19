import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/expert-profile.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const SendUserProfile = () => {
  // Step 1: State for fetched meeting requests
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  let selectedDate;
  let selectedTime;
  let status;
  let initiator;
  let requestee;



  // You can keep this if you still need expertData for something else
  const location = useLocation();
  const { expertData } = location.state || { expertData: null };

  const requesteeEmail = localStorage.getItem("loggedIn_email");

  // Step 2: Fetch meeting requests from backend and update state
  const fetchCorrespondingMeetingRequest = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/api/meeting/fetchMeetingRequest",
        method: "POST",
        data: { requesteeEmail }
      });

      // Backend should return the list in result.data.result
      setMeetingRequests(result.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch meeting requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorrespondingMeetingRequest();
  }, []);

  const handleConfirmConnect = async (date, time, status, initiator, requestee) => {
    selectedDate = date;
    selectedTime = time;
    status = status;
    initiator = initiator;
    requestee = requestee; 
    // console.log(selectedDate); 
    // console.log(selectedTime); 
    // console.log(status); 

    //first search for the meeting with the above credentials that have status:accepted or not

    // const meetingDateOnly = date.split('T')[0]; 
    // const meetingTimeOnly = time; 

    // const combinedISO = `${meetingDateOnly}T${meetingTimeOnly}:00Z`; // "2025-07-19T10:00:00Z"
    // const localDate = new Date(combinedISO); 

    // const localTImeString = localDate.toLocaleTimeString([], {
    //   hour: '2-digit', 
    //   minute: '2-digit', 
    //   hour12: true
    // })

    // localTime = localTImeString; 

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

      fetchCorrespondingMeetingRequest();


    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  const handleReject = async (date, time, status, initiator, requestee) => {
    const
      selectedDate = date;
    selectedTime = time;
    status = status;
    initiator = initiator;
    requestee = requestee;
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
      toast.error(result.data.message);

      fetchCorrespondingMeetingRequest();

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  
  const meetingsWithLocalTime = meetingRequests.map((user) => {
    const dateOnly = user.meetingDate.split('T')[0];
    const timeOnly = user.meetingTime;
    const combinedISO = `${dateOnly}T${timeOnly}:00Z`;
    const localDate = new Date(combinedISO);
    const localTimeString = localDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      ...user,
      localTimeString,
      dateOnly
    };
  });

  return (
    <div className="expert-profile-container">
      <ToastContainer />
      <h2 className="title">Users Who want to Connect</h2>
      <div className="user-requests">
        {loading ? (
          <div>Loading...</div>
        ) : meetingsWithLocalTime.length === 0 ? (
          <div></div>
        ) : (
          meetingsWithLocalTime.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-info">
                <img src={user.initiatorImage} alt="image" className="user-photo" />
                <div className="user-details">
                  {/* <h2>Meeting ID: {user._id}</h2> */}
                  <h3 className="user-name">{user.initiatorFullName}</h3>
                  <p><strong>Email:</strong> {user.initiator}</p>
                  <p><strong>Area of Interest:</strong> {user.initiatorAOI}</p>
                  <p><strong>Country:</strong> {user.initiatorCountry}</p>
                  <p><strong>Meeting Date:</strong> {user.meetingDate.split('T')[0]}</p>
                  <p><strong>Meeting Time:</strong> {user.meetingTime}</p>
                  <p><strong>Your Local Time:</strong> {user.localTimeString}</p>
                  <p><strong>Meeting Status:</strong> {user.meetingStatus}</p>
                  {/* Only show the link if accepted */}
                  {user.meetingStatus === "accepted" && user.meetingLink && ( 
                    <p>
                      <strong>Meeting Link:</strong>{" "}
                      <a href={user.meetingLink} target="_blank" rel="noopener noreferrer">
                        {user.meetingLink}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              <div className="action-buttons">
                <button className="confirm-btn" onClick={() => handleConfirmConnect(user.meetingDate, user.meetingTime, user.meetingStatus, user.initiator, user.requestee)}>Confirm Connect</button>
                <button className="reject-btn" onClick={() => handleReject(user.meetingDate, user.meetingTime, user.meetingStatus, user.initiator, user.requestee)}>Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SendUserProfile;

