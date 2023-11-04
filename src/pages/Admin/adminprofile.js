import React, { useState, useEffect } from 'react';
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

  const handleSave = () => {
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCancel = (e) => {
  e.preventDefault();
  setShowChangePassword(false);
  setCurrentPassword('');
  setNewPassword('');
  setConfirmPassword('');
  };

  const handleSubmitPasswordChange = async (e) => {

  e.preventDefault();

  if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    try {
    console.log("in try-"+accessToken)
      const response = await fetch('http://localhost:8080/api/v1/users/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmationPassword: confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
      }

      // Handle successful password change
      console.log('Password changed successfully');
    } catch (error) {
      // Handle error
      console.error('Error changing password:', error.message);
    }
  };


  return (
      <>
        <Header role="ADMIN" />
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
          <div style={{ marginTop: '20px' }}>
            <Button label="Change Password" onClick={handleChangePassword} size="small" />
          </div>
          {showChangePassword && (
            <form onSubmit={(e) => handleSubmitPasswordChange(e)} style={{ marginTop: '20px', textAlign: 'center' }}>
              <div >
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
                <Button type="submit" label="Save" size="small" />
                <Button label="Cancel" onClick={(e) => handleCancel(e)} size="small" />
              </div>
            </form>
          )}
        </div>
      </>
    );
  };

export default AdminProfile;
