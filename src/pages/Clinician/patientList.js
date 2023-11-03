import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import "./PatientList.css"; // Import the CSS file

const PatientList = () => {

    const [selectedPatient, setSelectedPatient] = useState(null);

    const fakePatients = [
        {
            name: "John Doe",
            visitingTime: "20 min",
            surveyAnswers: [
                { question: "Question 1?", answer: "Yes" },
                { question: "Question 2?", answer: "No" },
            ],
            weight: "70",
            bmi: "22.5",
        },
        {
            name: "Jane Doe",
            visitingTime: "30 min",
            surveyAnswers: [
                { question: "Question 3?", answer: "Yes" },
                { question: "Question 4?", answer: "No" },
            ],
            weight: "65",
            bmi: "21.5",
        },
    ];

    const handleViewProfile = (patient) => {
        setSelectedPatient(patient);
    };

    return (
        <>
            <Header  role="CLINICIAN"/>
            {/* <Sidebar sidebarType="sidebarClinician" /> */}
            <div className="patient-list">
                <h2>Patients List</h2>
                <div>
                    {fakePatients.map((patient, index) => (
                        <div key={index} className="patient">
                            <span className="patient-name">{patient.name}</span>
                            <Button label="View Profile" onClick={() => handleViewProfile(patient)} size="small" />
                        </div>
                    ))}
                </div>

                {selectedPatient && (
                    <div className="profile">
                        <h3>{selectedPatient.name}'s Profile:</h3>

                        <div className="visiting-time">
                            <h4>Visiting Time:</h4>
                            <p>{selectedPatient.visitingTime}</p>
                        </div>

                        <div className="survey-answers">
                            <h4>Survey Answers:</h4>
                            <ul>
                                {selectedPatient.surveyAnswers.map((answer, index) => (
                                    <li key={index}>
                                        Q: {answer.question} - A: {answer.answer}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="patient-weight-bmi">
                            <h4>Patient Weight/BMI:</h4>
                            <p>Weight: {selectedPatient.weight}kg</p>
                            <p>BMI: {selectedPatient.bmi}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PatientList;
