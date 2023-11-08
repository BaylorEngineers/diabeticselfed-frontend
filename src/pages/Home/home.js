import React from 'react';
import Header from "../../components/Header/Header";
import familyImage1 from '../../images/1.webp';
import bg from '../../images/bg.jpeg';
import careImage from '../../images/care.jpeg';
import './home.css';

const home = () => {

  const role = localStorage.getItem('role');

  return (
      <>
        <Header role={role} />
        <div className="landingPage" >
          <h1 className="main-heading">Welcome to  Diabetic Self Ed </h1>
            <h2 className="sub-heading">Your Guide to Preventing Type 2 Diabetes and Embracing Self Care</h2>
          <p>Your journey to a healthier lifestyle begins here!</p>
          <div className="image-container">
                    <img
                      src={familyImage1} // Update with the correct path
                      alt="Healthy Lifestyle 1"
                    />
                    <p>Explore our features and start taking care of yourself today.</p>
                    <img
                      src={careImage} // Update with the correct path
                      alt="Healthy Lifestyle 2"
                    />
                  </div>
        </div>
      </>
    );
  };

export default home;