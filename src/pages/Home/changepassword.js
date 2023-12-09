import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import "../Patient/css/patientProfile.css";
import environment from '../../environment';


const ChangePassword = ({onSave, onChangePassword }) => {
  const role = localStorage.getItem('role');
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleSave = () => {
  };


  const handleCancel = (e) => {
  e.preventDefault();
  setShowChangePassword(false);
  setCurrentPassword('');
  setNewPassword('');
  setConfirmPassword('');
  };

  const handleSubmitPasswordChange = async (e) => {

       const accessToken = String(localStorage.getItem('accessToken'));
       console.log(accessToken);
       setAccessToken(accessToken);

  e.preventDefault();

  if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

  if (!passwordRegex.test(newPassword)) {
      alert('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

  if (newPassword === currentPassword) {
      alert('New password cannot be the same as the current password.');
      return;
    }

    try {
      const response = await fetch(`${environment.baseUrl}/api/v1/users/change-password`, {
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
      // Clear form fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowChangePassword(false);

        // Show success message
        setSuccessMessage('Password changed successfully');
    } catch (error) {
      // Handle error
      console.error('Error changing password:', error.message);
    }
  };


  return (
      <>
        <Header role={role} />
        <div class = "patient-profile-container">
          {successMessage && (
            <div
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px',
                textAlign: 'center',
                borderRadius: '5px',
                margin: '10px 0',
              }}
            >
              {successMessage}
            </div>
          )}
          <form className="patient-profile-form" onSubmit={(e) => handleSubmitPasswordChange(e)}>
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
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$"
                title="Password must be at least 8 characters long and contain at least one capital letter, one small letter, one special character, and one number."
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
            <button className="submit-button" type="submit">Save</button>
            <button className="submit-button" onClick={(e) => handleCancel(e)}>Cancel</button>
          </form>
        </div>
      </>
    );
  };

export default ChangePassword;
