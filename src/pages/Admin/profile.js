import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import "../Patient/css/patientProfile.css";

const Profile = () => {
  const role = localStorage.getItem('role');

  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'));
    const accessToken = String(localStorage.getItem('accessToken'));

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/users/get-user-data?id=${userId}`, {
          mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
        }

        const userData = await response.json();
        console.log('Fetched userData:', userData);
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header role={role} />
      <div className="patient-profile-container">
        <h1>My Profile</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="patient-profile-form">
          <div>
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={userData.firstName || ''}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="name">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={userData.lastName || ''}
              readOnly
            />
          </div>
          <button className="submit-button" type="submit" disabled>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
