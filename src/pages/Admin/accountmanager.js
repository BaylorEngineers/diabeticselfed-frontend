import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

const AccountManager = () => {
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogout = () => {
    // ... your logout logic
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCreateAccount = () => {
    // Handle create account logic here
    console.log('Creating account:', { selectedOption, email });
  };

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log('Resetting password:', { email });
  };

  return (
    <>
      <Header />
      <Sidebar sidebarType="sidebarAdmin" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <form style={{ marginTop: '20px', textAlign: 'center' }}>
          <label>
            Select User:
            <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="clinician">Clinician</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <br />
          <Button label="Create Account" size="small" onClick={handleCreateAccount}/>

          <Button label="Reset Password" size="small" onClick={handleResetPassword}/>
        </form>
      </div>
    </>
  );
};

export default AccountManager;
