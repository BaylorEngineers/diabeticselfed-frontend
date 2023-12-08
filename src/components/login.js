import React, { useState, useEffect} from "react";
import backgroundImage from '../images/Background.jpg';
import logo from '../images/Bear_Mark_1_Color_01.jpg';
import {Link} from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
    const [errorMessages, error_login] = useState('');
    const [islogin, login_set_true] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [userId, setUserID] = useState();
    const [patientID, setPatientID] = useState();
    const [accessToken, setAccessToken] = useState();
    const[isFirstLogInToday, setIsFirstLogInToday] = useState();
    const navigate = useNavigate();
    const { state } = useLocation();
    
  
    const errors = {
      username: "This user Id does not exit or invalid password",
     
    };

    useEffect(() => {
      console.log("IN")
    }, [password]);

    const test = async (event) => {
          event.preventDefault();

          try {
            const response = await fetch('https://seal-app-by4vt.ondigitalocean.app/api/v1/auth/authenticate', {
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
            } else {
              if(true){
                setIsFirstLogInToday(true);
              }
              
              if(isFirstLogInToday) {
                navigate("/survey");
              }
              
            }

            const responseData = await response.json();
            setRole(responseData.role);

            const userID = responseData.userID;
            setUserID(userID);
            localStorage.setItem('userId', userID);

            const patientID = responseData.patientID;

            setPatientID(patientID);
            localStorage.setItem('patientId', patientID);

            setUserID(patientID);
            localStorage.setItem('patientID', patientID);

            const access_token = responseData.access_token;
            setAccessToken(access_token);
            localStorage.setItem('accessToken', access_token);

            const role = responseData.role;
            setRole('role', role);
            localStorage.setItem('role', role);

            login_set_true(true);
          } catch (error) {
            error_login({ name: 'ID', message: error.message + ": Wrong email or password" });
          }
        };


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
          <div className="forgotandreg" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="forgotP" >
                <a href={"/forgotpassword"}>
                  <l className="regisText"/>Forgot Password?
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
                            window.location.href = "/";
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