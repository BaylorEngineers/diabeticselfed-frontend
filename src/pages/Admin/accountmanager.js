import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import "./accountmanager.css"

const AccountManager = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleInviteUser = () => {
    if (!selectedOption || selectedOption === "Select") {
      alert("Please select a role before sending an invite.");
      return;
    }

    setErrorMessage("");

    fetch('http://localhost:8080/api/v1/auth/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, 
        role: selectedOption.toUpperCase()
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage(`Invitation sent to ${email}`);
      setEmail(''); 
      setSelectedOption(''); 
      setTimeout(() => setSuccessMessage(''), 5000);
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage(error.message); 
    });
  };

  const handleResetPassword = () => {
    console.log('Resetting password:', { email });
  };

  return (
    <>
      <Header role = "ADMIN" />
      {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <form style={{ marginTop: '20px', textAlign: 'center' }}>
          <label>
            Select Role:
            <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
              <option value="">Select</option>
              <option value="patient">Patient</option>
              <option value="clinician">Clinician</option>
            </select>
          </label>
          <br /><br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br /><br />
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
  
          <Button label="Invite User" size="small" onClick={(e) => { e.preventDefault(); handleInviteUser(); }}/>
        </form>
      </div>
    </>
  );
};

export default AccountManager;
