import React, { useEffect, useState } from 'react';
import ExpertProfile1 from './user1Profile-card'; // Import the ExpertProfile component
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const UserProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  let token = localStorage.getItem("token");

  const viewStudentProfile = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8000/student/view-user-profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { firstName, lastName, email, profileImage, areaOfInterest } = result.data.profileDetails;
      const fullName = firstName + " " + lastName;

      setProfileData({
        name: fullName,
        email,
        areaOfInterest,
        photoUrl: profileImage
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    viewStudentProfile();
  }, [])

  return (
    <div>
      <ToastContainer />
      {profileData && (
        <ExpertProfile1
          name={profileData.name}
          email={profileData.email}
          areaOfInterest={profileData.areaOfInterest}
          photoUrl={profileData.photoUrl}
        />
      )}
    </div>
  );
};

export default UserProfile1;

