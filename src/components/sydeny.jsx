import React, { useEffect, useState } from 'react';
import ExpertCard from './ExpertCard';
import photo from '../assets/images/download.jpg';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sydney = () => {
  const navigate = useNavigate();

  let selectedDate;
  let selectedTime;
  let email;

  let initiatorImage;
  let initiatorCountry;

  let firstName;
  let lastName;
  let fullName;

  let aoi;

  let consultantFirstName;
  let consultantLastName;
  let consultantImage;
  let consultantFullName;

  const universityName = localStorage.getItem("clickedUniversity");
  const token = localStorage.getItem("token");

  const initiatorEmail = localStorage.getItem("loggedIn_email");

  const [consultants, setConsultants] = useState([]);


  const fetchAvailableConsultants = async (e) => {
    try {
      let result = await axios({
        url: "http://localhost:8000/consultant/fetch-consultant",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { universityName: universityName }
      });
      // console.log(result);  

      setConsultants(result.data.result || []);


    } catch (error) {
      toast.error(error.response.data.message);
      setConsultants([]); // Clear consultants on error!
    }
  }

  const handleConnect = async (expertWithDateTime) => {
    if (expertWithDateTime.selectedDate === "" || expertWithDateTime.selectedTime === "") {
      toast.error("Please Select Date and Time !");
    }
    else {
      try {
        let result = await axios({
          url: "http://localhost:8000/student/view-user-profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        initiatorImage = result.data.profileDetails.profileImage;
        firstName = result.data.profileDetails.firstName;
        lastName = result.data.profileDetails.lastName;
        fullName = firstName + " " + lastName;
        initiatorCountry = result.data.profileDetails.country;
        aoi = result.data.profileDetails.areaOfInterest;

      } catch (error) {
        toast.error(error.response.data.message);
      }


      email = expertWithDateTime.email;

      try {
        let result = await axios({
          url: "http://localhost:8000/consultant/fetch-consultant-profile-2",
          method: "POST",
          data: { email: email }

        });
        console.log(result);
        consultantFirstName = result.data.result.firstName;
        consultantLastName = result.data.result.lastName;
        consultantImage = result.data.result.profileImage;
        consultantFullName = consultantFirstName + " " + consultantLastName;


      } catch (error) {
        toast.error(error.response.data.message);
      }

      selectedDate = expertWithDateTime.selectedDate;
      selectedTime = expertWithDateTime.selectedTime;



      try {
        let data = {
          initiator: initiatorEmail,
          initiatorImage: initiatorImage,
          initiatorFullName: fullName,
          initiatorCountry: initiatorCountry,
          initiatorAOI: aoi,
          requestee: email,
          requesteeFullName: consultantFullName,
          requesteeImage: consultantImage,
          meetingDate: selectedDate,
          meetingTime: selectedTime
        }
        let result = await axios({
          url: "http://localhost:8000/api/meeting/sendRequest",
          method: "POST",
          data: data
        });
        // navigate("/");
        toast.success("Meeting Request Sent Successfully !");

        fetchAvailableConsultants();


      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

  };

  useEffect((e) => {
    fetchAvailableConsultants();
  }, []);

  return (
    <div>
      <ToastContainer></ToastContainer>

      {consultants.map((consultant, index) => (
        <ExpertCard
          key={index}
          profile={consultant.firstName + " " + consultant.lastName}
          name={consultant.firstName + " " + consultant.lastName}
          university={consultant.universityName}
          major={consultant.major}
          course={consultant.courseName}
          country={consultant.country}
          email={consultant.email}
          photoUrl={consultant.profileImage} // If you have photo URL in backend 

          onConnect={handleConnect} //passed as a prop
        />
      ))}
    </div>
  );
};

export default Sydney;
