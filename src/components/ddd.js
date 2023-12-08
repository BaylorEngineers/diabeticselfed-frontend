import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Test() {
    console.log("Test Component Rendered");
    const [messages, setMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [userId, setUserId] = useState("3");
    const [receiverId, setReceiverId] = useState("2");
    const [stompClient, setStompClient] = useState(null);
    const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY5OTA1MTg0NCwiZXhwIjoxNjk5MTM4MjQ0fQ.x_6pjym3sSfOvHrf85hjavt6JtKXwb1XcjFFy8SERP0"
    useEffect(() => {
        let subscription; // declare the variable here
        const socket = new SockJS('https://seal-app-by4vt.ondigitalocean.app/ws');
        const stomp = Stomp.over(socket);
    
        stomp.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
            console.log("Setting up subscription");
            subscription = stomp.subscribe(`/topic/messages/${receiverId}`, (message) => {
                console.log("Received a message via subscription");
                setReceivedMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
            });
            console.log(receivedMessages);
            
            setStompClient(stomp);
        });
        return () => {
            console.log("Unsubscribing and disconnecting...");
            if (subscription) {
                subscription.unsubscribe();
            }
            if (stompClient) {
                stompClient.disconnect();
            }
        };
        
    }, [userId]);
    
    
    const sendMessage = () => {
        const messageData = {
          senderId: userId,
          receiverId: receiverId,
          content: messageInput
        };
    
        fetch('https://seal-app-by4vt.ondigitalocean.app/api/v1/messages/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
          setMessages(prevMessages => [...prevMessages, data]);
          setMessageInput("");
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
      };
   
    return (
      <div className="App">
        <div>
          <h4>Sent Messages</h4>
          {messages.map((message, index) => (
            <div key={index}>{message.content}</div>
          ))}
        </div>
        <div>
          <h4>Received Messages</h4>
          {receivedMessages.map((message, index) => (
            <div key={index}>{message.content}</div>
          ))}
        </div>
        <div>
          <input 
            value={messageInput} 
            onChange={(e) => setMessageInput(e.target.value)} 
            placeholder="Type your message..." 
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    );
  }
  
  export default Test;
  
  
