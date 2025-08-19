import { useCallback, useEffect, useState } from "react";
import "../styles/Signup-expert.css";
import "../styles/dropZone.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Arrow from "./arrow";
const ConsultantProfileUpdate = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [major, setMajor] = useState("");
    const [courseName, setCourseName] = useState("");
    const [countryName, setCountryName] = useState("");


    const [imageLink, setImageLink] = useState("");

    const token = localStorage.getItem("token");


    const canSubmit = firstName && lastName && universityName && major && courseName && countryName;


    const fetchConsultantProfileDetails = async (req, res, next) => {
        try {
            let result = await axios({
                url: "http://localhost:8000/consultant/view-user-profile",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log(result); 
            setFirstName(result.data.profileDetails.firstName); 
            setLastName(result.data.profileDetails.lastName); 
            setUniversityName(result.data.profileDetails.universityName); 
            setMajor(result.data.profileDetails.major); 
            setCourseName(result.data.profileDetails.courseName); 
            setCountryName(result.data.profileDetails.country); 
            setImageLink(result.data.profileDetails.profileImage); 



        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (canSubmit) {

            let data;

            if (imageLink) {
                data = {
                    irstName: firstName,
                    lastName: lastName,
                    universityName: universityName,
                    major: major,
                    courseName: courseName,
                    country: countryName,
                    profileImage: imageLink
                }
            }
            else {
                data = {
                    irstName: firstName,
                    lastName: lastName,
                    universityName: universityName,
                    major: major,
                    courseName: courseName,
                    country: countryName,
                    // profileImage: imageLink
                }
            }

            try {
                let result = await axios({
                    url: "http://localhost:8000/consultant/update-user-profile",
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: data
                });
                // console.log(result);
                setFirstName("");
                setLastName("");
                setUniversityName("");
                setCourseName("");
                setCountryName("");
                setMajor("Select Major");
                setImageLink("");
                setCountryName("Select Country")

                toast.success("Profile Updated Successfully !");


            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };



    //----------------code for drop-zone image handling-----------------
    const onDrop = useCallback(async (acceptedFiles) => {
        // Do something with the files
        let formData = new FormData();
        formData.append("image", acceptedFiles[0]);

        //hitting the backend API for uploading the single profile picture
        let result = await axios({
            url: "http://localhost:8000/file/single",
            method: "POST",
            data: formData
        });

        toast.success("Image Uploaded Successfully !!");

        // console.log(result);
        setImageLink(result.data.result);

    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })




    useEffect(() => {
        fetchConsultantProfileDetails();
    }, [])


    return (
        <div className="signup-container">
            <Arrow />
            <ToastContainer></ToastContainer>
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmit}>

                <div className="dropZone-div" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        imageLink ? (
                            <img className="uploaded-image" alt="profile" src={imageLink} />
                        ) : (
                            isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop your image here, or click to select image</p>
                        )
                    }
                </div>


                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">
                    <label>University Name</label>
                    <input
                        type="text"
                        name="universityName"
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">
                    <label>Major</label>
                    <select name="major" value={major} onChange={(e) => setMajor(e.target.value)}>

                        <option value="">Select Major</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="postgraduate">Postgraduate</option>
                    </select>

                </div>

                <div className="form-group">
                    <label>Course Name</label>
                    <input
                        type="text"
                        name="courseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">
                    <label>Country</label>
                    <select name="country" value={countryName} onChange={(e) => setCountryName(e.target.value)}>

                        <option value="">Select Country</option>
                        <option value="nepal">Nepal</option>
                        <option value="others">Others</option>
                    </select>

                </div>


                <div className="form-group">
                    <button type="submit" disabled={!canSubmit}>Submit</button>
                </div>
            </form>

        </div>
    );
};

export default ConsultantProfileUpdate;
