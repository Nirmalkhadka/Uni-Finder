import React, { useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import australia from "../assets/images/australia.jpg"; // Replace with your actual flag images
import usa from "../assets/images/usa.jpg";
import canada from "../assets/images/canada.jpg";
import japan from "../assets/images/nz.png";
import germany from "../assets/images/uk.jpeg";
import "../styles/Country.css";

const countries = [australia, usa, canada, japan, germany]; // Array of country flags

function Country() {
  const flagSliderRef = useRef(null);

  // Auto slide effect for flags
  useEffect(() => {
    const flagInterval = setInterval(() => {
      if (flagSliderRef.current) {
        const first = flagSliderRef.current.children[0];
        flagSliderRef.current.appendChild(first.cloneNode(true)); // Clone first flag
        flagSliderRef.current.removeChild(first); // Remove the first flag
      }
    }, 2000); // Auto slide for flags every 2 seconds

    return () => {
      clearInterval(flagInterval);
    };
  }, []);

  return (
    <section className="country-section">
      <div className="country-left">
        <h2>Countries You Can Select</h2>
      </div>
      <div className="country-right">
        {/* Flag Slider */}
        <div className="flag-slider" ref={flagSliderRef}>
          {countries.map((flag, idx) => (
            <div className="flag-card" key={idx}>
              <img src={flag} alt={`Country Flag ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Country;
