import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import './weighttracker.css';
import Plot from 'react-plotly.js';

const WeightTrackerPage = () => {
  // Sample data (replace with your actual data)
  const sampleData = [
    { date: '2023-10-01', height: 170, weight: 70 },
    { date: '2023-10-02', height: 172, weight: 68 },
    { date: '2023-10-03', height: 175, weight: 72 },
    // Add more data...
  ];

  // State to store the data
  const [weightData, setWeightData] = useState(sampleData);

  // Function to calculate BMI
  const calculateBMI = (height, weight) => {
    // Formula: BMI = weight (kg) / (height (m) * height (m))
    const heightInMeters = height / 100; // Convert height to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  // Effect to add BMI to the data
  useEffect(() => {
    const updatedData = weightData.map((entry) => ({
      ...entry,
      bmi: calculateBMI(entry.height, entry.weight),
    }));
    setWeightData(updatedData);
  }, [weightData]);

  return (
  <>
  <Header role="PATIENT"/>
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Height (cm)</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {weightData.map((entry) => (
            <tr key={entry.date}>
              <td>{entry.date}</td>
              <td>{entry.height}</td>
              <td>{entry.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Plotly Graph */}
      <div style={{ marginTop: '20px' }}>
        <Plot
          data={[
            {
              x: weightData.map((entry) => entry.date),
              y: weightData.map((entry) => entry.bmi),
              type: 'scatter',
              mode: 'lines+points',
              marker: { color: 'blue' },
            },
          ]}
          layout={{
            width: 600,
            height: 400,
            title: 'BMI Over Time',
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
