import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import '../pages/css/modal.css'
import Survey from './MotivationalMessage/survey';

Modal.setAppElement('#root'); 

function CustomModal({ isOpen, onRequestClose, onSubmit, question } ) {
  const [modalInput, setModalInput] = useState('');
  // const [Question, setQuestion] = useState('Do you feel like you have been adhering to a healthy diet the past few days?');
  const modalTitle = 'Healthy Diet Survey Question';
  const [accessToken, setAccessToken] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // Store the selected option (Yes or No)
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [viewMotivationalMessage, setViewMotivationalMessage] = useState(false);
  const [message_content, setMessage_content] = useState('');


  const patientId = localStorage.getItem('patientId');
  const questionId = 1;


  const dateT = new Date;

  const survey = { patientId, dateT, questionId, response };

  
  // const jwtToken = localStorage.getItem('accessToken');
  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBtYWlsLmNvbSIsImlhdCI6MTY5OTIxMTQyNiwiZXhwIjoxNjk5Mjk3ODI2fQ.YJ40iXWVTlsTrBcPapLti_363U3ZIAq4u9bTS4P_s7A";


  const handleOptionChange = (event) => {
    if (event.target.value === "Yes") {
      setResponse(true);
    } else {
      setResponse(false);
    }
    
    setSelectedOption(event.target.value);
  }

  const handleSubmit = async (event) => {

    // if (selectedOption) {

    //   onSubmit(survey); 
    //   console.log(survey);
    //   onRequestClose();
    // }

    setDisable(true);

    console.log(JSON.stringify(survey));
    try {
      const response = await fetch('http://localhost:8080/api/v1/survey/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'//,
          // 'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY5OTIxMjM1MiwiZXhwIjoxNjk5Mjk4NzUyfQ._MW7-Jg3f1elRDoYGzJlPOHfkj_KtbArEIcM5XOqSzY" // Add the JWT token here
        },
        body: JSON.stringify(survey)
      });

      if (response.ok) {
        console.log(response);
      } else {
        // If the response is not OK, set an error message
        setErrorMessage('Survey not saved.');
      }
    } catch (error) {
      // If there is an error during the fetch, set an error message
      setErrorMessage('An error occurred while submitting the survey.');
    }

    // const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY5OTIxMjM1MiwiZXhwIjoxNjk5Mjk4NzUyfQ._MW7-Jg3f1elRDoYGzJlPOHfkj_KtbArEIcM5XOqSzY";

    console.log('http://localhost:8080/api/v1/motivationalmessage/get/'+ String(localStorage.getItem('patientId')));
    //fetch if answered 'No' for three consecutive times
    const fetchMessage = await fetch('http://localhost:8080/api/v1/motivationalmessage/get/'+ String(localStorage.getItem('patientId')), {
            method: 'GET',
            headers: {
              // Include the Authorization header with the token
              // 'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json'
            },
          });
          
          // if (!response.ok) {
          //   // If the response is not ok, set an error message
          //   setError("Unable to fetch message.");
            
          //   // Clear the error after 5 seconds
          //   const timer = setTimeout(() => {
          //     setError("");
          //   }, 5000);
          //   setLoading(false);
          //   // Clear timeout if the component unmounts
          //   return () => clearTimeout(timer);
          // }
  
          const data = await fetchMessage.json();
          
          setLoading(false);
          setMessage_content(data['message_content']);
          console.log(data['message_content']);

          if (message_content !== null) {
            console.log("Set true motivational message");
            setViewMotivationalMessage(true);
          }
    //end fetch

    setSubmitted(true) ;
    onRequestClose();
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Survey Modal"
      className="modal-container"
    >
      <h4>{ modalTitle }</h4>

      {
        viewMotivationalMessage &&
        (<h3>{message_content}</h3>
          
        )
      }
      
      <label>{ question }</label>
      <div className="radio-container">
        <label>
          <input
            type="radio"
            value="Yes"
            checked={selectedOption === 'Yes'}
            onChange={handleOptionChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            value="No"
            checked={selectedOption === 'No'}
            onChange={handleOptionChange}
          />
          No
        </label>
      </div>
      <div className="button-container">
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <button className="close-button" onClick={onRequestClose}>Close</button>
      </div>
      
    </Modal>
  );
}

export default CustomModal;