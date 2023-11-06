import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import CustomModal from '../SurveyModal';

const Survey = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalRender, setModalRender] = useState(true);

    // console.log(message);


    useEffect(() => {
        const fetchSurvey = async () => {
          // setLoading(true); // Start loading
          // setError(''); // Clear previous errors
          const patientId = localStorage.getItem('patientId');
    
          // Your JWT token
          const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBtYWlsLmNvbSIsImlhdCI6MTY5OTIyNTM4NSwiZXhwIjoxNjk5MzExNzg1fQ.EgLN_dGJP6IugxcaQA_nTbKgQOjOvX-NIn895bSYfhU";
          // String(localStorage.getItem('accessToken'));
          setAccessToken(jwtToken);
          // 
    
            const response = await fetch('http://localhost:8080/api/v1/question/get/'+1, {
              method: 'GET',
              headers: {
                // Include the Authorization header with the token
                // 'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
            });
            
            if (!response.ok) {
              // If the response is not ok, set an error message
              setError("Unable to fetch posts. Please try again later.");
              
              // Clear the error after 5 seconds
              const timer = setTimeout(() => {
                setError("");
              }, 5000);
              setLoading(false);
              // Clear timeout if the component unmounts
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
      };

      const handleModalSubmit = (modalInput) => {
        console.log(modalInput);
      }

    return (
        <>
          <Header role="PATIENT" /> {/* Pass role as a prop */}
          <div className="create-post-container">
                {
                    modalRender && 
                    <CustomModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    onSubmit={handleModalSubmit}
                    question = {question}
                    />
                }

                {/* <h3>{message}</h3> */}
          </div>
        </>
      );
};

export default Survey;