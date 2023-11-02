// MessageList.js
import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const userId =4;// localStorage.getItem('userId');
    const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaWFvdGluZ3NodW9AZ21haWwuY29tIiwiaWF0IjoxNjk4OTU4MjkyLCJleHAiOjE2OTkwNDQ2OTJ9.RL4jfq_4GCpxWxPB3GM8PrDYL8IXFLJnUHz9xz51-I4"//localStorage.getItem('jwtToken');
   
    // Function to fetch messages
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/messages/last-messages/${userId}`, {
                headers: { 'Authorization': `Bearer ${jwtToken}` },
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    useEffect(() => {
        // Fetch initial messages
        fetchMessages();

        // Setup WebSocket connection
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);

        stomp.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
            console.log("Setting up subscription");
            const newSubscription = stomp.subscribe(`/topic/messages/${userId}`, () => {
                console.log("Received a message via subscription");
                // Refetch messages when a new message is received
                fetchMessages();
            });
            setSubscription(newSubscription);
            setStompClient(stomp);
        });

        // Cleanup function
        return () => {
            console.log("Unsubscribing and disconnecting...");
            if (subscription) {
                subscription.unsubscribe();
            }
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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