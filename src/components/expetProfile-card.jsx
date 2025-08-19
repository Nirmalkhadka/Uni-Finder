import React from "react";
import '../styles/userProfile.css'; // Add the UserProfile CSS
import Arrow from "./arrow"; // Assuming you still want the Arrow component
import { useNavigate } from "react-router-dom";
const UserProfile = ({
  name,
  university,
  major,
  course,
  country,
  photoUrl,
  email, // Added email prop
}) => {
  const navigate = useNavigate();
  const viewrequest = () => {
    navigate('/send-user-profile')
  }
  return (
    <div className="user-profile">
      <Arrow />
      <div className="user-info-box">
        <div className="user-css">
          <h2 className="profile-title">Profile</h2>

          <div className="user-photo1">
            <img src={photoUrl} alt={name} />
          </div>

          <div className="user-details">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email} {/* Added email */}
            </p>
            <p>
              <strong>University:</strong> {university}
            </p>
            <p>
              <strong>Major:</strong> {major}
            </p>
            <p>
              <strong>Course:</strong> {course}
            </p>
            <p>
              <strong>Country:</strong> {country}
            </p>
          </div>

          {/* <div className="view-request-section">
            <button className="view-request-btn" onClick={viewrequest}>View Request</button>
          </div> */}

          <div className="view-meeting-buttons">
            <button className="meeting-btn" onClick={() => navigate('/send-user-profile')}>
              View Meetings
            </button>
            <button className="meeting-btn" onClick={() => navigate('/view-meeting-history')}>
              View Meeting History
            </button>
            <button className="meeting-btn" onClick={()=> navigate('/password-update')}>
              Update Password
            </button>
            <button className="meeting-btn" onClick={()=> navigate('/consultant-profile-update')}>
              Update Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
