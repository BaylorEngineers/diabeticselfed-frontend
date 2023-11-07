import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '../../components/Button/Button';
import './signUpSetProgramGoal.css';

function SignupGoal() {
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [dateT, setDateT] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  

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
        <Button label="Submit" size="small"  />
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    </div>
  );
}

export default SignupGoal;
