import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./ForumPost.css";


const ForumPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (search = '') => {
    setLoading(true);
    setError('');

    const jwtToken = localStorage.getItem('accessToken');
    let url = 'https://seal-app-by4vt.ondigitalocean.app/api/v1/forum-posts/allposts';
    if (search) {
      url = `https://seal-app-by4vt.ondigitalocean.app/api/v1/forum-posts/search?searchValue=${search}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch posts. Please try again later.");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPosts(searchValue);
  };
  return (
    <div className="forum-page">
      <Header role={role} />
      <div className="forum-content">
      <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
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

