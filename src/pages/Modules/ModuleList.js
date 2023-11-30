// ModuleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ModuleList.css';
import Header from '../../components/Header/Header';

const ModuleList = () => {
  const { contentAreaId } = useParams();
  const [contentArea, setContentArea] = useState('');
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchContentArea = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/content-areas/${contentAreaId}`);
        setContentArea(response.data.name);
        setModules(response.data.modules);
      } catch (error) {
        console.error('Error fetching content area and modules:', error);
      }
    };

    if (contentAreaId) {
      fetchContentArea();
    }
  }, [contentAreaId]);

  // Dummy function to format the progress for display, replace with actual logic
  const getProgress = (module) => {
    return module.progress || 0; // Replace with actual progress property if available
  };

  return (
    <>
      <Header role="ADMIN" />
      <div className="module-list-container">
        <header className="module-list-header">
          <h1>{contentArea}</h1>
        </header>
        <table className="module-list">
          <thead>
            <tr>
              <th>Module #</th>
              <th>Title</th>
              <th>Format</th>
              <th>Progress</th>
              <th>Resources</th>
            </tr>
          </thead>
          <tbody>
            {modules.length > 0 ? (
              modules.map((module) => (
                <tr key={module.id} className="module-item">
                  <td className="module-id">#{module.id}</td>
                  <td className="module-name">{module.name}</td>
                  {/*<td className="module-description">{module.description}</td>*/}
                  <td className="module-format">{module.filePath.split('.').pop().toUpperCase()}</td>
                  <td className="module-progress">
                    <div className="module-progress-bar-container">
                      <div className="module-progress-bar" style={{ width: `${getProgress(module)}%` }}></div>
                    </div>
                  </td>
                  <td>
                    <a href={`/module/${module.id}`} className="module-link"> View Module </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="module-list-empty">No modules found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ModuleList;
