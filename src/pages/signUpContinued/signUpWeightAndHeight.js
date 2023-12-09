import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '../../components/Button/Button';
import './signUpWeightAndHeight.css';
import environment from '../../environment';


function SignupWeightAndHeight() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [dateT, setDateT] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const handleAddReport = async () => {
    if (feet <= 0 || inches < 0 || goalWeight <= 0) {
      setErrorMessage('Please enter valid feet, inches, and goal weight (greater than 0).');
      setSuccessMessage('');
      return;
    }

    if (inches < 0 || inches > 11) {
      setErrorMessage('Please enter a valid value for inches (between 0 and 11).');
      setSuccessMessage('');
      return;
    }

    // Convert feet and inches to total inches
    const heightInInches = parseInt(feet, 10) * 12 + parseInt(inches, 10);

    const data = {
      height: heightInInches,
      goalWeight,
      dateT,
      token,
    };

    try {
      const response = await fetch(`${environment.baseUrl}/api/v1/weight/first/weightReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signUpToken: token,
          height: heightInInches,
          weight: goalWeight,
          dateT,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Report added successfully!');
        setErrorMessage('');
        window.location.href = `/login`;
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
      <h2>Please Enter Your Height (in feet and inches) and Weight (in lbs) as of Today</h2>
      <div className="height-section">
        <label>
          Feet:
          <input
            type="number"
            value={feet}
            onChange={(e) => setFeet(Math.round(e.target.value))}
          />
        </label>
        <label>
          Inches:
          <input
            type="number"
            value={inches}
            onChange={(e) => setInches(Math.min(Math.max(Math.round(e.target.value), 0), 11))}
          />
        </label>
      </div>
      <div className="weight-section">
        <label>
          Weight (in lbs):
          <input
            type="number"
            value={goalWeight}
            onChange={(e) => setGoalWeight(Math.round(e.target.value))}
            required
          />
        </label>
      </div>
      <div className="submit-section">
        <Button label="Submit" size="small" onClick={handleAddReport} />
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    </div>
  );
}

export default SignupWeightAndHeight;
