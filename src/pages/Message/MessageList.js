// MessageList.js
import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const userId =4;// localStorage.getItem('userId');
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaWFvdGluZ3NodW9AZ21haWwuY29tIiwiaWF0IjoxNjk4OTUzMzcwLCJleHAiOjE2OTkwMzk3NzB9.4SYbJ5eKw2PUDXCa1ZPTaGc0x3i2xWiyn0ijX5tFRQE"//localStorage.getItem('jwtToken');
   
    useEffect(() => {

        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/messages/last-messages/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };
        
        fetchMessages();
    }, []);

    return (
        <div className="message-list">
            {messages.map((message) => (
                <div key={message.receiverId} className="message-preview" onClick={() => setSelectedConversation(message.receiverId)}>
                    <div className="message-sender">{message.receiverFirstName} {message.receiverLastName}</div>
                    <div className="message-content">{message.content}</div>
                    <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
                </div>
            ))}

            {selectedConversation && (
                <MessageBox
                    receiverId={selectedConversation}
                    onClose={() => setSelectedConversation(null)}
                />
            )}
        </div>
    );
};

export default MessageList;