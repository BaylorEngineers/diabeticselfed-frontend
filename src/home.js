import React from 'react';
import Header from "./components/Header/Header";
import './home.css';

const home = () => {
  return (
    <>
      <Header role="PATIENT"/>
        <div className="landingPage">
          <h1>Welcome to the landing Page</h1>
        </div>
    </>
  );
};

export default home;