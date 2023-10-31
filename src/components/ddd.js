
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
    const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTY5ODcyMDg2NCwiZXhwIjoxNjk4ODA3MjY0fQ.bjyd8bFVye2MGWcmWAfP4WVa_wHwYTsH19Z_EblTC9k"
    useEffect(() => {
        console.log("USE EFFECT RAN")
        let subscription; // declare the variable here
        const socket = new SockJS('http://localhost:8080/ws');
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
        console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
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
        
    }, [userId]);
    
    
    const sendMessage = () => {
        const messageData = {
          senderId: userId,
          receiverId: receiverId,
          content: messageInput
        };
    
        fetch('http://localhost:8080/api/v1/messages/send', {
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
  
  
