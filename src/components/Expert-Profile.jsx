import React, { useEffect, useState } from "react";
import UserProfile from "./expetProfile-card"; // adjust the path if the file lives elsewhere
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const ExpertProfile = () => {

  const [profileData, setProfileData] = useState(null);
  let token = localStorage.getItem("token");

  const viewConsultantProfile = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/consultant/view-user-profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { firstName, lastName, email, profileImage, universityName, courseName, major, country } = result.data.profileDetails;
      const fullName = firstName + " " + lastName;

      setProfileData({
        name: fullName,
        university: universityName,
        major,
        course: courseName,
        country: country,
        photoUrl: profileImage,
        email,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }



  useEffect(() => {
    viewConsultantProfile();
  }, [])


  return (
    // <div className="expert-profiles">
    //   <ToastContainer></ToastContainer>
    //   {experts.map((expert, index) => (
    //     // Spread all properties so they align with the props expected by UserProfile
    //     <UserProfile key={index} {...expert} />
    //   ))}
    // </div>
    <div className="expert-profiles">
      <ToastContainer />
      {profileData && <UserProfile {...profileData} />}
    </div>
  );
};

export default ExpertProfile;
