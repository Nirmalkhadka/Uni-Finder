import React from "react";
import "../styles/arrow.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Arrow = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBackArrow = () => {
    navigate("/"); // Navigate to after Get Started page 
  };
  return (
    <div>
      {/* Back arrow */}
      <button
        className="back-arrow"
        onClick={handleBackArrow}
        aria-label="Go back to HeroSection"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="#3f47cc"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-left"
          viewBox="0 0 24 24"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>
    </div>
  );
};
export default Arrow;
