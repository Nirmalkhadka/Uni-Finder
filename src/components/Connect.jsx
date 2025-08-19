import React, { useState } from "react";
import "../styles/connect.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Connect = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [showAnswer, setShowAnswer] = useState(false);

  const handleBackArrow = () => {
    navigate("/login"); // Navigate to HeroSection
  };
  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleSwitchToSignUp = () => {
    navigate("/signup"); // Navigate to SignUp page
  };

    const handleSwitchToSignUp1 = () => {
    navigate("/signup-user"); // Navigate to SignUp page
  };

  return (
    <div style={styles.wrapper} id="wrapper">
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
      <div style={styles.container}>
        <div style={styles.box} id="box" onClick={handleSwitchToSignUp1}>
          Signup as <strong>student</strong>
        </div>
        <div style={styles.box} id="box" onClick={handleSwitchToSignUp}>
          Signup as <strong>college expert</strong>
        </div>

        <div style={styles.questionBlock}>
          <p style={styles.question}>
            Went to know who can be called as college expert?
            <button onClick={handleToggleAnswer} style={styles.plusButton}>
              <sign style={styles.plus}>{showAnswer ? "−" : "+"}</sign>
            </button>
          </p>

          {showAnswer && (
            <p style={styles.answer}>
              A college expert is someone who has in-depth knowledge about
              admission processes, programs, student life, or other aspects of
              specific colleges or universities. Usually, they are alumni,
              consultants, or experienced educators.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // backgroundColor: "#4f46e5", // Light background for contrast
  },
  plus: {
    color: "black",
    margin: "none",
  },
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "500px",
    margin: "auto",
    lineHeight: 1.5,
    backgroundColor: "#a5a2e2",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  box: {
    border: "2px solid black",
    padding: "10px 15px",
    margin: "10px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "inline-block",
    transition: "transform 0.2s, background-color 0.2s", // Hover effect transition
  },
  boxHover: {
    transform: "scale(1.05)",
    backgroundColor: "#f0f0f0",
  },
  questionBlock: {
    marginTop: "20px",
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
  },
  question: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  plusButton: {
    marginLeft: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  answer: {
    marginTop: "10px",
    color: "#333",
  },
};

export default Connect;
