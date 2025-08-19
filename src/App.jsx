
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UserSlider from "./components/User";
import About from "./components/About";
import Country from "./components/Country";
import Blog from "./components/Blog";
import Contact from "./components/contact";
import Login from "./components/Login";
import SignUp from "./components/Signup-expert";
import Finder from "./components/Finder";
import Country1 from "./components/CountryAi";
import Connect from "./components/Connect";
import Expert from "./components/Expert";
import Queensland from "./components/queensland";
import Sydney from "./components/sydeny";

import SendUserProfile from "./components/user-send-Profile";

import Subjects from "./components/Subject-ai";
import AiResults from "./components/AiResults";
import SignupUser from "./components/SignUp-User";
import Footer from "./components/Footer";

import VerifyEmail from "./components/VerifyEmail";
import VerifyEmail2 from "./components/VerifyEmail2";
import UserProfile1 from "./components/userProfile";
import ExpertProfile12 from "./components/Expert-Profile";
// import ExpertProfile1 from "./components/user1Profile-card";
// import ResponseUser from "./components/Response-user-page";
import MeetingDetails from "./components/MeetingDetails";
import MeetingsDashboard from "./components/MeetingDashboard";
import MeetingHistory from "./components/MeetingHistory";
import UpdatePassword from "./components/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import StudentProfileUpdate from "./components/StudentProfileUpdate";
import ConsultantProfileUpdate from "./components/ConsultantProfileUpdate";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewAllStudents from "./components/ViewAllStudents";
import ViewAllConsultants from "./components/ViewAllConsultants";
import MeetingHistoryForAdmin from "./components/MeetingHistoryForAdmin";
import MeetingHistoryStudent from "./components/MeetingHistoryStudent";


function App() {
  const [firstName, setFirstName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isRoleLoaded, setIsRoleLoaded] = useState(false); // NEW
  const blogRef = useRef(null); // Define the blogRef here to use it for scrolling


  // Load first name from localStorage when the app loads
  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem("signupData"));
    // if (storedData && storedData.firstName) {
    //   setFirstName(storedData.firstName); // Set first name if it's available
    //   setUserRole(storedData.role || null); // store role from localStorage
    // }

    const firstName = localStorage.getItem("f_Name");
    const role = localStorage.getItem("userRole");

    if (firstName) {
      setFirstName(firstName);
    }

    if (role) {
      setUserRole(role);
    }

    setIsRoleLoaded(true); // Now role is considered "loaded"
  }, []);


  // Scroll to the Blog section when clicked
  const scrollToBlog = () => {
    blogRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <Router>
      {isRoleLoaded && (
        <Routes>
          {/* Route for the Home page with all sections, Navbar will be shown */}
          <Route
            path="/"

            element={
              <PageWithNavbar
                Component={MainContent}
                firstName={firstName}
                setFirstName={setFirstName}
                scrollToBlog={scrollToBlog} // Pass the scrollToBlog function
                userRole={userRole}
              />
            }

          />

          {/* Routes for the pages without Navbar (Login and SignUp) */}
          <Route path="/login" element={<Login setFirstName={setFirstName} setUserRole={setUserRole} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/finder" element={<Finder />} />
          <Route path="/country" element={<Country1 />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/expert" element={<Expert />} />
          <Route
            path="/queenslanduniversityoftechnology"
            element={<Queensland />}
          />
          <Route path="/westernsydneyuniversity" element={<Sydney />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          {/* <Route path="/expert-profile" element={<ExpertProfile />} /> */}
          <Route path="/subject" element={<Subjects />} />
          <Route path="/ai-results" element={<AiResults />} />
          <Route path="/signup-user" element={<SignupUser />} />
          {/* <Route path="/send-user-profile" element={<SendUserProfile />} /> */}
          <Route path="/send-user-profile" element={<MeetingsDashboard />} />
          {/* <Route path="/Response-user-page" element={<ResponseUser/>}/> */}
          <Route path="/Response-user-page" element={<MeetingDetails></MeetingDetails>} />
          <Route path="/studentprofile" element={<UserProfile1 />} />
          <Route path="/consultentprofile" element={<ExpertProfile12 />} />

          <Route path="/view-meeting-history" element={<MeetingHistory />} />

          <Route path="/view-meeting-history-student" element={<MeetingHistoryStudent/>} />

          <Route path="/password-update" element={<UpdatePassword />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/password/reset-password" element={<ResetPassword />} />

          <Route path="/student-profile-update" element={<StudentProfileUpdate />} />

          <Route path="/consultant-profile-update" element={<ConsultantProfileUpdate />} />


          {/* Admin Login Route
          <Route path="/unifinder/login/admin" element={<AdminLogin />} />

          <Route path="/unifinder/login/admin/admin-dashboard" element={<AdminDashboard />} /> */}

          {/* Admin Login Route */}
          <Route path="/unifinder/login/admin" element={<AdminLogin />} />

          {/* Protected Admin Dashboard Route */}
          <Route
            path="/unifinder/login/admin/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unifinder/login/admin/view-all-students" element={<ViewAllStudents/>} />

          <Route path="/unifinder/login/admin/view-all-consultants" element={<ViewAllConsultants/>} />

          <Route path="/unifinder/login/admin/view-meeting-logs" element={<MeetingHistoryForAdmin/>} />








          {/* Mine inserted route */}
          <Route
            path="/verify-email"
            element={<VerifyEmail></VerifyEmail>}
          ></Route>
          <Route
            path="/verify-email-2"
            element={<VerifyEmail2></VerifyEmail2>}
          ></Route>

        </Routes>
      )}
    </Router>
  );
}

// Create a wrapper to conditionally render Navbar based on the route

const PageWithNavbar = ({
  Component,
  firstName,
  setFirstName,
  scrollToBlog,
  userRole
}) => {
  return (
    <>
      {/* Conditionally render Navbar only on pages where it's required */}
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup" && (
          <Navbar
            firstName={firstName}
            setFirstName={setFirstName}
            scrollToBlog={scrollToBlog} // Pass scrollToBlog to Navbar
          />
        )}

      {/* Render the main content */}
      <Component firstName={firstName} setFirstName={setFirstName} userRole={userRole} />
    </>
  );
};

// MainContent will be the single-page layout containing all sections
const MainContent = ({ userRole }) => {
  if (userRole === "consultant") {
    return <ConsultantLandingPage />;
  } else {
    //regular student landing page
    return (
      <>
        <HeroSection />
        <Country />
        <UserSlider />

        <div id="about">
          <About />
        </div>

        <div id="blog">

          {/* Assign the id "blog" to this section */}
          <Blog />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
        {/* <SendUserProfile /> */}
        {/* <UserProfile1 /> */}
        {/* <ExpertProfile12 /> */}
        {/* <ExpertProfile1/> */}

      </>
    );
  }

};


const ConsultantLandingPage = () => {
  return (
    <>
      <Country />
      <UserSlider />
      <div id="about"><About /></div>
      <div id="blog"><Blog /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </>
  );
};

export default App;
