import React, { useState, useEffect } from 'react';
import './ModuleDetails.css';
import Header from '../../components/Header/Header';
import moduleImage from '../../images/Family-Why-I-Prevent-T2.png'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const ModuleDetails = ({ moduleId }) => {
  const [moduleDetails, setModuleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartClick = () => {
    navigate(`/view-pdf/${moduleId}`);
  };

  const progress = 75;

  useEffect(() => {
    fetch(`http://localhost:8080/api/modules/${moduleId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setModuleDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [moduleId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header role="ADMIN" />
      <div className="module-details-container">
        {moduleDetails && (
          <div className="module-details-card">
            <div className="module-image-container">
              <img src={moduleImage} alt={moduleDetails.name} className="module-image" />
            </div>
            <div className="module-top-content">
              <h1 className="module-title">{moduleDetails.name}</h1>
              <p className="module-description">{moduleDetails.description}</p>
              {/* <div className="module-format">Format: {moduleDetails.format}</div> */}
              <div className="module-progress-bar-container">
                <div className="module-progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
               <div className="module-action-buttons">
                    <button onClick={handleStartClick}>Start Module</button>
                    <button onClick={() => window.location.href = moduleDetails.filePath}>Resume</button>
                </div>
            </div>
          </div>
        )}
        <button className="nav-button prev-button">Prev</button>
        <button className="nav-button next-button">Next</button>
      </div>
    </>
  );
};

export default ModuleDetails;
