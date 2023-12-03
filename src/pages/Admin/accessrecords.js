import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './accessrecords.css';

const accessToken = String(localStorage.getItem('accessToken'));

const AccessRecords = () => {
  const [clinicians, setClinicians] = useState([]);
  const [selectedClinician, setSelectedClinician] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewPatientsButtonVisibleMap, setViewPatientsButtonVisibleMap] = useState({});
  const [noPatientsAvailable, setNoPatientsAvailable] = useState(false);


  useEffect(() => {
    const getAllClinicians = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/clinicians/getAll', {
          mode: 'cors',
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

        // Initialize the viewPatientsButtonVisibleMap with default visibility for all clinicians
        const initialVisibilityMap = cliniciansData.reduce((map, clinician) => {
          map[clinician.userId] = true;
          return map;
        }, {});
        setViewPatientsButtonVisibleMap(initialVisibilityMap);
      } catch (error) {
        console.error('Error fetching clinicians:', error.message);
      }
    };

    getAllClinicians();
  }, [accessToken]);

  const toggleDetails = (index) => {
      setClinicians((prevClinicians) => {
        const updatedClinicians = prevClinicians.map((clinician, i) => ({
          ...clinician,
          expanded: i === index ? !clinician.expanded : false,
        }));

        const selectedClinician = updatedClinicians.find((clinician) => clinician.expanded);
        setSelectedClinician(selectedClinician);

        // Clear patients list when clinician details are expanded
        setPatients([]);

        return updatedClinicians;
      });
    };

  const viewPatients = async (userId) => {
    if (!userId) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/clinicians/${userId}/patients`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status}: ${response.statusText})`);
      }

      const patientsData = await response.json();
      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching patients:', error.message);
    } finally {
      setLoading(false);

      // Update the visibility map after fetching patients
      const updatedVisibilityMap = { ...viewPatientsButtonVisibleMap };
      updatedVisibilityMap[userId] = false;
      setViewPatientsButtonVisibleMap(updatedVisibilityMap);
    }
  };

  const viewPatientDetails = (patient) => {
    alert(`Name: ${patient.name}\nEmail: ${patient.email}`);
  };

  return (
      <>
        <Header role="ADMIN" />
        <div className="clinicians-list">
          <h2 className = "heading2">Clinicians</h2>
          {clinicians.map((clinician, index) => (
            <div key={clinician.userId} className={`clinician-preview ${clinician.expanded ? 'expanded' : ''}`}>
              <div className="clinician-name">{clinician.name}</div>
              {!clinician.expanded && (
                <button className="view-details-button" onClick={() => toggleDetails(index)}>
                  View Details
                </button>
              )}
              {clinician.expanded && (
                <div className="details-container">
                  <div className="clinician-details">
                    <div>Name: {clinician.name}</div>
                    <div>Email: {clinician.email || 'N/A'}</div>
                    <button
                                      className="view-patients-button"
                                      onClick={() => viewPatients(clinician.userId)}
                                    >
                                      View Patients
                                    </button>
                  </div>
                  {loading && <p>Loading patients...</p>}
                  {patients.length > 0 ? (
                    <div className="patient-list">
                      <h3 className="heading3">Patients:</h3>
                      <ul className="patientlist">
                        {patients.map((patient) => (
                          <li key={patient.userId} className="patient-item">
                            {patient.name}
                            <button
                              className="view-details-button"
                              onClick={() => viewPatientDetails(patient)}
                            >
                              View Details
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    noPatientsAvailable && <p>No patients available.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

export default AccessRecords;
