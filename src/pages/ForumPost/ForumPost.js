// ForumPost.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // make sure you have react-router-dom installed
import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "./Post"; // This is a component we will create to display each post
import "./ForumPost.css";
// import Sidebar from "./Sidebar.";


const ForumPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        // Your JWT token
        const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTY5ODg4MTc0MSwiZXhwIjoxNjk4OTY4MTQxfQ.d5gPvb711alDpUfvT8NCEejRu-1yI17EekT0D6u1Wpc';
      
        const response = await fetch('http://localhost:8080/api/v1/forum-posts/allposts', {
          method: 'GET',
          headers: {
            // Include the Authorization header with the token
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
        });
      
        const data = await response.json();
        setPosts(data);
      };

    fetchPosts();
  }, []);

  return (
    <div className="forum-page">
      <Header role="clinician" />
      <div className="forum-content">
        {/* <Sidebar /> */}
        <div className="forum-post-container">
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
          <Link to="/create-post" className="create-post-link">Create New Post</Link>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
