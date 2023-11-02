import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import "./css/patientProfile.css";

const PatientProfile = ({ name, onChangeName, onSave, onChangePassword }) => {
const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    education: '',
    profileType: '',
  });

  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjbGluaWNpYW5AbWFpbC5jb20iLCJpYXQiOjE2OTg4NjY3MjMsImV4cCI6MTY5ODk1MzEyM30.9HWe9R9mPbOwIlSPgK6sUi_854m88dBK_sEnt4UJXIE"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e)  => {
//    e.preventDefault();
    // You can perform validation here before submitting the data

    // Assuming you want to log the form data for demonstration purposes
    console.log('Form Data:', formData);

    // You can also send the data to an API or perform other actions here

try {
      const response = await fetch('http://localhost:8080/api/v1/patient-profile/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          name: formData.name,
          dob: formData.dob,
          age: formData.age,
          education: formData.education,
          profileType: formData.profileType,
        }),
      });

      if (response.ok) {
        // Handle a successful response from your backend here
        console.log('Data sent to the backend successfully.');
      } else {
        // Handle errors from your backend here
        console.error('Error sending data to the backend.');
      }
    } catch (error) {
      console.error('An error occurred while sending data:', error);
    }

//    setIsEditMode(false); // Exit edit mode after submission
  };

  return (
  <>
  <Header/>
    <Sidebar sidebarType="sidebarAdmin" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h1>Patient Profile</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="education">Education:</label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="profileType">Profile Type:</label>
                  <select
                    id="profileType"
                    name="profileType"
                    value={formData.profileType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Profile Type</option>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <button label = "Submit" type="submit">Submit</button>
              </form>
            </div>
        </>
  );
};

export default PatientProfile;
