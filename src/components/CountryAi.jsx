import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AiCountry.css"; // Importing custom styles

import usa from "../assets/images/usa.jpg";
import ca from "../assets/images/canada.jpg";
import uk from "../assets/images/uk.jpeg";
import nz from "../assets/images/nz.png";
import aus from "../assets/images/australia.jpg";

import HeaderAi from "./Header-Ai";

const Country = () => {
  const navigate = useNavigate(); // Hook for navigation

  // State hooks for form values and validation
  const [country, setCountry] = useState("");
  const [majorLevel, setMajorLevel] = useState("");
  const [scoreType, setScoreType] = useState(""); // IELTS or TOEFL
  const [ieltsScore, setIeltsScore] = useState("");
  const [toeflScore, setToeflScore] = useState("");
  const [gpa, setGpa] = useState("");
  const [budget, setBudget] = useState("");

  const [error, setError] = useState("");

  const handleSwitchToSignUp = () => {
    const userData = {
      country,
      majorLevel,
      scoreType,
      ieltsScore,
      toeflScore,
      gpa,
      budget,
    };
      console.log(userData); // Check if data is correct
  console.log(location.state);
    // Validation before moving to the next step
    if (!country || !majorLevel || !scoreType || !gpa || !budget) {
      setError("All fields must be filled out.");
      return;
    }
    if (
      scoreType === "IELTS" &&
      (isNaN(ieltsScore) || ieltsScore < 0 || ieltsScore > 9)
    ) {
      setError("IELTS score must be a number between 0 and 9.");
      return;
    }
    if (
      scoreType === "TOEFL" &&
      (isNaN(toeflScore) || toeflScore < 0 || toeflScore > 120)
    ) {
      setError("TOEFL score must be a number between 0 and 120.");
      return;
    }
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      setError("GPA must be a number between 0 and 4.");
      return;
    }
    if (isNaN(budget) || budget < 0 || budget > 900000) {
      setError("Tuition fee must be a number less than or equal to 900,000.");
      return;
    }

    // If everything is valid, navigate to the next page
    setError("");
    console.log(userData); // Check if userData is valid
    navigate("/subject", { state: { userData } }); // Replace with your target path
  };
 // Verify the state is passed correctly

  return (
    <section>
      {/* Header */}
      <HeaderAi />
      <section className="country-section1">
        {/* Country Selection */}
        <div className="country-selector">
          <label htmlFor="country">Choose your dream destination?</label>
          <select
            id="country"
            className="country-dropdown"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="Australia">Australia</option>
            <option value="United States of America">
              United States of America
            </option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="New Zealand">New Zealand</option>
          </select>
        </div>

        {/* Country Flag Icons */}
        <div className="country-icons">
          <img src={aus} alt="Australia" />
          <img src={usa} alt="United States of America" />
          <img src={uk} alt="United Kingdom" />
          <img src={ca} alt="Canada" />
          <img src={nz} alt="New Zealand" />
        </div>

        {/* Major Level Selection */}
        <div className="country-selector">
          <label htmlFor="majorLevel">Choose your dream major level?</label>
          <select
            id="majorLevel"
            className="country-dropdown"
            value={majorLevel}
            onChange={(e) => setMajorLevel(e.target.value)}
          >
            <option value="">Select Major Level</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>

        {/* IELTS / TOEFL Selection */}
        <div className="country-selector">
          <label>Enter your IELTS or TOEFL score</label>
          <div className="score-buttons">
            <button
              type="button"
              onClick={() => setScoreType("IELTS")}
              className={scoreType === "IELTS" ? "selected" : ""}
            >
              IELTS
            </button>
            <button
              type="button"
              onClick={() => setScoreType("TOEFL")}
              className={scoreType === "TOEFL" ? "selected" : ""}
            >
              TOEFL
            </button>
          </div>
          {scoreType === "IELTS" && (
            <input
              type="number"
              min="0"
              max="9"
              value={ieltsScore}
              onChange={(e) => setIeltsScore(e.target.value)}
              placeholder="IELTS Score (0-9)"
            />
          )}
          {scoreType === "TOEFL" && (
            <input
              type="number"
              min="0"
              max="120"
              value={toeflScore}
              onChange={(e) => setToeflScore(e.target.value)}
              placeholder="TOEFL Score (0-120)"
            />
          )}
        </div>

        {/* GPA Input */}
        <div className="country-selector">
          <label htmlFor="gpa">Enter your academic score in GPA</label>
          <input
            type="number"
            min="0"
            max="4"
            step="0.1"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            placeholder="GPA (0-4)"
          />
        </div>

        {/* Budget Input */}
        <div className="country-selector">
          <label htmlFor="budget">Enter your maximum budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Tuition Fee"
          />
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Next Button */}
        <div>
          <button className="next-btn" onClick={handleSwitchToSignUp}>
            Next →
          </button>
        </div>
      </section>
    </section>
  );
};

export default Country;
