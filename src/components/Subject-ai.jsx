import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Expert.css";
import HeaderAi from "./Header-Ai";
import axios from "axios";

const universities = ['Bachelor of Information Technology - Data Analytics', 'Bachelor of Information Technology - Interaction Design', 'Bachelor of Information Technology - Enterprise Systems Development', 'Bachelor of Information Technology', 'Bachelor of Information Technology - Business Information Systems Management', 'Bachelor of Information Technology - Networking and Cybersecurity', 'Bachelor of Information Technology (Computer Science)', 'Bachelor of Information Technology -BP162OPN9', 'Bachelor of Information Technology (Professional) - Available from 01/01/2024', 'Bachelor of Information Technology - 110803E', 'Master of Information Technology - Information Technology', 'Master of Information Technology/Master of Commerce (108473C)', 'Master of Information Technology - e-Commerce Systems', 'Master of Information Technology - Digital Innovation', 'Master of Information Technology - 079795G', 'Master of Information Technology', 'Master of Information Technology -(079795G)', 'Master of Information Technology (Available from 01/12/2023)', 'Master of Engineering (Telecommunication)', 'Diploma in Library and Information Technology', 'Ontario College Diploma in Computer Systems Technician – Information Technology Infrastructure and Services (Co-op)', 'Ontario College Diploma in Computer Systems Technician – Information Technology Infrastructure and Services', 'Bachelor of Technology in Information Technology', 'Ontario College Diploma in Computer Systems Technician - Information Technology Infrastructure and Services (Optional Co-op)', 'Diploma in Computer Information Technology', 'Ontario College Advanced Diploma in IT Innovation and Design (Optional Co-op)', 'Bachelor of Commerce (Honours) - Information Technology', 'Diploma in Interactive Design - User Experience', 'Diploma in IT Data Analytics', 'Honours Bachelor of Information Technology - Cybersecurity', 'Diploma in Information Technology', 'Professional Certificate in Information Technology Auditing and Assurance', 'Diploma in Business Information Technology Management', 'Professional Certificate in Information Technology for Internationally Educated Professionals', 'Bachelor of Information Technology (Honours) in Information Technology Security (Bridge)', 'Bachelors of Business Administration - Information Systems', 'Bachelor of Information Technology (Honours) in Networking and Information Technology Security', 'Bachelor of Information Technology - Information Resource Management', 'Honours Bachelor of Information Technology Design and Management', 'Bachelor of Arts in Information Technology (Honours)', 'Master of Information Technology in Network Technology', 'Master of Applied Science in Information Technology - Digital Media', 'Master of Information Technology in Digital Media', 'Master of Applied Science in Information Technology - Networking Technology', 'BSc (Hons) Information Technology and Business Information Systems (Top-up)', 'BSc (Hons) in Information Technology', 'BSc (Hons) Information Technology', 'BSc (Hons) Information Technology Management (Sandwich)', 'BSc (Hons) Information Technology Management', 'BSc (Hons) in Information Technology (Sandwich Year)', 'BSc (Hons) Information Technology Management with Foundation Year', 'BSc (Hons) Computing and Information Technology with a Foundation Year', 'BSc (Hons) Information Technology Management for Business (ITMB)', 'BSc (Hons) Management and Information Technology', 'BSc (Hons) Business Information Systems with Foundation Year', 'MSc Management (Digitalisation and Big Data)', 'MSc Computing and IT Management', 'MSc Information Technology', 'MSc in Information Technology with Management', 'MSc Information Technology with Cybersecurity', 'MSc Management of Information Technology', 'MSc in Computing and Information Technology', 'MSc Information Technology Management', 'MSc Information Technology Management with Placement Year', 'MSc/PgD/PgC - Computing and Information Technology', 'MSc Computing and IT Management with Placement', 'Bachelor of Science in Information Systems- Computer Information Technology', 'Bachelor of Science in Information Technology - Second Degree (Online)', 'Bachelor of Arts in Business Administration - Information Technology', 'Bachelor of Science in Information Technology (Online)', 'Bachelor of Science in Information Technology', 'Bachelor of Science in Computer Information Technology', 'Bachelor of Science in Computer and Information Technology', 'Bachelor of Science in Informatics - Computer Information Technology', 'Bachelor of Information Technology and Management - IT Entrepreneurship and Management', 'Bachelor of Science in Information Technology - Media Engineering', 'Bachelor of Science and Master of Science in Information Technology', 'Bachelor of Science in Information Technology Management', 'Bachelor of Science in Information Systems and Technology', 'Bachelor of Science in Business Information Technology', 'Bachelor of Applied Arts and Sciences - Information Technology', 'Bachelor of Science in Information Technology and Master of Business in Business Administration - Queens Campus', 'Bachelor of Science in Information Technology and Management', 'Master of Science in Information Technology - Computing', 'Master of Science in Information Technology', 'Master of Science in Information Technology - Management', 'Master of Science in Information Systems and Technology', 'Master of Business Administration in Information Technology Management', 'Master of Science in Information Technology and Management', 'Master of Software Development', 'Master of Information Technology and Management - Software Development', 'Master of Information Technology and Management - Information Technology Infrastructure', 'Master of Information Technology and Management', 'Master of Information Technology and Management - Smart Technology and Innovation', 'Master of Information Technology and Management - Systems Analysis', 'Master of Science in Information Technology - IT Management', 'Master of Business Administration - Information Technology', 'Master of Science in Computer Science and Information Technology - Information Technology', 'Master of Science in Big Data Analytics and Information Technology', 'Master of Science in Information Technology Management', 'Bachelor of Information and Communication Technologies - Networking and Infrastructure Pathway', 'Bachelor of Information and Communication Technologies (Software Development Pathway)', 'Bachelor of Information Technology (Invercargill)', 'Bachelor of Applied Information Technology', 'Master of Information Governance - Information Governance - Taught 120 points', 'Master of Information Governance - Information Governance (Online) - Taught 180 points', 'Master of Technology Innovation in Business', 'Postgraduate Diploma in Information Technology'];

const Subjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const { userData } = location.state || {};
  
  if (!userData) {
    return <div>Error: Data is missing from the previous page</div>;
  }
  console.log("Received userData:", location.state);

  const { country, majorLevel, scoreType, ieltsScore, toeflScore, gpa, budget } = userData;
  
  const [search, setSearch] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState(universities);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.trim() === "") {
      setFilteredUniversities(universities);
    } else {
      setFilteredUniversities(
        universities.filter((university) =>
          university.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleCourseClick = (course) => {
    setSearch(course);
  };

  const handleRemoveCourse = () => {
    setSearch("");
  };

  const handleNext = async () => {
    // Get country value from localStorage
    const countryFromLocalStorage = localStorage.getItem("country");
    let flaskUrl = '';
    if (countryFromLocalStorage === 'nepal') {
      flaskUrl = 'http://127.0.0.1:5001/api/filter_courses';  // Nepal-specific model
    } else {
      flaskUrl = 'http://127.0.0.1:5000/recommend';  // General model
    }

    console.log('Selected Flask URL:', flaskUrl);

    const countryCodeMapping = {
      "Australia": "AUS",
      "United States of America": "US",
      "United Kingdom": "UK",
      "Canada": "CAD",
      "New Zealand": "NZ"
    };

    const countryCode = countryCodeMapping[country];

    if (!countryCode) {
      console.error("Invalid country selected");
      return;
    }

    // Create the payload based on user input
    const jsonData = {
      [`country_${countryCode}`]: 1,
      [`courseLevelSimplified_${majorLevel}`]: 1,
      [`${scoreType === "IELTS" ? "ieltsMarks" : "toefl_ibt"}`]: scoreType === "IELTS" ? ieltsScore : toeflScore,
      minimumGPA: gpa,
      tuitionFeeUSD: budget,
      subject: search
    };

    console.log('Sending data to backend:', JSON.stringify(jsonData));

    try {
      // Send data directly to Flask (without going through server.js)
      const response = await axios.post(flaskUrl, jsonData);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        navigate("/ai-results", { state: { data: response.data } });
      }
    } catch (error) {
      console.error("Error sending data to API:", error);
      setError("An error occurred while processing your request. Please try again later.");
    }
  };

  return (
    <div className="expert-page">
      <HeaderAi />
      <h1>Search for the course you want to study</h1>

      <div className="search-bar1">
        <input
          type="text"
          placeholder="Enter keyword of course"
          value={search}
          onChange={handleSearchChange}
        />
        {search && (
          <button onClick={handleRemoveCourse} className="remove-btn">
            X
          </button>
        )}
      </div>

      <h2>List of Available Courses</h2>
      <div className="university-list">
        {filteredUniversities.map((university, index) => (
          <div
            key={index}
            className="university-item"
            onClick={() => handleCourseClick(university)}
          >
            {university}
          </div>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="sub-btn">
        <button
          className="next-btn1"
          onClick={() => navigate(-1)}
        >
          &#x2190; Previous
        </button>
        <button
          className="next-btn2"
          disabled={search.trim() === ""}
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Subjects;
