import React, { useState } from 'react';
import Modal from 'react-modal';

import '../pages/css/modal.css'

Modal.setAppElement('#root'); 

function CustomModal({ isOpen, onRequestClose, onSubmit }) {
  const [modalInput, setModalInput] = useState('');
  const [Question, setQuestion] = useState('Do you feel like you have been adhering to a healthy diet the past few days');
  const modalTitle = 'Healthy Diet Survey Question';

//   setQuestion('Do you feel like you have been adhering to a healthy diet the past few days?');


//   const handleSubmit = () => {
//     onSubmit(modalInput); // Pass the input value to the parent component onSubmit handler
//     setModalInput('');
//     onRequestClose(); // Close the modal
//   }
  
  const [selectedOption, setSelectedOption] = useState(''); // Store the selected option (Yes or No)

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption); 
      onRequestClose();
    }
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Survey Modal"
      className="modal-container"
    >
      <h4>{ modalTitle }</h4>
      <label>{ Question }</label>
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