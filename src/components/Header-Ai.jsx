import React from "react";
import destination from "../assets/images/destinaton1.jpeg";
import "../styles/Header-Ai.css";
import headerImage from "../assets/images/right_uni.png";  
import major from "../assets/images/major2.png";
import subject from "../assets/images/subject1.png";
import score from"../assets/images/score1.png";
import acadamic from"../assets/images/acadamic.png";
import budget from"../assets/images/budget.png";

const HeaderAi = () => {
  return (
    <div>
      {/* New Header with Text and Image */}
      <div className="intro-header">
        <div className="intro-text">
          <h1 className="h1-header">Struggling to find the right University?</h1>
          <p>
            University finder is an AI-powered tool that can guide you in choosing the perfect program and University based on your interests, high school grades, and budget.
          </p>
        </div>
        <div className="intro-image">
          <img src={headerImage} alt="University Finder" />
        </div>
      </div>

      {/* Main Section */}
      <section className="country-section2">
        {/* Header */}
        <div className="country-header">
          <h2>Find Your Dream University</h2>
          <p>Choose your destination and discover the best universities for you.</p>
        </div>

        {/* Step Icons */}
        <div className="step-icons">
          {/* Step 1 - Destination */}
          <div className="step-item">
            <div className="step-circle">
              <img src={destination} alt="Destination" />
            </div>
            <p>Destination</p>
          </div>

          {/* Step 2 - Select Major */}
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">
              <img src={major} alt="Select Major" />
            </div>
            <p>Select Major</p>
          </div>

          {/* Step 3 - Select Subjects */}
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">
              <img src={subject} alt="Select Subjects" />
            </div>
            <p>Select Subjects</p>
          </div>

          {/* Step 4 - Enter Score */}
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">
              <img src={score} alt="Enter Score" />

            </div>
            <p>Enter Score</p>
          </div>

          {/* Step 5 - Enter Academic */}
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">
              <img src={acadamic} alt="Enter Academic" />
            </div>
            <p>Enter Academic</p>
          </div>

          {/* Step 6 - Enter Budget */}
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">
              <img src={budget} alt="Enter Budget" />
            </div>
            <p>Enter Budget</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeaderAi;
