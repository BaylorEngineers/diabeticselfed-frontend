// useWebSocket.js
import { useEffect, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const useWebSocket = (userId, token) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);

    const connectWebSocket = useCallback(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);

        stomp.connect({ Authorization: `Bearer ${token}` }, () => {
            stomp.subscribe(`/topic/messages/${userId}`, (message) => {
                const newMsg = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, newMsg]);
            });
        });

        setStompClient(stomp);
    }, [userId, token]);

    useEffect(() => {
        if (userId && token) {
            connectWebSocket();
        }

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [userId, token, connectWebSocket]);

    return messages;
};

export default useWebSocket;
