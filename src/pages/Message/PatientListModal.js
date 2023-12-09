import React, { useState, useEffect } from 'react';
import environment from '../../environment';

const PatientListModal = ({ onClose, jwtToken, userId, onMessageSent }) => {
  const [clinicians, setClinicians] = useState([]);
  const [selectedClinician, setSelectedClinician] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    console.log("addd");
    const fetchClinicians = async () => {
      try {
        const response = await fetch(`${environment.baseUrl}/api/v1/clinicians/getAllPatient`, {
          headers: { 'Authorization': `Bearer ${jwtToken}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch clinicians');
        }
        const data = await response.json();
        setClinicians(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchClinicians();
  }, [jwtToken]);

  const sendMessage = async () => {
    try {
      const response = await fetch(`${environment.baseUrl}/api/v1/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: selectedClinician,
          content: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      onMessageSent();
      setMessageContent('');
      setSelectedClinician(null);
      setErrorMessage(''); // Clear any previous errors
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Select a patient to message</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <ul className="clinician-list">
          {clinicians.map(clinician => (
            <li key={clinician.userId} className="clinician-item">
              <span className="clinician-name">{clinician.name}</span>
              <button className="send-message-button" onClick={() => setSelectedClinician(clinician.userId)}>Send Message</button>
            </li>
          ))}
        </ul>
        {selectedClinician && (
          <div className="message-input">
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type your message here"
            />
            <button className="send-message-button" onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientListModal;
