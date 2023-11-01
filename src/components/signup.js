import React, { useState } from "react";
import backgroundImage from '../images/Background.jpg';
import logo from '../images/Bear_Mark_1_Color_01.jpg';
import { Link, useLocation } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      repassword: '',
      firstname: '',
      lastname: '',
      DOB: '',
      LevelofEdu: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();

    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const token = new URLSearchParams(location.search).get("token");

    const handleSignUp = async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/register', {
          method: 'POST',
          body: JSON.stringify({ ...formData, token }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });

        if (response.status === 200) {
          window.location.href = "/";
        } else {
          const errorData = await response.json();
          setErrorMessage(`Error (${response.status}): ${errorData.message || 'Registration failed'}`);
        }
      } catch (error) {
        setErrorMessage("Network error: Could not contact server");
      }
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
                    name="DOB"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="levelOfEdu">Level of Education</label>
                  <select
                    id="levelOfEdu"
                    name="LevelofEdu"
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

                {errorMessage && <div className="error">{errorMessage}</div>}

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
