import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ClinicianListModal from './ClinicianListModal';
import PatientListModal from './PatientListModal';


const MessageList = () => {
    const role = localStorage.getItem('role');
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [isClinicianListVisible, setClinicianListVisible] = useState(false);

    const userId =localStorage.getItem('userId');
    const jwtToken = localStorage.getItem('accessToken');
   
    const fetchMessages = async () => {
        console.log(jwtToken);
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
    }, [jwtToken]);
    const handleSendMessageToClinician = () => {
        fetchMessages(); // Refresh the message list
        setClinicianListVisible(false); // Close the modal
      };
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

            <button className="show-clinicians" onClick={() => setClinicianListVisible(true)}>
                {role === "CLINICIAN" ? "Send a Message to Patient" : "Send a Message to Clinician"}
            </button>

            {isClinicianListVisible && role === "PATIENT" && (
                <ClinicianListModal
                    onClose={() => setClinicianListVisible(false)}
                    jwtToken={jwtToken}
                    userId={userId}
                    onMessageSent={handleSendMessageToClinician}
                />
            )}

            {isClinicianListVisible && role === "CLINICIAN" && (
                <PatientListModal
                    onClose={() => setClinicianListVisible(false)}
                    jwtToken={jwtToken}
                    userId={userId}
                    onMessageSent={handleSendMessageToClinician}
                />
            )}
        </div>
    );
};

export default MessageList;