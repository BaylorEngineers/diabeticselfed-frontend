// ForumPost.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // make sure you have react-router-dom installed
import Header from "../../components/Header/Header";
import "./ForumPost.css";

const ForumPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(''); // Add an error state
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      setError(''); // Clear previous errors

      // Your JWT token
      const jwtToken = localStorage.getItem('accessToken');
      

        const response = await fetch('http://localhost:8080/api/v1/forum-posts/allposts', {
          method: 'GET',
          headers: {
            // Include the Authorization header with the token
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
        });
        
        if (!response.ok) {
          // If the response is not ok, set an error message
          setError("Unable to fetch posts. Please try again later.");
          
          // Clear the error after 5 seconds
          const timer = setTimeout(() => {
            setError("");
          }, 5000);
          setLoading(false);
          // Clear timeout if the component unmounts
          return () => clearTimeout(timer);
        }
        const data = await response.json();
        setLoading(false);
        setPosts(data);

    };

    fetchPosts();
  }, []);

  return (
    <div className="forum-page">
      <Header role={role} />
      <div className="forum-content">
        <div className="forum-post-container">
          {loading && <div>Loading posts...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && posts.length === 0 && (
            <div>No posts available.</div>
          )}
          <div className="posts-container">
            {posts.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id} className="post-entry-link">
                <div className="post-entry">
                  <h2 className="post-title">{post.title}</h2>
                  <div className="post-details">
                    <span className="post-owner">{`${post.ownerFirstName} ${post.ownerLastName}`}</span>
                    <span className="post-date">{new Date(post.postDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {role === "PATIENT" && (
            <Link to="/create-post" className="create-post-link">Create New Post</Link>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForumPost;

