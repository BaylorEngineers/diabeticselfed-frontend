import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';
import '../../App.css';
import { Link } from 'react-router-dom';
import * as mdIcon from "react-icons/md";
import * as BiIcon from "react-icons/bi";
import * as AiIcon from "react-icons/ai";

function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const DropdownRef = useRef();

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

  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  const profileLink = role === 'PATIENT'
    ? '/patientprofile'
    : role === 'ADMIN'
    ? '/adminprofile'
    : '/clinicianprofile';

  return (
    <div className="menu-container" ref={DropdownRef}>
      <div className="menu-trigger" onClick={() => setOpen(!open)} title="Account Settings">
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
