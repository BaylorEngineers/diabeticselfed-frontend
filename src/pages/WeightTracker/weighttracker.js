import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Button from '../../components/Button/Button';
import { format } from 'date-fns';
import './weighttracker.css';
import Plot from 'react-plotly.js';

const WeightTrackerPage = () => {
  const [goalWeight, setGoalWeight] = useState('');
  const [height, setHeight] = useState('');
  const [dateT, setDateT] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reports, setReports] = useState([]);
  const [updatedReports, setUpdatedReports] = useState([]);


  // Function to calculate BMI
  const calculateBMI = (height, weight) => {
    // Formula: BMI = weight (kg) / (height (m) * height (m))
    const heightInMeters = height / 100; // Convert height to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const patientID = Number(localStorage.getItem('patientID'));
  console.log(patientID);

   const accessToken = String(localStorage.getItem('accessToken'));
   console.log(accessToken);

useEffect(() => {
  // Fetch report by patientId
  fetch(`http://localhost:8080/api/v1/weight/fetchReport/${patientID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
      }
      return response.json();
    })
    .then(reports => {
      setReports(reports);
      console.log('Reports:', reports);
    })
    .catch(error => {
      console.error('Error fetching reports:', error.message);
    });
}, []);

const handleAddReport = async () => {
console.log(dateT);
    try {
      const response = await fetch('http://localhost:8080/api/v1/weight/addReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          patientId: patientID, // Replace with the actual patientId
          height: height,
          weight: goalWeight,
          dateT: dateT,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok (${response.status}: ${response.statusText}): ${errorText}`);
      }

      setSuccessMessage('Report added successfully!');
      setErrorMessage('');

      const updatedReportsResponse = await fetch(`http://localhost:8080/api/v1/weight/fetchReport/${patientID}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (updatedReportsResponse.ok) {
            const updatedReports = await updatedReportsResponse.json();
            setReports(updatedReports);
          } else {
            console.error('Failed to fetch updated reports after adding a new report.');
          }


    } catch (error) {
      console.error('Error adding report:', error.message);
      setErrorMessage('Error adding report: ' + error.message);
      setSuccessMessage('');
    }
  };

const updatedData = reports.map((report) => ({
    ...report,
    bmi: calculateBMI(report.height, report.weight),
  }));

 const plotData = {
    x: updatedData.map((report) => report.dateT),
    y: updatedData.map((report) => report.bmi),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
  };

  return (
  <>
  <Header role="PATIENT"/>

     <div style={{ textAlign: 'center' }}>
    <h2>Set Your Weight Loss Goal</h2>
    <div className="weight-goal-section">
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
              />
            </label>
                        <label>
                          Date (in mm-dd-yyyy):
                          <input
                            type="text"
                            value={dateT}
                            onChange={(e) => setDateT(e.target.value)}
                          />
                        </label>

     <Button label="Add Report" size="small" onClick={handleAddReport}/>
           {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
           {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
    <div style={{ marginTop: '20px' }}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Height (inches)</th>
            <th>Weight (lbs)</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.dateT.split("T")[0]}</td>
              <td>{report.height}</td>
               <td>{report.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Plot
                data={[plotData]}
                layout={{
                  title: 'Weight Tracking Report',
                  xaxis: { title: 'Date' },
                  yaxis: { title: 'BMI' },
                }}
              />
      </div>
    </div>
    </>
  );
};

export default WeightTrackerPage;
