import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";


const Profile = () => {
  const role = localStorage.getItem('role');

  const [userData, setUserData] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [accessToken, setAccessToken] = useState('');


   useEffect(() => {
     const userId = Number(localStorage.getItem('userId'));
     console.log(userId);
     setId(userId);

     const accessToken = String(localStorage.getItem('accessToken'));
     console.log(accessToken);
     setAccessToken(accessToken);

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
         console.log(userData);
         setUserData(userData);
         console.log('Fetched userData:', userData);
       } catch (error) {
         setError(error.message);
       }
     };

     fetchUserData();
   }, []);

  return (
      <>
        <Header role={role} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <label>
              Name: {userData.firstName} {userData.lastName}
            </label>
          </div>
          <div>
            <label>
              Email: {userData.email}
            </label>
          </div>
        </div>
      </>
    );
  };

export default Profile;
