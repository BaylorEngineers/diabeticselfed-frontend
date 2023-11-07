import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '../../components/Button/Button';
import './signUpWeightAndHeight.css';

function SignupWeightAndHeight() {
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [dateT, setDateT] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const handleAddReport = async () => {
    if (height <= 0 || goalWeight <= 0) {
      setErrorMessage('Please enter valid height and goal weight (greater than 0).');
      setSuccessMessage('');
      return;
    }

    const data = {
      height,
      goalWeight,
      dateT,
      token,
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/weight/first/weightReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signUpToken: token,
          height: height,
          weight: goalWeight,
          dateT: dateT
        }),
      });

      if (response.ok) {
        setSuccessMessage('Report added successfully!');
        setErrorMessage('');
        window.location.href = `/login`
        //window.location.href = `/signUp/goal?token=${token}`;
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error (${response.status}): ${errorData.message || 'Report failed'}`);
      }
    } catch (error) {
      setErrorMessage('Network error: Could not contact the server');
    }
  };

  return (
    <div className="center-container">
      <h2>Please Enter Your Height(inches) and Weight(lbs) as of Today </h2>
      <div className="weight-height-section">
        <label>
          Height (in inches):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label>
          Goal Weight (in lbs):
          <input
            type="number"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            required
          />
        </label>
        <Button label="Submit" size="small" onClick={handleAddReport} />
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    </div>
  );
}

export default SignupWeightAndHeight;
