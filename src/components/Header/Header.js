import React from 'react';
import { NavLink } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import { useSidebarAdminData } from '../Sidebar/SidebarAdminData';
import { SidebarDataClinician } from "../Sidebar/SidebarDataClinician";
import { SidebarData } from "../Sidebar/SidebarData";
import './Header.css';
import Dropdown from '../Dropdown/Dropdown';

function Header({ role }) {
  const adminData = useSidebarAdminData();

  const renderLinks = (data) => {
    return data.map((item, index) => (
      <div className={`nav-item ${item.subNav ? 'nav-item-with-submenu' : ''}`} key={index}>
        <NavLink to={item.subNav ? '#' : item.path} className="nav-link">
          {item.icons}
          <span className="nav-text">{item.title}</span>
          {item.subNav && <AiIcons.AiOutlineDown />}
        </NavLink>
        {item.subNav && (
          <div className="nav-sub-menu">
            {item.subNav.map((subItem, subIndex) => (
              <NavLink to={subItem.path} key={subIndex} className="nav-sub-item">
                {subItem.icons}
                <span className="nav-text">{subItem.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="Header">
      <div className="HeaderContent">
        <div className="HeaderLogo">
          <h1>DDDDDDDDDDD</h1>
        </div>
        <div className="HeaderLinks">
          {role === 'ADMIN' && renderLinks(adminData)}
          {role === 'CLINICIAN' && renderLinks(SidebarDataClinician)}
          {role === 'PATIENT' && renderLinks(SidebarData)}
        </div>
        <Dropdown className="userDropdown" text="User" />
      </div>
    </div>
  );
}

export default Header;
