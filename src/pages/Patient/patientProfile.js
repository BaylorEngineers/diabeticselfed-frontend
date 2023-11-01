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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform validation here before submitting the data

    // Assuming you want to log the form data for demonstration purposes
    console.log('Form Data:', formData);

    // You can also send the data to an API or perform other actions here
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
                <Button label = "Submit" type="submit">Submit</Button>
              </form>
            </div>
        </>
  );
};

export default PatientProfile;
