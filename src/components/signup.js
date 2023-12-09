import React, { useState } from "react";
import backgroundImage from '../images/Background.jpg';
import logo from '../images/Bear_Mark_1_Color_01.jpg';
import { Link, useLocation } from 'react-router-dom';
import environment from '../environment';

function SignUp() {
  
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      repassword: '',
      firstname: '',
      lastname: '',
      dob: '',
      levelofedu: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();

    const calculateAge = (dob) => {
      const birthday = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthday.getFullYear();
      const m = today.getMonth() - birthday.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
          age--;
      }
      return age;
  };

    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const token = new URLSearchParams(location.search).get("token");

    const handleSignUp = async (event) => {
      event.preventDefault();
      console.log(formData);
      console.log(token);
      const passwordConstraints = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const age = calculateAge(formData.dob);
      if (age < 18) {
          setErrorMessage("You must be at least 18 years old to register.");
          return;
      }
      else if (!passwordConstraints.test(formData.password)) {
        setErrorMessage("Password must be at least 8 characters long and include \n at least one uppercase letter, one lowercase letter, one number, and one special character.");
              return; 
      }
      else if (formData.password !== formData.repassword) {
        setErrorMessage("Passwords do not match.");
        return; 
      }else{
      try {
        setErrorMessage("");
        const response = await fetch(`${environment.baseUrl}/api/v1/auth/register`, {
          method: 'POST',
          body: JSON.stringify({ ...formData, token }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });

        if (response.status === 200) {
          window.location.href = `/signUp/weight-height?token=${token}`;
        } else {
          const errorData = await response.json();
          console.log(formData);
          setErrorMessage(`Error (${response.status}): ${errorData.message || 'Registration failed'}`);
        }
      } catch (error) {
        setErrorMessage("Network error: Could not contact server");
      }}
    };

    return (
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="app">
          <div className="login_frame">
            <div className="title">Sign Up</div>
            <Link to="/">
              <img
                className="logo"
                src={logo}
                alt="brand-logo"
                width={100}
                height={25}
              />
            </Link>
            <form onSubmit={handleSignUp}>
                {/* Form Fields */}
                <div className="input-container">
                  <label htmlFor="email">Email </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="password">Password </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="repassword">Re-enter Password </label>
                  <input
                    type="password"
                    id="repassword"
                    name="repassword"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="firstname">First Name </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="lastname">Last Name </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="levelOfedu">Level of Education</label>
                  <select
                    id="levelOfedu"
                    name="levelofedu"
                    required
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="HIGHSCHOOL">High School</option>
                    <option value="UNDERGRADUATE">Undergraduate</option>
                    <option value="GRADUATE">Graduate</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                {errorMessage && (
                  <div className="error">
                    {errorMessage.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                )}
                <div className="button-container">
                  <input type="submit" value="Sign Up" />
                </div>
              </form>

          </div>
        </div>
      </div>
    );
}

export default SignUp;
