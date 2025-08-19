import React, { useState } from "react";
import "../styles/ExpetCard.css";
import Arrow from "./arrow";
const ExpertCard = ({
  profile,
  name,
  university,
  major,
  course,
  country,
  email,
  photoUrl,
  onConnect //Receive onConnect from Parent (prop drilling)
}) => {

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleConnectClick = () => {
    // Call parent's handler with expert info and selected date/time
    if (onConnect) {
      onConnect({
        profile, name, university, major, course, country, email, photoUrl,
        selectedDate, selectedTime
      });
    }
  };

  return (
    <div className="expert-card">
      <Arrow />
      <h1>Connect to Our University Experts</h1>
      <div className="expert-info-box">
        <div className="expert-css">
          <h2>{profile}</h2>

          <div className="expert-photo">
            <img src={photoUrl} alt={name} />
          </div>
          <div className="expert-details">
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
            <p>
              <strong>Email:</strong> {email}
            </p>

          </div>
          <div className="connect-section">
            <button className="connect-btn" onClick={handleConnectClick}>Connect</button>
            <div className="date-time-section">
              {/* <input type="date" />
              <input type="time" /> */}
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
