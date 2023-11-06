import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import "./css/patientProfile.css";

import CustomModal from '../SurveyModal'

const PatientProfile = ({ name, onChangeName, onSave, onChangePassword }) => {
const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    education: '',
    profileType: '',
  });

  const [patientData, setPatientData] = useState('');
  const [question, setQuestion] = useState('');

  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);

  const jwtToken = localStorage.getItem('accessToken');
  useEffect(() => {
    const fetchSurvey = async () => {
      const patientId = localStorage.getItem('patientId');


        const response = await fetch('http://localhost:8080/api/v1/question/get/'+1, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
        });
        
        if (!response.ok) {
          // If the response is not ok, set an error message
          setError("Unable to fetch posts. Please try again later.");
          
          // Clear the error after 5 seconds
          const timer = setTimeout(() => {
            setError("");
          }, 5000);
          setLoading(false);
          // Clear timeout if the component unmounts
          return () => clearTimeout(timer);
        }

        const data = await response.json();
        setLoading(false);
        setQuestion(data['description']);
        console.log(data['description']);

    };

    fetchSurvey();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
        const[firstLoginOfTheDay, setFirstLoginOfTheDay] = useState(false);

        const openModal = () => {
          setIsModalOpen(true);
          setFirstLoginOfTheDay(true);
        };

        const closeModal = () => {
          setIsModalOpen(false);
        };

        const handleModalSubmit = (modalInput) => {
          console.log(modalInput);
        }

  const handleSubmit = async (e)  => {
    console.log('Form Data:', formData);
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
        console.log('Data sent to the backend successfully.');
      } else {
        console.error('Error sending data to the backend.');
      }
    } catch (error) {
      console.error('An error occurred while sending data:', error);
    }
  };

  return (
  <>
  <Header/>
    {/* <Sidebar sidebarType="sidebarAdmin" /> */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            
            <button onClick={openModal}>Show Modal</button>

            {firstLoginOfTheDay && <CustomModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              onSubmit={handleModalSubmit}
              question = {question}
            />}


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
