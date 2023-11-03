import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';


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
              {clinicians.map((clinician) => (
                <div key={`${clinician.firstname}-${clinician.lastname}`} className="clinician-preview">
                  <div className="clinician-name">{clinician.firstname} {clinician.lastname}</div>
                  {/* Add other clinician details as needed */}
                </div>
              ))}
          </div>
          </>
      );
  };


export default AccessRecords;
