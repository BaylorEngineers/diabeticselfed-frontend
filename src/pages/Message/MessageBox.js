import React, { useState, useEffect } from 'react';
import useWebSocket from './useWebSocket'; 
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const MessageBox = ({ receiverId, receiverName, senderName, onClose }) => {
    console.log(receiverId);
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId =  localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const [stompClient, setStompClient] = useState(null);
    const messages = useWebSocket(userId, token);
    const [lastMessageId, setLastMessageId] = useState(null);


    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await fetch(`https://seal-app-by4vt.ondigitalocean.app/api/v1/messages/conversation?userId1=${userId}&userId2=${receiverId}`, {
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
        const latestMessageTime = conversation.length > 0 ? new Date(conversation[conversation.length - 1].time) : null;

        const newMessages = messages.filter(msg => {
            return (parseInt(msg.senderId, 10) === parseInt(receiverId, 10) ||
                    parseInt(msg.receiverId, 10) === parseInt(receiverId, 10)) &&
                   (!latestMessageTime || new Date(msg.time) > latestMessageTime);
        });

        if (newMessages.length > 0) {
            setConversation(currentConversation => [...currentConversation, ...newMessages]);
        }
    }, [messages, receiverId]);

    const handleSendMessage = async () => {
        try {
            const response = await fetch('https://seal-app-by4vt.ondigitalocean.app/api/v1/messages/send', {
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
