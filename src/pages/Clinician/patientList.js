import React, {useState, useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import "./PatientList.css";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [note, setNote] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            };

            try {
                const response = await fetch("http://localhost:8080/api/v1/users/viewpatientsummary", requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        fetchData();
    }, []);


    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const submitNote = (patientId) => {
        const payload = {
            patientId: patientId,
            note: note,
        };

        fetch("http://localhost:8080/api/v1/users/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Note added successfully!");
                    setNote(""); // Clear the note input after successful submission
                } else {
                    alert("Failed to add note.");
                }
            })
            .catch((error) => console.error("Error posting note:", error));
    };

    const handleViewProfile = (patient) => {
        setSelectedPatient(patient);
    };

    const renderSurveyAnswers = (patient) => {
        return (
            <div className="survey-answers">
                <h4>Survey Answers:</h4>
                <ul>
                    {patient.answerList.map((answer, index) => (
                        <li key={index}>
                            Q: {patient.questionDescriptionList[index]} -
                            A: {answer ? 'Yes' : 'No'} on {new Date(patient.answerDateList[index]).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderModulesTable = (patient) => {
        return (
            <div className="module-info">
                <h4>Modules:</h4>
                <table className="modules-table">
                    <thead>
                    <tr>
                        <th>Module Name</th>
                        <th>Description</th>
                        <th>Progress (%)</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patient.moduleNames.map((moduleName, index) => (
                        <tr key={index}>
                            <td>{moduleName}</td>
                            <td>{patient.moduleDescriptions[index]}</td>
                            <td>{patient.moduleProgressPercentages[index]}</td>
                            <td>{patient.moduleStartTimes[index] ? new Date(patient.moduleStartTimes[index]).toLocaleString() : 'N/A'}</td>
                            <td>{patient.moduleEndTimes[index] ? new Date(patient.moduleEndTimes[index]).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderClinicianNotes = (patient) => {
        return (
            <div className="clinician-notes-section">
                <h4>Clinician Notes:</h4>
                <ul>
                    {patient.clinicianNotes.map((note, index) => (
                        <li key={index}>
                            <span>{new Date(patient.noteTimes[index]).toLocaleString()}: </span>
                            <span>{note}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };


    return (
        <>
            <Header/>
            <Sidebar sidebarType="sidebarClinician"/>
            <Header  role="CLINICIAN"/>
            {/* <Sidebar sidebarType="sidebarClinician" /> */}
            <div className="patient-list">
                <h2>Patients List</h2>
                <div>
                    {patients.map((patient, index) => (
                        <div key={index} className="patient">
                            <span className="patient-name">{patient.patientName}</span>
                            <Button label="View Profile" onClick={() => handleViewProfile(patient)} size="small"/>
                            <textarea
                                value={selectedPatient?.patientId === patient.patientId ? note : ""}
                                onChange={handleNoteChange}
                                placeholder="Write a note..."
                                className="note-input"
                            />
                            <Button
                                label="Save Note"
                                onClick={() => submitNote(patient.patientId)}
                                size="small"
                            />
                        </div>
                    ))}
                </div>

                {selectedPatient && (
                    <div className="profile">
                        <h3>{selectedPatient.patientName}'s Profile:</h3>
                        <p>Date of Birth: {new Date(selectedPatient.patientDOB).toLocaleDateString()}</p>
                        <p>Height(inches): {selectedPatient.height ? `${selectedPatient.height} ` : 'N/A'}</p>
                        <div className="profile-spacing"></div>
                        {/* This adds the space */}
                        {renderSurveyAnswers(selectedPatient)}
                        <div className="bmi-weight-table">
                            <h4>Weight and BMI Track:</h4>
                            <table>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Weight (lbs)</th>
                                    <th>BMI</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedPatient.weightList.map((weight, index) => (
                                    <tr key={index}>
                                        <td>{new Date(selectedPatient.weightTimeList[index]).toLocaleDateString()}</td>
                                        <td>{weight}</td>
                                        <td>{selectedPatient.bmiList[index].toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        {renderModulesTable(selectedPatient)}
                        {renderClinicianNotes(selectedPatient)}
                    </div>
                )}
            </div>
        </>
    );
};

export default PatientList;
