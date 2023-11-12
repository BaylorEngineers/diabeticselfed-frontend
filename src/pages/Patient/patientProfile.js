import React, { useState, useEffect, useCallback } from 'react';
import Header from "../../components/Header/Header";
import CustomModal from '../SurveyModal';
import "./css/patientProfile.css";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    dob: '',
    education: '',
    type: '',
  });

  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstLoginOfTheDay, setFirstLoginOfTheDay] = useState(false);
  const [updatedProfileType, setUpdatedProfileType] = useState('');
  const [data, setData] = useState('');
  const [age, setAge] = useState('');
  const [levelOfEd, setLevelOfEd] = useState('');
  const [formChanged, setFormChanged] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const accessToken = String(localStorage.getItem('accessToken'));
  console.log(accessToken);

  const patientId = localStorage.getItem('patientId');
  console.log(patientId)

  const calculateAge = useCallback((dobString) => {
      if (!dobString) {
        return null;
      }

      const birthDate = new Date(dobString);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/patient-profile/detail/' + patientId, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch data. Please try again later.");
        }

        const data = await response.json();
        const age = calculateAge(data.dob);
        setAge(age);
        const levelOfEd = data.levelOfEd.toLowerCase();
        setLevelOfEd(levelOfEd);
        console.log("age and levelOfEd:", age);
        console.log(levelOfEd);
        const updatedProfileType = calculateProfileType(age, levelOfEd);
        setUpdatedProfileType(updatedProfileType);
        console.log("fetched patient data-",data);
        console.log("profile type:", updatedProfileType);
        setFormData((prevData) => ({
                ...prevData,
                patientId:data.id,
                name: data.name,
                dob: data.dob.split('T')[0],
                education: data.levelOfEd,
                type: updatedProfileType,
              }));
              console.log("Updated formData:", formData);
              console.log(formChanged);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };

          fetchPatientData();
        }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
//  console.log("value of form before", formChanged);
    if (formData.education) {
      const newAge = calculateAge(data.dob);
      const newLevelOfEd = formData.education.toLowerCase();

      const updatedProfileType = calculateProfileType(newAge, newLevelOfEd);

      setUpdatedProfileType(updatedProfileType);
      setFormData((prevData) => ({
        ...prevData,
        type: updatedProfileType,
      }));

      setFormChanged(true);
    }

  }, [formData.education, data.dob]);

  console.log("value of form changed", formChanged);

    const calculateProfileType = (age, education) => {
      if ((age < 50 && ['highschool', 'undergraduate', 'graduate'].includes(education))) {
        return 'TYPE1';
      } else if (age >= 50 && education === 'other') {
        return 'TYPE2';
      } else if (education === 'other') {
        return 'TYPE3';
      }
      return '';
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/patient-profile/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error sending data to the backend.');
      }

      console.log('Data sent to the backend successfully.');
      setSuccessMessage('Your changes have been updated successfully.');

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
        {successMessage && <div style={{backgroundColor: '#4CAF50',
                                        color: 'white',
                                        padding: '10px',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        margin: '10px 0',
                                        }}>{successMessage}</div>}
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
            <select
                id="education"
                name="education"
                value= {formData.education}
                onChange={handleChange}
                required
              >
              <option value=''>Select education level</option>
                <option value="HIGHSCHOOL">High School</option>
                <option value="UNDERGRADUATE">Undergraduate</option>
                <option value="GRADUATE">Graduate</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

          <button className="submit-button" type="submit" disabled={!formChanged}>Submit</button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default PatientProfile;
