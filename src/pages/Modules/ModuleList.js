import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ModuleList.css';
import Header from '../../components/Header/Header';

const ModuleList = () => {
  const { contentAreaId } = useParams();
  const [contentArea, setContentArea] = useState('');
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContentArea = async () => {
      try {
        const response = await axios.get(`https://seal-app-by4vt.ondigitalocean.app/api/content-areas/${contentAreaId}`);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredModules = modules.filter(module => 
    module.keywords.toLowerCase().includes(searchTerm)
  );

  const getProgress = (module) => {
    return module.progress || 50; // Replace with actual progress property if available
  };

  return (
    <>
      <Header role="ADMIN" />
      <div className="module-list-container">
        <header className="module-list-header">
          <h1>{contentArea}</h1>
          <input
            type="text"
            placeholder="Search by keywords..."
            onChange={handleSearchChange}
            className="module-search-input"
          />
        </header>
        <table className="module-list">
          <thead>
            <tr>
              <th>Module #</th>
              <th>Title</th>
              <th>Description</th>
              <th>Format</th>
              <th>Progress</th>
              <th>Resources</th>
            </tr>
          </thead>
          <tbody>
            {filteredModules.length > 0 ? (
              filteredModules.map((module, index) => (
                <tr key={module.id} className="module-item">
                  <td className="module-id">#{index + 1}</td>
                  <td className="module-name">{module.name}</td>
                  <td className="module-name">{module.description}</td>
                  <td className="module-format">{module.filePath.split('.').pop().toUpperCase()}</td>
                  <td className="module-progress">
                    <div className="module-progress-bar-container">
                      <div className="module-progress-bar" style={{ width: `${getProgress(module)}%` }}></div>
                    </div>
                  </td>
                  <td>
                    <a href={`/module/${module.id}`} className="module-link">View Module</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="module-list-empty">No modules found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ModuleList;
