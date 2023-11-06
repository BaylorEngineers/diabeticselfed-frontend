import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import '../pages/css/modal.css'
import Survey from './MotivationalMessage/survey';

Modal.setAppElement('#root'); 

function CustomModal({ isOpen, onRequestClose, onSubmit, question } ) {
  const modalTitle = 'Healthy Diet Survey Question';
  const [selectedOption, setSelectedOption] = useState(''); 
  const [response, setResponse] = useState('');
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

  const handleOptionChange = (event) => {
    if (event.target.value === "Yes") {
      setResponse(true);
    } else {
      setResponse(false);
    }
    
    setSelectedOption(event.target.value);
  }

  const handleSubmit = async (event) => {

    setDisable(true);

    console.log(JSON.stringify(survey));
    try {
      const response = await fetch('http://localhost:8080/api/v1/survey/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(survey)
      });

      if (response.ok) {
        console.log(response);
      } else {
        setErrorMessage('Survey not saved.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the survey.');
    }

    console.log('http://localhost:8080/api/v1/motivationalmessage/get/'+ String(localStorage.getItem('patientId')));
    
    const fetchMessage = await fetch('http://localhost:8080/api/v1/motivationalmessage/get/'+ String(localStorage.getItem('patientId')), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
  
          const data = await fetchMessage.json();
          
          setLoading(false);
          setMessage_content(data['message_content']);
          console.log(data['message_content']);

          if (message_content !== null) {
            console.log("Set true motivational message");
            setViewMotivationalMessage(true);
          }

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