// MessageBox.js
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const MessageBox = ({ receiverId, receiverName, senderName, onClose }) => {
    console.log(receiverId);
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId =  localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/messages/conversation?userId1=${userId}&userId2=${receiverId}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setConversation(data);
                } else {
                    // Handle HTTP errors
                    console.error('Failed to fetch conversation, HTTP status:', response.status);
                }
            } catch (error) {
                console.error('Failed to fetch conversation:', error);
            }
        };
        
        fetchConversation();
    }, [receiverId, token, newMessage]);

    useEffect(() => {
        // Setting up WebSocket connection
        let stompSubscription;
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);

        stomp.connect({ Authorization: `Bearer ${token}` }, () => {
            console.log("Setting up subscription");
            stompSubscription = stomp.subscribe(`/topic/messages/${userId}`, (message) => {
                console.log("Received a message via subscription");
                const newMsg = JSON.parse(message.body);
                console.log(newMsg);
                console.log(userId);
                console.log(newMsg.receiverId);
                if (parseInt(newMsg.receiverId, 10) === parseInt(userId, 10)) {
                    console.log("Set");
                    setConversation(prevMessages => [...prevMessages, newMsg]);
                }
            });
        });

        setStompClient(stomp);

        // Cleanup function
        return () => {
            if (stompSubscription) {
                stompSubscription.unsubscribe();
            }
            if (stomp && stomp.connected) {
                stomp.disconnect();
            }
        };
    }, [userId, token, conversation]); 

    const handleSendMessage = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/messages/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    senderId: userId,
                    receiverId,
                    content: newMessage
                })
            });

            if (response.ok) {
                setNewMessage('');
                setConversation([...conversation, {
                    senderId: userId,
                    receiverId,
                    content: newMessage,
                    time: new Date().toISOString() 
                }]);
            } else {
                console.error('Failed to send message, HTTP status:', response.status);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="message-box">
            <div className="message-box-header">
                <button onClick={onClose}>Close</button>
            </div>
            <div className="messages">
                {conversation.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === parseInt(userId) ? 'sent' : 'received'}`}>
                        <div className="message-info">
                            <strong>{ msg.senderName}</strong>
                            <span>{new Date(msg.time).toLocaleString()}</span>
                        </div>
                        <p1>{msg.content}</p1>
                    </div>
                ))}
            </div>
            <div className="send-message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default MessageBox;
