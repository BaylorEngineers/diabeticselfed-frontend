import React from 'react';
import Header from "../../components/Header/Header";
import MessageList from './MessageList';
import './Message.css';

function Message() {
  const role = localStorage.getItem('role');

  return (
    <div className="App">
        <Header role={role}/>
      <MessageList />
    </div>
  );
}

export default Message;



