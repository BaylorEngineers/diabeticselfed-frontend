import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import environment from '../environment';

import '../pages/css/modal.css'
import Survey from './MotivationalMessage/survey';

// Modal.setAppElement('#root'); 

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
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');


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
      const response = await fetch(`${environment.baseUrl}/api/v1/survey/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(survey)
      });

      if (response.ok) {
        setSuccessMessage("Successfully submitted!");
        setTimeout(() => setSuccessMessage(''), 5000);
        console.log(response);
      } else {
        setErrorMessage('Survey not saved.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the survey.');
    }

    console.log(`${environment.baseUrl}/api/v1/motivationalmessage/get/`+ String(localStorage.getItem('patientId')));
    
    const fetchMessage = await fetch(`${environment.baseUrl}/api/v1/motivationalmessage/get/`+ String(localStorage.getItem('patientId')), {
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
            console.log("Set motivational message true: " + message_content);
            navigate("/survey");
            setViewMotivationalMessage(true);
          } else {
            // onRequestClose();
          }

    setSubmitted(true) ;

    // onRequestClose();
  }


  return (
    <div>
      {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
      <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Survey Modal"
      className="new-modal-container"
    >
      
      
      <h4 className="new-title">{ modalTitle }</h4>

      {
        viewMotivationalMessage &&
        (<h3>{message_content}</h3>
          
        )
      }
      <div className="new-question">
        <text>{ question }</text>
      </div>
      
      <div className="new-radio-container">
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
      <div className="new-button-container">
      <button className="new-submit-button disabled={disable}" 
              disabled={disable} 
              onClick={handleSubmit}
              style={disable ? 
              styles.disabledButton : styles.enabledButton}
              >Submit</button>
      <button className="new-close-button" onClick={onRequestClose}>Close</button>
      </div>
      
    </Modal>
    </div>
    
  );
}

export default CustomModal;

const styles = { 
  disabledButton: { 
      backgroundColor: 'gray', 
      color: 'white', 
      cursor: 'not-allowed'
  }
};