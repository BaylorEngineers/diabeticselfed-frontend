import React from 'react';
import Header from "./components/Header/Header";
import './home.css';

const home = () => {

  const role = localStorage.getItem('role');

  return (
    <>
      <Header role={role}/>
        <div className="landingPage">
          <h1>Welcome to the landing Page</h1>
        </div>
    </>
  );
};

export default home;