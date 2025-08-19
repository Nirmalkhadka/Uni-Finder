import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Airesult.css"; // Import the styles

const AiResults = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Receive the data passed from Subject-ai

  return (
    <div className="ai-results">
      <h1 className="title">AI Recommended Courses</h1>
      {data && data.length > 0 ? (
        <div className="course-container">
          {data.map((course, index) => (
            <div key={index} className="course-card">
              <h2>{course.course_title}</h2>
              <p className="course-description">{course.course_description}</p>
              <p>
                <strong>University:</strong> {course.university_name || "N/A"}
              </p>
              <p>
                <strong>Course Level:</strong> {course.course_level}
              </p>
              <p>
                <strong>GPA Requirement:</strong> {course.gpa_requirement}
              </p>
              <p>
                <strong>Tuition Fee:</strong> ${course.tuition_fee_usd}
              </p>
              <p>
                <strong>IELTS:</strong> {course.ielts}
              </p>
              <p>
                <strong>TOEFL:</strong> {course.toefl || "N/A"}
              </p>

              {/* Conditional Rendering: Only display if the data exists */}
              {course.predicted_ranking !== undefined && (
                <p>
                  <strong>Predicted Ranking:</strong> {course.predicted_ranking}
                </p>
              )}

              {course.total_cost !== undefined && (
                <p>
                  <strong>Total Cost:</strong> {course.total_cost || "N/A"}
                </p>
              )}

              {course.list_of_nepali_student !== undefined && (
                <p>
                  <strong>Number of Nepali Students:</strong> {course.list_of_nepali_student || "N/A"}
                </p>
              )}

              {course.scholarship_status !== undefined && (
                <p>
                  <strong>Scholarship Status:</strong> {course.scholarship_status}
                </p>
              )}

              {/* Toggle Button for University Description */}
              <UniversityDescription description={course.university_description} />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-courses">No courses found based on your input.</p>
      )}
    </div>
  );
};

// New component for University Description toggle
const UniversityDescription = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="description-container">
      <button className="description-btn" onClick={toggleDescription}>
        {isOpen ? "Hide University Description" : "Show University Description"}
      </button>
      {isOpen && <p className="university-description">{description}</p>}
    </div>
  );
};

export default AiResults;
