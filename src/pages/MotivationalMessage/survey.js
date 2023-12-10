import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import CustomModal from '../SurveyModal';
import "./stylesurvey.css";

const Survey = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalRender, setModalRender] = useState(true);


    useEffect(() => {
        const fetchSurvey = async () => {

          const patientId = localStorage.getItem('patientId');
    
            const response = await fetch('http://localhost:8080/api/v1/question/get/'+1, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            });
            
            if (!response.ok) {
              setError("Unable to fetch posts. Please try again later.");
              
              const timer = setTimeout(() => {
                setError("");
              }, 5000);
              setLoading(false);
              return () => clearTimeout(timer);
            }
    
            const data = await response.json();
            setLoading(false);
            setQuestion(data['description']);
            console.log(data['description']);
    
        };
    
        fetchSurvey();
      }, []);

    const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
        window.location.href = "/";
      };

      const handleModalSubmit = (modalInput) => {
        console.log(modalInput);
      }

    return (
        <>
          <Header role="PATIENT" />
          <div className="create-post-container">
                {
                    modalRender && 
                    <CustomModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    onSubmit={handleModalSubmit}
                    question = {question}
                    className = "centered-component"
                    />
                }
          </div>
        </>
      );
};

export default Survey;