import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Button from '../../components/Button/Button';
import { format } from 'date-fns';
import './weighttracker.css';
import Plot from 'react-plotly.js';

const WeightTrackerPage = () => {
  // variables for weight report
  const [goalWeight, setGoalWeight] = useState('');
  const [height, setHeight] = useState('');
  const [dateT, setDateT] = useState('');
  const [dateString, setDateString] =  useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reports, setReports] = useState([]);
  const [updatedReports, setUpdatedReports] = useState([]);
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [isBmiPlot, setIsBmiPlot] = useState(false);

  const togglePlot = () => {
    setIsBmiPlot(!isBmiPlot);
  };


  
  // variables for program goals
  const [weightLossPercent, setWeightLossPercent] = useState('');
  const [newWeightLossPercent, setNewWeightLossPercent] = useState('');
  const [teapotMessage, setTeapotMessage] = useState('');
  const [earliestReport, setEarliestReport] = useState('');
  const [earliestHeight, setEarliestHeight] = useState('');

  // List of numbers to choose from
  const numberOptions = [0, 1, 2, 3, 4, 5];

  // Handle the change event when a number is selected
  const handleNumberChange = (event) => {
    const selectedValue = event.target.value;
    const earliest = reports.reduce((earliest, current) => {
      if (!earliest || new Date(current.dateT) < new Date(earliest.dateT)) {
        return current;
      }
      return earliest;
    }, null);
    setEarliestReport(earliest);
    setWeightLossPercent(selectedValue);
    setNewWeightLossPercent(selectedValue);
  };


  // Function to calculate BMI
  const calculateBMI = (height, weight) => {
    // Formula: BMI = weight (kg) / (height (m) * height (m))
    // const heightInMeters = height / 100; // Convert height to meters
    return ((weight / (height * height)) * 703).toFixed(2);
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

     // Calculate the earliest report
     const earliest = reports.reduce((earliest, current) => {
      if (!earliest || new Date(current.dateT) < new Date(earliest.dateT)) {
        return current;
      }
      return earliest;
    }, null);
    setEarliestReport(earliest);
    setEarliestHeight(earliest.height);
    })
    .catch(error => {
      console.error('Error fetching reports:', error.message);
    });

    // Fetching weightloss goal
    // Fetch weight loss percentage from the backend
    fetch(`http://localhost:8080/api/v1/goals/getGoal`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (response.status === 418) {
          setTeapotMessage("It seems like you haven't set a program goal yet!");
          return 100; // Set to 0 in case of teapot response
        } else if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
        }
        return response.json();
      })
      .then(data => {

        setWeightLossPercent(data.weightLossPercent);
        setNewWeightLossPercent(data.weightLossPercent);
      })
      .catch(error => {
        console.error('Error fetching weight loss percentage:', error.message);
        setErrorMessage('Error fetching weight loss percentage: ' + error.message);
      });

}, []);

const handleAddReport = async () => {
  const heightInInches = parseInt(feet, 10) * 12 + parseInt(inches, 10);

  const data = {
    height: heightInInches,
    weight: goalWeight,
    dateT: dateString,
  };


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
          height: heightInInches,
          weight: goalWeight,
          dateT: dateString,
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

            const earliest = updatedReports.reduce((earliest, current) => {
              if (!earliest || new Date(current.dateT) < new Date(earliest.dateT)) {
                return current;
              }
              return earliest;
            }, null);
            setEarliestReport(earliest);
            setEarliestHeight(earliest.height);

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

  // const earliestReport = reports.reduce((earliest, current) => {
  //   if (!earliest || new Date(current.dateT) < new Date(earliest.dateT)) {
  //     return current;
  //   }
  //   return earliest;
  // }, 0);

  const findEarliestReport = () => {
    return reports.reduce((earliest, current) => {
      if (!earliest || new Date(current.dateT) < new Date(earliest.dateT)) {
        return current;
      }
      return earliest;
    }, null);
  };

  const handleUpdateGoal = async () => {
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/goals/setGoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          patientId: patientID,
          weightLossPercent: newWeightLossPercent, // Use the new weight loss percent
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok (${response.status}: ${response.statusText}): ${errorText}`);
      }

      setSuccessMessage('Weight loss goal updated successfully!');
      setErrorMessage('');

      // Update the current weight loss percent after the update
      setWeightLossPercent(newWeightLossPercent);

    } catch (error) {
      console.error('Error updating weight loss goal:', error.message);
      setErrorMessage('Error updating weight loss goal: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
  <>
  <Header role="PATIENT"/>

    <div style={{ textAlign: 'center' }}>
    <h2>Set Your Weight Loss Goal</h2>
    <div className="program-goal-section">
        {errorMessage && (
          <div style={{ color: 'red' }}>
            {errorMessage}
          </div>
        )}
      {/* <h2>Your current Weight Loss Goal is: {earliestReport != null ? (earliestReport.weight - earliestReport.weight * weightLossPercent * 0.01).toFixed(2) : {newWeightLossPercent}} </h2> */}
      {earliestReport != null ? (
          <h2 >
          Your current Weight Loss Target Weight is: {(earliestReport.weight - earliestReport.weight * weightLossPercent * 0.01).toFixed(2)} lbs for losing {newWeightLossPercent}% of your initial weight
          </h2>
          ) : <h2>
            Your current Weight Loss Percentage Goal is: {newWeightLossPercent} % weight loss
            </h2>}
      <label>Select a Weight Loss Percentage:
          <select
              value={newWeightLossPercent} // Use the new weight loss percent
              onChange={handleNumberChange}
            >
              <option value="">Select a weight loss percentage</option>
              {numberOptions.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
          </select>
          <Button label="Update Goal" size="small" onClick={handleUpdateGoal} />
          </label>
          {earliestReport != null && (newWeightLossPercent < 2) && calculateBMI(earliestHeight, earliestReport != null ? earliestReport.weight : 0) > 23.5 ? (
          <div style={{ color: 'red' }}>
          Please consider that losing the recommended weight of 2-3% has many health benefits. Some of the benefits include preventing or delaying type 2 diabetes and ease sleep problems, arthritis, and depression
          </div>
          ) : null}
          {earliestReport != null && (newWeightLossPercent > 3) && calculateBMI(earliestHeight, earliestReport != null ? earliestReport.weight : 0) > 23.5 ? (
          <div style={{ color: 'red' }}>
          Your current BMI is {calculateBMI(earliestHeight, earliestReport != null ? earliestReport.weight : 0)} at the start of the program, please consider lower the weight loss goal to have a healthy weight loss plan.
          </div>
          ) : null}
          {earliestReport != null && (newWeightLossPercent > 3) && calculateBMI(earliestHeight, earliestReport != null ? earliestReport.weight : 0) < 23.5 && calculateBMI(height, earliestReport != null ? earliestReport.weight : 0) > 18.5 ? (
          <div style={{ color: 'red' }}>
          The recommended weight loss range is between 0 ~ 3 percent.
          </div>
          ) : null}
          {earliestReport != null && (newWeightLossPercent > 3) && calculateBMI(earliestHeight, earliestReport != null ? earliestReport.weight : 0) < 18.5 ? (
          <div style={{ color: 'red' }}>
          A BMI value of {calculateBMI(earliestHeight, earliestReport != null ? earliestReport.weight : 0)} is considered underweight, there is no need to lose weight!
          </div>
          ) : null}
          
    </div>
    <h2>Add Weight Loss Report</h2>
    <div className="weight-goal-section">
    <label>
            Height (Feet):
            <input
              type="number"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              required
            />
          </label>
          <label>
            Height (Inches):
            <input
              type="number"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              required
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
            <label>
              Date (in mm/dd/yyyy):
              <input
                type="date"
                value={dateT}
                onChange={(e) => {
                  if (e.target.value) {
                    const inputDate = new Date(e.target.value); // Convert the input to a Date object
                    setDateT(e.target.value);
                    setDateString(format(inputDate, 'yyyy-MM-dd'));
                    setDateString(format(inputDate.setDate(inputDate.getDate()+1), 'yyyy-MM-dd'));
                  } else {
                    const currentDate = new Date();
                    setDateT(currentDate);
                    setDateString(format(currentDate.setDate(currentDate.getDate()+1), 'yyyy-MM-dd'));
                  }
                }}
                required
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

      <Button label="Toggle Plot" size="small" onClick={togglePlot} />
      <div style={{ marginTop: '20px' }}>
        {isBmiPlot ? (
          <Plot
            data={[plotData]}
            layout={{
              title: 'Weight Tracking (BMI)',
              xaxis: { title: 'Date' },
              yaxis: { title: 'BMI' },
            }}
          />
        ) : (
          <Plot
            data={[
              {
                x: updatedData.map((report) => report.dateT),
                y: updatedData.map((report) => report.weight),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'green' },
              },
            ]}
            layout={{
              title: 'Weight Tracking (lbs)',
              xaxis: { title: 'Date' },
              yaxis: { title: 'Weight (lbs)' },
              shapes: [
                {
                  type: 'line',
                  x0: updatedData[0].dateT, // Adjust as needed
                  x1: updatedData[updatedData.length - 1].dateT, // Adjust as needed
                  y0: (earliestReport.weight - earliestReport.weight * weightLossPercent * 0.01).toFixed(2),
                  y1: (earliestReport.weight - earliestReport.weight * weightLossPercent * 0.01).toFixed(2),
                  line: {
                    color: 'red', // Adjust the line color as needed
                    width: 2, // Adjust the line width as needed
                  },
                },
              ],
            }}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default WeightTrackerPage;
