// App.js
import React from 'react';
import Header from "../../components/Header/Header";
import MessageList from './MessageList';
import './Message.css';

function Message() {
  return (
    <div className="App">
        <Header role="PATIENT"/>
      <MessageList />
    </div>
  );
}

export default Message;



