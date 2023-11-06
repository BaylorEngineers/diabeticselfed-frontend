import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './accessrecords.css';


// Dummy data
//const clinicians = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];
const accessToken = String(localStorage.getItem('accessToken'));
console.log(accessToken);
const AccessRecords = () => {

const [clinicians, setClinicians] = useState([]);
useEffect(() => {
const getAllClinicians = async () => {
          try {
              const response = await fetch('http://localhost:8080/api/v1/clinicians/getAll', {
              mode:'cors',
              method: 'GET',
              headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accessToken}`,
              },
          });

          if (!response.ok) {
              throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
          }

          const cliniciansData = await response.json();
          setClinicians(cliniciansData);
          console.log(cliniciansData);
      } catch (error) {
          console.error('Error fetching clinicians:', error.message);
      }
  };

  getAllClinicians();
}, [accessToken]);

//  const handlePullRecords = (e) => {
//
//    e.preventDefault();
//
//    // Logic to pull records based on selected user and email
//    console.log('Pulling records for:', selectedUser);
//
//    // Dummy record data (replace this with your actual logic to fetch records)
//    const dummyRecords = [
//      { date: '2023-10-10', description: 'Record 1' },
//      { date: '2023-10-11', description: 'Record 2' },
//      { date: '2023-10-12', description: 'Record 3' },
//    ];
//
//    setRecordData(dummyRecords);
//  };

  return (
    <>
      <Header role="ADMIN" />
      <div className="clinicians-list">
      <h2>Clinicians</h2>
        {clinicians.map((clinician) => (
          <div key={clinician.userId} className="clinician-preview">
            <div className="clinician-name">{clinician.name}</div>
            <div className="clinician-email">{clinician.email}</div>
          </div>
        ))}
      </div>
    </>
  );
 };


export default AccessRecords;
