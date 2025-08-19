import React from "react";
import { Link } from "react-router-dom";
import "../styles/Finder.css"; // Custom styles for the Finder page
import downloadImage from "../assets/images/logo.jpeg";
import expertImage from "../assets/images/expert.png";
import costImage from "../assets/images/cost.jpeg";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Finder = () => {
    const navigate = useNavigate(); // Hook for navigation
  
    const handleBackArrow = () => {
    navigate("/"); // Navigate to HeroSection
  };

    const handleSignInClick = () => {
    navigate('/country'); // Navigate to the Login page when "Sign in" is clicked
  };

      const handleSignInClick1 = () => {
    navigate('/expert'); // Navigate to the Login page when "Sign in" is clicked
  };
  return (
    <section className="finder-section">
      {/* Back arrow */}
      <button className="back-arrow" onClick={handleBackArrow} aria-label="Go back to HeroSection">
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
      {/* Title */}
      <div className="finder-header">
        <h2>Find and Study in the Best Universities in the World</h2>
      </div>

      {/* Search Bar */}
      {/* Cards */}
      <div className="finder-cards">
        {/* University Finder Card */}
        <div className="finder-card" onClick={handleSignInClick}>
          
            <div className="card-icon">
              <img
                src={downloadImage}
                alt="University Finder"
              />
            </div>
            <h3>University Finder</h3>
          
        </div>

        {/* Connect to College Expert Card */}
        <div className="finder-card" onClick={handleSignInClick1}>
          
            <div className="card-icon">
              <img
                src={expertImage}
                alt="Connect to College Expert"
              />
            </div>
            <h3>Connect to College Expert</h3>
         
        </div>

        {/* Find Program and Cost Card */}
        <div className="finder-card">
          <Link to="/find-program">
            <div className="card-icon">
              <img
                src={costImage}
                alt="Find Program and Cost"
              />
            </div>
            <h3>Find Overall Cost</h3>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Finder;
