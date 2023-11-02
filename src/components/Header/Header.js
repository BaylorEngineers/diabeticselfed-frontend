import React from 'react';
import { NavLink } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import {SidebarAdminData} from "../Sidebar/SidebarAdminData";
import {SidebarDataClinician} from "../Sidebar/SidebarDataClinician";

import {SidebarData} from "../Sidebar/SidebarData";
import './Header.css';
import Dropdown from '../Dropdown/Dropdown';

function Header({ role }) { // role prop to determine which links to display
  // Function to render link items based on the role
  const renderLinks = (data) => {
    return data.map((item, index) => {
      return (
        <NavLink to={item.path} key={index} className="nav-item">
          {item.icons}
          <span className="nav-text">{item.title}</span>
        </NavLink>
      );
    });
  };

  return (
    <div className="Header">
      <div className="HeaderContent">
        <div className="HeaderLogo">
          <h1>DDDDDDDDDDD</h1>
        </div>
        <div className="HeaderLinks">
          {/* Conditional rendering based on the role */}
          {role === 'admin' && renderLinks(SidebarAdminData)}
          {role === 'clinician' && renderLinks(SidebarDataClinician)}
          {role === 'patient' && renderLinks(SidebarData)}
        </div>
        <Dropdown className="userDropdown" text="User" />
      </div>
    </div>
  );
}

export default Header;
