import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import CustomModal from '../SurveyModal';
import "./css/patientProfile.css";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    education: '',
  });
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstLoginOfTheDay, setFirstLoginOfTheDay] = useState(false);
  
  const jwtToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchSurvey = async () => {
      setLoading(true);
      try {
        const patientId = localStorage.getItem('patientId'); // Assuming you need to use patientId
        const response = await fetch(`http://localhost:8080/api/v1/question/get/1`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch data. Please try again later.");
        }

        const data = await response.json();
        setQuestion(data.description);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [jwtToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/patient-profile/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error sending data to the backend.');
      }

      console.log('Data sent to the backend successfully.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = (modalInput) => {
    console.log(modalInput);
  };

  return (
    <>
      <Header role="PATIENT" />
      <div className="patient-profile-container">
        {firstLoginOfTheDay && (
          <CustomModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
            question={question}
          />
        )}

        <h1>My Profile</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="patient-profile-form" onSubmit={handleSubmit}>
          {/* Form fields */}
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

          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default PatientProfile;
