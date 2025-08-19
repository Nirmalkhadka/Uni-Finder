import React, { useEffect } from "react";
import "../styles/LandingSection.css"; // Custom styles for wave and animation
import landingImage from "../assets/images/land3.png"; // Replace with your illustration
import { useNavigate } from "react-router-dom"; 
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleSignInClick = () => {
    // if (!firstName) {
    //   // If the user is not logged in, show an alert or message
    //   alert("Please log in to access this feature.");
    // } else {
      // Navigate to the finder page if logged in
      const fetchedToken =  localStorage.getItem("token");
      if(fetchedToken){
        navigate('/finder');
      }
      else{
        navigate('/login');
      }
    // }
  };

  return (
    <section className="landing-section text-white d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold" data-aos="fade-up">
              Let's Find your{" "}
              <span className="text-gradient">Dream University</span>
            </h1>
            <p className="lead" data-aos="fade-up" data-aos-delay="200">
              Discover your perfect university match based on your academic
              profile and preferences.
            </p>

            {/* "Get Started" Button */}
            <button
              className="btn btn-light text-primary fw-semibold px-4 py-2 rounded-pill animate-fade-in"
              onClick={handleSignInClick}
            >
              Get Started
            </button>
          </div>

          {/* Illustration */}
          <div className="col-md-6 text-center mt-4 mt-md-0 animate-slide-in" id="image-landing">
            <img
              src={landingImage}
              alt="University illustration"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>
      {/* Wave Shape */}
      <div className="wave-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path
            fill="#fff"
            d="M0,64L60,80C120,96,240,128,360,165.3C480,203,600,245,720,234.7C840,224,960,160,1080,133.3C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
