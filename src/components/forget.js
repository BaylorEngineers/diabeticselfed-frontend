import React, { useState, useEffect} from "react";
import backgroundImage from '../images/Background.jpg';
import logo from '../images/Bear_Mark_1_Color_01.jpg';
import {Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';


function Login() {
    const [errorMessages, error_login] = useState({});
    const [islogin, login_set_true] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [id, setID] = useState();

  
    const errors = {
      username: "This user Id does not exit or invalid password",
     
    };
  
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
           
          if (response.status == 200) {
            console.log('go'); 
            window.location.href =  "/resetpassword";
            
          } else if (response.status == 400) {
            error_login({ name: "ID", message: "Email does not exist"});
            //throw new Error('Something went wrong ...');
  
          }else{
            error_login({ name: "ID", message: "Send email fail"});
  
          }
            
          });
        
        
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
        <form onSubmit={login_handle}>
          <div className="input-container">
            <label>Your email address</label>
            <input type="text" name="username" id="username" required onChange={e => setUserName(e.target.value)}/>
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
                      width={60}
                      height={50}
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
  
 // const rootElement = document.getElementById("root");
  //ReactDOM.render(<App />, rootElement);
  export default Login;