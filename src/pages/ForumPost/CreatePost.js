// CreatePost.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import './CreatePost.css'; 

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [patientId, setPatientId] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to store the error message
    const navigate = useNavigate();

  useEffect(() => {
    const storedPatientId = localStorage.getItem('patientId');
    if (storedPatientId) {
      setPatientId(storedPatientId);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBtYWlsLmNvbSIsImlhdCI6MTY5OTE2MDM0OCwiZXhwIjoxNjk5MjQ2NzQ4fQ.u689cF_N2IxwZn-g_cX5RlJ9moO1F7Hgrtt4E5GeYx0";
    
    // localStorage.getItem('accessToken'); // Retrieve the JWT token from local storage

    const post = { title, content, patientId };

    try {
      const response = await fetch('http://localhost:8080/api/v1/forum-posts/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}` // Add the JWT token here
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        navigate('/posts'); // If the response is OK, navigate back to the posts page
      } else {
        // If the response is not OK, set an error message
        setErrorMessage('Your post was not created successfully. Please try again.');
      }
    } catch (error) {
      // If there is an error during the fetch, set an error message
      setErrorMessage('An error occurred while creating the post. Please try again.');
    }
  };
  return (
    <>
      <Header role="PATIENT" /> {/* Pass role as a prop */}
      <div className="create-post-container">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label>Title:</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea id='contentbox'
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </>
  );
};

export default CreatePost;
