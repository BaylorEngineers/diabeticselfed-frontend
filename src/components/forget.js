import React, { useState} from "react";
import backgroundImage from '../images/Background.jpg';
import logo from '../images/Bear_Mark_1_Color_01.jpg';
import {Link} from 'react-router-dom';


function Login() {
    const [errorMessages, error_login] = useState({});
    const [username, setUserName] = useState();

    const login_handle = (event) => {
      event.preventDefault();
  
        fetch('http://137.184.37.205:8080/resetPasswordSendOtp', {
        method: 'POST',
        body: JSON.stringify({
          username : username,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => {
           
          if (response.status === 200) {
            console.log('go'); 
            window.location.href =  "/resetpassword";
            
          } else if (response.status === 400) {
            error_login({ name: "ID", message: "Email does not exist"});
  
          }else{
            error_login({ name: "ID", message: "Send email fail"});
  
          }
            
          });
        
        
    };
  
  
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );
  

    const renderForm = (
      <div className="form">
        <form onSubmit={login_handle}>
          <div className="forget-input-container">
            <label id="add">Your email address</label>
            <input type="text" name="username" id="username-forget" required onChange={e => setUserName(e.target.value)}/>
            {renderErrorMessage("ID")}
          </div>

          <div className="button-container">
            <input type="submit" value="Send Email"/>
          </div>
          <div className="forgotandreg">
          <div className="regis">
                <a href={"/"}>
                  <l className="regisText"  n/>Back to Login
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
        <div className="login_frame">
          <div className="title">Forgot Password</div>
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

          return (
            renderForm
          )
        
      })()}   
        </div>
        </div>
      </div>
    );
  }
  
  export default Login;