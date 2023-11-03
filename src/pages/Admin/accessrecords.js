import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

// Dummy data
const clinicians = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];

const AccessRecords = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [recordData, setRecordData] = useState(null); // State to store record data

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handlePullRecords = (e) => {

    e.preventDefault();

    // Logic to pull records based on selected user and email
    console.log('Pulling records for:', selectedUser);

    // Dummy record data (replace this with your actual logic to fetch records)
    const dummyRecords = [
      { date: '2023-10-10', description: 'Record 1' },
      { date: '2023-10-11', description: 'Record 2' },
      { date: '2023-10-12', description: 'Record 3' },
    ];

    setRecordData(dummyRecords);
  };

  return (
    <>
      <Header role = "ADMIN"/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <form>
          <label>
            Clinicians:
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="">Select Clinician</option>
              {clinicians.map((clinician, index) => (
                <option key={index} value={clinician}>
                  {clinician}
                </option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <Button label="Access Records" onClick={handlePullRecords} size="small"/>
        </form>

        {recordData && (
          <div style={{ marginTop: '20px' }}>
            <h2>Records for {selectedUser}</h2>
            <ul>
              {recordData.map((record, index) => (
                <li key={index}>
                  <strong>Date:</strong> {record.date}, <strong>Description:</strong> {record.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AccessRecords;
