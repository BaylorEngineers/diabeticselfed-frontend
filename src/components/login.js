import React, { useState, useEffect} from "react";
import backgroundImage from '../images/Background.jpg';
import logo from '../images/Bear_Mark_1_Color_01.jpg';
import {Link} from 'react-router-dom';

// import Popup from '../pages/SurveyPopUp';

// import CustomModal from '../pages/SurveyModal'


function Login() {
    const [errorMessages, error_login] = useState('');
    const [islogin, login_set_true] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [userId, setUserID] = useState();
    const [patientID, setPatientID] = useState();
    const [accessToken, setAccessToken] = useState();
  
    const errors = {
      username: "This user Id does not exit or invalid password",
     
    };
    const [err, setErr] = useState('');

    useEffect(() => {
      console.log("IN")
    }, [password]);

    const test = async (event) => {
          event.preventDefault();
          console.log(username);
          console.log(password);

          try {
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
              mode: 'cors',
              method: 'POST',
              body: JSON.stringify({
                email: username,
                password: password,
              }),
              headers: {
                'Content-type': 'application/json',
              },
            });

            if (!response.ok) {
              const errorMessage = await response.text();
              throw new Error(` ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response Data:', responseData);
            setRole(responseData.role);

            const userID = responseData.userID;
            console.log('UserID:', userID);
            setUserID(userID);
            localStorage.setItem('userId', userID);

            const patientID = responseData.patientID;
            console.log('patientID:', patientID);
            setPatientID(patientID);
            localStorage.setItem('patientId', patientID);


            const access_token = responseData.access_token;
            console.log('access_token:', access_token);
            setAccessToken(access_token);
            localStorage.setItem('accessToken', access_token);

            login_set_true(true);
          } catch (error) {
            console.error('Error:', error);
            error_login({ name: 'ID', message: error.message + ": Wrong email or password" });
          }
        };

    
        // const [isModalOpen, setIsModalOpen] = useState(false);
        // const[firstLoginOfTheDay, setFirstLoginOfTheDay] = useState(false);

        // const openModal = () => {
        //   setIsModalOpen(true);
        //   setFirstLoginOfTheDay(true);
        // };

        // const closeModal = () => {
        //   setIsModalOpen(false);
        // };

        // const handleModalSubmit = (modalInput) => {
        //   console.log(modalInput);
        // }



    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );
  
      var sectionStyle = {
        width: "100%",
        height: "400px",
        backgroundImage: backgroundImage
      };

    const renderForm = (
        <div className="form">
            <form onSubmit={test}>
          <div className="input-container">
            <label>User Id </label>
            <input type="text" name="username" id="username" required onChange={e => setUserName(e.target.value)}/>
            {renderErrorMessage("username")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="Password" required onChange={e => setPassword(e.target.value)}/>
            {renderErrorMessage("Password")}{renderErrorMessage("ID")}
          </div>
          <div className="button-container">
            <input type="submit" value="Login"/>
          </div>
          <div className="forgotandreg">
          <div className="regis">
                <a href={"/registration"}>
                  <l className="regisText"  n/>Sign up
                </a>
                </div>

                <div className="forgotP">
                <a href={"/forgotpassword"}>
                  <l className="regisText"  n/>Forget Password?
                </a>
                </div>
            </div>

        </form>
      </div>
    );
  

    return (
<div style={{
        backgroundImage: `url(${backgroundImage})` ,
        height:'100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="app">


      {/* <button onClick={openModal}>Show Modal</button>

      {firstLoginOfTheDay && <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleModalSubmit}
      />} */}


        <div className="login_frame">
          <div className="title">Log In</div>
          <Link to="/">
                    <img
                    className="logo"
                      src={logo}
                      alt="brand-logo"
                      width={100}
                      height={25}
                    />
            </Link>
          {(() => {
                        if (islogin) {
//                            window.location.href = "/"+role;
                        } else {
          return (
            renderForm
          )
        }
      })()}   
        </div>
        </div>
      </div>
    );
  }
  
  export default Login;