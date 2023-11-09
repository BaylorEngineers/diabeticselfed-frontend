import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./PostDetail.css";

const CommentForm = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    const token =  localStorage.getItem('accessToken');
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!content.trim()) return;
  
      try {
        const response = await fetch(`http://localhost:8080/api/v1/forum-posts/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ postId, userId: 4, content }),
        });
  
        if (response.ok) {
          onCommentAdded(); // This will refresh the comments
          setContent(''); // Reset the form
        } else {
          alert('The comment was not created successfully.');
        }
      } catch (error) {
        console.error('Failed to post comment', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment here..."
          required
        />
        <button id="postcomment" type="submit">Post Comment</button>
      </form>
    );
  };

  const Comment = ({ comment, onCommentDeleted, onCommentAdded  }) => {
    console.log(comment);
    const token =  localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');//4; //JSON.parse(localStorage.getItem('user')).id; // Get the user ID from local storage
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const handleDelete = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/forum-posts/comments/${comment.id}/user/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          onCommentDeleted(); // Refresh comments after deletion
        } else {
          alert('Failed to delete the comment.');
        }
      } catch (error) {
        console.error('Failed to delete comment', error);
      }
    };
    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!replyContent.trim()) return;
    
        try {
            const response = await fetch(`http://localhost:8080/api/v1/forum-posts/comments/${comment.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId, content: replyContent }),
            });
    
            if (response.ok) {
                onCommentAdded(); // Refresh comments after posting reply
            } else {
                alert('The reply was not posted successfully.');
            }
        } catch (error) {
            console.error('Failed to post reply', error);
        } finally {
            // Close the reply form regardless of the result
            setReplyContent('');
            setShowReplyForm(false);
        }
    };
    return (
        <div className="comment">
            <div className="comment-meta">
                <span className="commenter-name">
                    {comment.commenterFirstName} {comment.commenterLastName}
                </span>
                <span className="comment-date">
                    {new Date(comment.commentDate).toLocaleString()}
                </span>
            </div>
            <div className="comment-content">
                {comment.content}
            </div>
            <div className="comment-actions">
                <button onClick={toggleReplyForm} className="reply-button">
                    Reply
                </button>
                {parseInt(userId, 10) === comment.userId && (
                    <button onClick={handleDelete} className="delete-comment">
                        Delete
                    </button>
                )}
            </div>
            {showReplyForm && (
                <form onSubmit={handleReply} className="reply-form">
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply here..."
                        required
                    />
                    <button type="submit" className="submit-reply">
                        Post Reply
                    </button>
                </form>
            )}
            {/* Recursive rendering of child comments if they exist */}
            {comment.childComments && comment.childComments.length > 0 && (
                <div className="child-comments">
                    {comment.childComments.map(childComment => (
                        <Comment key={childComment.id} comment={childComment} onCommentDeleted={onCommentDeleted} onCommentAdded={onCommentAdded} />
                    ))}
                </div>
            )}
        </div>
    );
};

  const PostDetail = () => {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const role = localStorage.getItem('role');
    const token =  localStorage.getItem('accessToken');
  
    const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/forum-posts/${postId}`, {
            headers: {
              'Authorization': `Bearer ${token}` // Add the Authorization header with the token
            }
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('Post data received:', data); // For debugging
          setPost(data);
        } catch (error) {
          console.error('Failed to fetch post', error);
        }
      };
  
    useEffect(() => {
      fetchPost();
    }, [postId, fetchPost]); // Add fetchPost to the dependency array
  
    const refreshComments = () => {
      fetchPost();
    };
  
    if (!post) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container">
        <Header role={role} />
        <div className="main-content">
          <div className="post-content">
            <div className="post-header">
              <h1 className="post-title">{post.title}</h1>
              <div className="post-owner">
                Posted by {post.ownerFirstName} {post.ownerLastName} on {new Date(post.postDate).toLocaleString()}
              </div>
            </div>
            <div className="post-body">
              <p>{post.content}</p>
            </div>
            <div className="comments-section">
            <h3>Comments</h3>
            <CommentForm postId={post.id} onCommentAdded={refreshComments} />
            {post.comments && post.comments.length > 0 ? (
                post.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} onCommentDeleted={refreshComments} />
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
          </div>
        </div>
      </div>
    );
  };

export default PostDetail;
