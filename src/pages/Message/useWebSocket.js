import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import environment from '../../environment';

const useWebSocket = (userId, token) => {
    const [messages, setMessages] = useState([]);
    const socket = new SockJS(`${environment.baseUrl}/ws`);
    const stompClient = Stomp.over(socket);

    useEffect(() => {
        if (userId && token) {
            stompClient.connect({ Authorization: `Bearer ${token}` }, () => {
                stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
                    const newMsg = JSON.parse(message.body);
                    setMessages(prevMessages => [...prevMessages, newMsg]);
                });
            });
        }

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [userId, token]);

    return messages;
};

export default useWebSocket;
