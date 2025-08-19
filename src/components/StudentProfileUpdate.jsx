
import { useEffect, useState } from 'react';
import "../styles/SignUp-user.css";
import "../styles/dropZone.css";
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Arrow from './arrow';

const StudentProfileUpdate = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [areaOfInterest, setAreaOfInterest] = useState("");
    const [countryName, setCountryName] = useState("");

    const [imageLink, setImageLink] = useState("");

    const canSubmit = firstName && lastName && areaOfInterest && countryName;

    const token = localStorage.getItem("token");


    const fetchStudentProfileDetails = async (req, res, next) => {
        try {
            let result = await axios({
                url: "http://localhost:8000/student/view-user-profile",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log(result); 
            setFirstName(result.data.profileDetails.firstName);
            setLastName(result.data.profileDetails.lastName);
            setAreaOfInterest(result.data.profileDetails.areaOfInterest);
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
                    firstName: firstName,
                    lastName: lastName,
                    areaOfInterest: areaOfInterest,
                    country: countryName,
                    profileImage: imageLink
                }
            }
            else {
                data = {
                    firstName: firstName,
                    lastName: lastName,
                    areaOfInterest: areaOfInterest,
                    country: countryName
                }
            }



            try {
                let result = await axios({
                    url: "http://localhost:8000/student/update-user-profile",
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: data
                });
                // console.log(result);
                setFirstName("");
                setLastName("");
                setAreaOfInterest("");
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
        fetchStudentProfileDetails();
    }, [])

    return (
        <div className="signup-container">
            <Arrow />
            <ToastContainer></ToastContainer>
            <h2>Update Your Profile</h2>

            <form onSubmit={handleSubmit} className="signup-form">

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


                {/* First and Last Name */}
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"

                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    {/* {formErrors.firstName && <p>{formErrors.firstName}</p>} */}

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
                    {/* {formErrors.lastName && <p>{formErrors.lastName}</p>} */}

                </div>

                {/* Area of Interest */}
                <div className="form-group">
                    <label>Area of Interest</label>
                    <input
                        type="text"
                        name="areaOfInterest"

                        value={areaOfInterest}
                        onChange={(e) => setAreaOfInterest(e.target.value)}
                        required
                    />
                    {/* {formErrors.areaOfInterest && <p>{formErrors.areaOfInterest}</p>} */}

                </div>


                <div className="form-group">
                    <label>Country</label>
                    <select name="country" value={countryName} onChange={(e) => setCountryName(e.target.value)}>

                        <option value="">Select Country</option>
                        <option value="nepal">Nepal</option>
                        <option value="others">Others</option>
                    </select>
                    {/* {formErrors.major && <p>{formErrors.major}</p>} */}

                </div>



                {/* Submit Button */}
                <div className="form-group">
                    <button className='user-button' type="submit" disabled={!canSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default StudentProfileUpdate;
