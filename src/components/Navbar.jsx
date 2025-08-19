import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css"; // Custom styles for gradient, etc.
import { useNavigate } from "react-router-dom";

const Navbar = ({ firstName, setFirstName, scrollToBlog }) => {
  const navigate = useNavigate(); // Hook for navigation

  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // To track hover state

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to the Login page when "Sign in" is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove data from localStorage when logging out
    localStorage.removeItem("f_Name"); // Remove data from localStorage when logging out
    localStorage.removeItem("clickedUniversity"); 
    localStorage.removeItem("loggedIn_email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("country");


    setFirstName(null); // Clear the firstName state
    navigate("/login"); // Navigate to login page on logout
  };

  const handleProfileClick = () => {
    // Get the user role from localStorage
    const userRole = localStorage.getItem("userRole");

    // Navigate to the appropriate profile page based on user role
    if (userRole === "student") {
      navigate("/studentprofile"); // Navigate to the user profile page
    } else if (userRole === "consultant") {
      navigate("/consultentprofile"); // Navigate to the consultant profile page
    } else {
      navigate("/login"); // Default to login if no userRole found
    }
  };


  // Custom scroll handler for the Blog section
  const handleScrollToBlog = () => {
    // Manually update the hash and scroll
    window.location.hash = "#blog"; // Add the hash for Blog
    document.getElementById("blog").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to Blog
  };

  const contact = () => {
    // Manually update the hash and scroll
    window.location.hash = "#contact"; // Add the hash for Blog
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to Blog
  };

  const about = () => {
    // Manually update the hash and scroll
    window.location.hash = "#about"; // Add the hash for Blog
    document.getElementById("about").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to Blog

  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark custom-gradient px-3 py-2">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-3" href="#">
          UNIFINDER
        </a>


        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" onClick={about}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={contact}>
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#blog" onClick={handleScrollToBlog}>
                Blog
              </a>{" "}
              {/* Custom scroll to Blog */}
            </li>
            <li className="nav-item">
              {firstName ? (
                <div
                  className="user-info"
                  onMouseEnter={() => setIsHovered(true)}

                  onMouseLeave={() => setIsHovered(false)}
                >
                  <button
                    className="btn btn-light text-primary fw-semibold px-4 py-1 rounded-pill"
                    onClick={handleLogout} // Logout functionality
                  >
                    {firstName}
                  </button>

                                    {/* Profile button shown on hover */}
                  {isHovered && (
                    <button
                      className="btn btn-light text-primary fw-semibold px-4 py-1 rounded-pill"
                      onClick={handleProfileClick}
                    >
                      Profile
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className="btn btn-light text-primary fw-semibold px-4 py-1 rounded-pill"
                  onClick={handleSignInClick} // Navigate to login if no first name is found
                >
                  Sign in
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
