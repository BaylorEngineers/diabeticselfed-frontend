// ForumPost.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // make sure you have react-router-dom installed
import Header from "../../components/Header/Header";
import Post from "./Post"; // This is a component we will create to display each post
import "./ForumPost.css";


const ForumPost = () => {
  const [posts, setPosts] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchPosts = async () => {
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
      
        const data = await response.json();
        setPosts(data);
      };

    fetchPosts();
  }, []);

  return (
    <div className="forum-page">
      <Header role={role} />
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
