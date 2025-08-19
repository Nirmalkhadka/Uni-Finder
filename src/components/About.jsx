import React, { useRef, useEffect } from "react";
import about1 from "../assets/images/user1.png"; // Design photo
import about2 from "../assets/images/user2.png"; // Placeholder second photo
import symbol1 from "../assets/images/symbol1.png"; // Replace with your actual symbols
import symbol2 from "../assets/images/symbol2.png";
import symbol3 from "../assets/images/symbol3.png";
import symbol4 from "../assets/images/symbol4.png";
import "../styles/About.css";

const photos = [about1, about2];
const symbols = [symbol1, symbol2, symbol3, symbol4]; // Array of symbols

function About() {
  const sliderRef = useRef(null);
  const symbolSliderRef = useRef(null);

  // Auto slide effect for photos
  useEffect(() => {
    const photoInterval = setInterval(() => {
      if (sliderRef.current) {
        const first = sliderRef.current.children[0];
        sliderRef.current.appendChild(first.cloneNode(true));
        sliderRef.current.removeChild(first);
      }
    }, 3000); // Auto slide every 3 seconds

    const symbolInterval = setInterval(() => {
      if (symbolSliderRef.current) {
        const first = symbolSliderRef.current.children[0];
        symbolSliderRef.current.appendChild(first.cloneNode(true));
        symbolSliderRef.current.removeChild(first);
      }
    }, 2000); // Auto slide for symbols every 2 seconds

    return () => {
      clearInterval(photoInterval);
      clearInterval(symbolInterval);
    };
  }, []);

  return (
    <section className="about-section1">
      <section className="about-section">
        <div className="div-about">
          <h2 className="about-title">About</h2>
        </div>
        <div className="about-content">
          {/* Photo Slider */}
          <div className="photo-slider" ref={sliderRef}>
            {photos.map((src, idx) => (
              <div className="photo-card" key={idx}>
                <img src={src} alt={`Company ${idx + 1}`} />
              </div>
            ))}
          </div>

          {/* Company Info */}
          <div className="company-info">
            <h3>About Our Company</h3>
            <p>
              UNIFINDER is a web-based application designed to assist Nepalese
              students who aspire to pursue higher education abroad by providing
              a centralized platform to discover universities that match their
              academic profiles. The platform aims to reduce the complexities
              students often face during the university search and application
              process by streamlining critical information such as eligibility
              criteria, tuition fees, accommodation costs, and country-specific
              requirements.
            </p>
            <p>
              By leveraging a robust algorithm and intuitive user interface,
              UNIFINDER will enable students to input their academic
              qualifications, preferences, and budget constraints and receive
              personalized university suggestions accordingly. Additionally, the
              system will allow students to connect with Nepalese students
              currently studying in those universities through scheduled virtual
              meetings.
            </p>
            <div>
              <h3>Streamline Your University Search</h3>
              <p>
                Easily find universities that align with your qualifications and
                budget.
              </p>
            </div>

            {/* Symbol Slider */}
            <div className="symbol-slider" ref={symbolSliderRef}>
              {symbols.map((symbol, idx) => (
                <div className="symbol-card" key={idx}>
                  <img src={symbol} alt={`Symbol ${idx + 1}`} />
                  <p>
                    {
                      [
                        "Eligibility",
                        "Tuition Fees",
                        "Accommodation",
                        "Requirements",
                      ][idx]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default About;
