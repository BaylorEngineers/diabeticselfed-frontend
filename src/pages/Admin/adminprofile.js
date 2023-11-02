import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { jwtDecode } from 'jwt-decode';


const AdminProfile = ({onSave, onChangePassword }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState('');

//   const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY5ODg3NzMzNCwiZXhwIjoxNjk4OTYzNzM0fQ.kQTkRDTFMK2vNA75XCFHIj87R8a0MNbW05Obsqb3OEc';

   useEffect(() => {
     const userId = Number(localStorage.getItem('userId'));
     console.log(userId);

     const accessToken = String(localStorage.getItem('accessToken'));
     console.log(accessToken);

     const fetchUserData = async () => {
       try {
         const response = await fetch('http://localhost:8080/api/v1/users/get-user-data?id=3', {
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

  const handleSave = () => {
    // Logic to save the profile changes
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCancel = () => {
    setShowChangePassword(false);
    // Reset password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmitPasswordChange = () => {
    // Logic to handle password change
    onChangePassword(currentPassword, newPassword);
    console.log('Password changed:', { currentPassword, newPassword });
    handleCancel();
  };

  return (
    <>
    <Header/>
    <Sidebar sidebarType="sidebarAdmin" />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div>
      <label>
       Name: {userData.name}
      </label>
      </div>
      <div>
       <label>
             Email: {userData.email}
            </label>
      </div>
      <div style={{ marginTop: '20px' }}>
      <Button label="Change Password" onClick={handleChangePassword} size="small"/>
      </div>
      <div style={{ marginTop: '20px' }}>
      <Button label="Save" onClick={handleSave} size="small"/>
      <Button label="Cancel" onClick={handleCancel} size="small"/>
      </div>
      {showChangePassword && (
        <div style={{ marginTop: '20px' }}>
          <label>
                      Current Password:
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      New Password:
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Confirm Password:
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </label>
                    <br />
          <Button label="Submit" onClick={handleSubmitPasswordChange} size="small"/>
          <Button label="Cancel" onClick={handleCancel} size="small"/>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminProfile;
