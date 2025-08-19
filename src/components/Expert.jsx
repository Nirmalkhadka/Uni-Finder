import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import '../styles/Expert.css';
import Arrow from './arrow';
const universities = [
  'UNIVERSITY OF TECHNOLOGY SYDNEY', 'QUEENSLAND UNIVERSITY OF TECHNOLOGY', 'RMIT UNIVERSITY', 
  'THE UNIVERSITY OF NEW SOUTH WALES', 'THE UNIVERSITY OF MELBOURNE', 'WESTERN SYDNEY UNIVERSITY',
  'LANGARA COLLEGE', 'SHERIDAN COLLEGE INSTITUTE OF TECHNOLOGY AND ADVANCED LEARNING', 
  'KWANTLEN POLYTECHNIC UNIVERSITY', 'CONESTOGA COLLEGE', 'BRITISH COLUMBIA INSTITUTE OF TECHNOLOGY (BCIT)', 
  'YORK UNIVERSITY', 'SAIT POLYTECHNIC', 'NOVA SCOTIA COMMUNITY COLLEGE', 'SENECA POLYTECHNIC', 
  'SASKATCHEWAN POLYTECHNIC', 'ONTARIO TECH UNIVERSITY', 'BROCK UNIVERSITY', 'CARLETON UNIVERSITY', 
  'MIDDLESEX UNIVERSITY', 'UNIVERSITY OF HERTFORDSHIRE', 'BRISTOL, UWE', 'COVENTRY UNIVERSITY', 
  'BIRMINGHAM CITY UNIVERSITY', 'UNIVERSITY OF WEST LONDON', 'LANCASTER UNIVERSITY', 
  'CANTERBURY CHRIST CHURCH UNIVERSITY', 'UNIVERSITY OF BRISTOL', 'CARDIFF UNIVERSITY', 'UNIVERSITY OF GLASGOW', 
  'UNIVERSITY OF ST ANDREWS', 'UNIVERSITY OF ABERDEEN', 'UNIVERSITY OF SUSSEX', 'SHEFFIELD HALLAM UNIVERSITY', 
  'CARDIFF METROPOLITAN UNIVERSITY', 'CALIFORNIA STATE UNIVERSITY - NORTHRIDGE', 'UNIVERSITY OF MASSACHUSETTS - LOWELL', 
  'UNIVERSITY OF LA VERNE', 'NEW YORK INSTITUTE OF TECHNOLOGY', 'FULL SAIL UNIVERSITY', 
  'NORTHERN KENTUCKY UNIVERSITY', 'INDIANA UNIVERSITY - PURDUE UNIVERSITY INDIANAPOLIS', 'ILLINOIS INSTITUTE OF TECHNOLOGY', 
  'DEPAUL UNIVERSITY', 'SETON HALL UNIVERSITY', 'UNIVERSITY OF MISSOURI', 'UNIVERSITY OF MISSOURI - ST. LOUIS', 
  'UNIVERSITY OF TAMPA', 'TEXAS A&M UNIVERSITY - CORPUS CHRISTI - INTERNATIONAL STUDY CENTER (STUDYGROUP)', 
  'NEW JERSEY INSTITUTE OF TECHNOLOGY', "ST. JOHN'S UNIVERSITY", 'UNIVERSITY AT BUFFALO - SUNY', 
  'VALPARAISO UNIVERSITY', 'SOUTHERN NEW HAMPSHIRE UNIVERSITY', 'RIVIER UNIVERSITY', 'UNIVERSITY OF TEXAS - DALLAS', 
  'CALIFORNIA STATE UNIVERSITY - FULLERTON', 'SACRED HEART UNIVERSITY', 'WORCESTER POLYTECHNIC INSTITUTE', 
  'RENSSELAER POLYTECHNIC INSTITUTE', 'FLORIDA INSTITUTE OF TECHNOLOGY', 'UNIVERSITY OF CENTRAL MISSOURI', 
  'OAKLAND UNIVERSITY', 'AUCKLAND INSTITUTE OF STUDIES NEW ZEALAND', 'ARA INSTITUTE OF CANTERBURY LIMITED', 
  'SOUTHERN INSTITUTE OF TECHNOLOGY', 'WHITIREIA NEW ZEALAND', 'WAIKATO INSTITUTE OF TECHNOLOGY', 'WHITECLIFFE', 
  'THE UNIVERSITY OF AUCKLAND', 'THE UNIVERSITY OF WAIKATO', 'AUCKLAND UNIVERSITY OF TECHNOLOGY'
];

// Randomly pick universities that have experts (for now we'll choose a few manually)
const universitiesWithExperts = [
  'QUEENSLAND UNIVERSITY OF TECHNOLOGY', 
  'WESTERN SYDNEY UNIVERSITY'
];

const Expert = () => {
  const [search, setSearch] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(universities);
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim() === '') {
      setFilteredUniversities(universities);
    } else {
      setFilteredUniversities(
        universities.filter((university) =>
          university.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleUniversityClick = (university) => {
    if (universitiesWithExperts.includes(university)) {
      // Redirect to a page for the university with experts
      const universityName = university.replace(/\s+/g, '').toLowerCase(); // Remove spaces and lowercase for URL

      localStorage.setItem("clickedUniversity", universityName); //Pushpa Raj le modify gareko line

      navigate(`/${universityName}`); // Using navigate to redirect
    } else {
      // Show a popup for universities without experts
      alert(`${university} doesn't have university expert`);
    }
  };

  return (
    <div className="expert-page">
      <Arrow/>
      <h1>Connect to Our University Experts</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter university name" 
          value={search} 
          onChange={handleSearchChange} 
        />
      </div>
      <h2>List of University Names</h2>
      <div className="university-list">
        {filteredUniversities.map((university, index) => (
          <div 
            key={index} 
            className="university-item" 
            onClick={() => handleUniversityClick(university)}
          >
            {university}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expert;
