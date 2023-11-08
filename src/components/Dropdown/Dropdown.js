import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { Link } from 'react-router-dom';
import * as mdIcon from "react-icons/md";
import * as BiIcon from "react-icons/bi";
import * as AiIcon from "react-icons/ai";

function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const DropdownRef = useRef();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // This will clear the entire localStorage
    navigate('/'); // Redirect to the home page
  };
  useEffect(() => {
    const handler = (e) => {
      if (!DropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const [userData, setUserData] = useState({ firstName: '', lastName: '', role: '' });
  const accessToken = localStorage.getItem('accessToken');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/users/get-user-data?id=${userId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Failed to fetch user data, HTTP status:', response.status);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, [accessToken, userId]);

  const role = localStorage.getItem('role');

  

  const profileLink = role === 'PATIENT'
    ? '/patientprofile'
    : role === 'ADMIN'
    ? '/adminprofile'
    : '/clinicianprofile';

  return (
    <div className="menu-container" ref={DropdownRef}>
      <div className="menu-trigger" onClick={() => setOpen(!open)} title="Account Settings">
        <span className="user-greeting">Hi, {userData.firstName}!</span>
        <span className="user-role">{userData.role}</span> {/* Add this line */}
        <mdIcon.MdAccountCircle className="account-icon" />
        <mdIcon.MdArrowDropDown className="dropdown-icon"/>
      </div>

      {accessToken ? (
        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <ul>
            <DropdownItem img={AiIcon.AiOutlineUser} text={"My Profile"} link={profileLink} />
            <DropdownItem img={BiIcon.BiLogOut} text={"Log Out"} link={"/logout"} />
          </ul>
        </div>
      ) : (
        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <ul>
            <DropdownItem img={BiIcon.BiLogIn} text={"Log In"} link={"/login"} />
          </ul>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ img: Icon, text, link }) {
  return (
    <li className="dropdownItem">
      <Icon />
      <Link to={link}>{text}</Link>
    </li>
  );
}

export default Dropdown;
