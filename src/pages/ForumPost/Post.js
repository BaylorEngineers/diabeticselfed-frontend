// Post.js
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/posts/${post.id}`}>Read More</Link>
    </div>
  );
};

export default Post;
