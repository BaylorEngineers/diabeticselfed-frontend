// PatientPosts.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./ForumPost.css";

const PatientPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const patientId = 5;
  const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTY5ODg4MTc0MSwiZXhwIjoxNjk4OTY4MTQxfQ.d5gPvb711alDpUfvT8NCEejRu-1yI17EekT0D6u1Wpc"
// const patientId = localStorage.getItem('patientId'); // Retrieve the patientId from local storage
// const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/forum-posts/posts/${patientId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) { // If the response is not 2xx, it will be considered as an error
          throw new Error(`Error: ${response.status}`); // Throw an error with the status code
        }

        const data = await response.json();
        setPosts(data);

      } catch (err) {
        setError(err.message); // Setting the error message in the state
      }
    };

    fetchPosts();
  }, []);


  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/forum-posts/${postId}/patient/${patientId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
  
      if (response.status!=204) {
        throw new Error(`Error: ${response.status}`);
      }
  
      setPosts(posts.filter(post => post.id !== postId));
  
    } catch (err) {
      setError(err.message); // Setting the error message in the state
    }
  };

  return (
    <div className="forum-page">
      <Header role="PATIENT" />
      <div className="forum-content">
        <div className="forum-post-container">
        {error && <div className="error-message">{error}</div>} 
          <div className="posts-container">
            {posts.map((post) => (
              <div key={post.id} className="post-entry">
                <Link to={`/posts/${post.id}`} className="post-entry-link">
                  <h2 className="post-title">{post.title}</h2>
                  <div className="post-details">
                    <span className="post-owner">{`${post.ownerFirstName} ${post.ownerLastName}`}</span>
                    <span className="post-date">{new Date(post.postDate).toLocaleDateString()}</span>
                  </div>
                </Link>
                <button onClick={() => deletePost(post.id)} className="delete-post-button">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPosts;
