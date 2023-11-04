import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import { useSidebarAdminData } from '../Sidebar/SidebarAdminData';
import { SidebarDataClinician } from "../Sidebar/SidebarDataClinician";
import './Header.css';
import Dropdown from '../Dropdown/Dropdown';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Header({ role }) {
  const adminData = useSidebarAdminData();
  const clinicianData = SidebarDataClinician;
  const [newMessage, setNewMessage] = useState(false);
  const [sidebarData, setSidebarData] = useState([
    {
      title: "Home",
      path: "/",
      icons: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
    title: "Forum",
    path: "#",
    icons: <AiIcons.AiFillHome />,
    cName: "nav-text",
    subNav: [
      {
        title: "Forum",
        path: "/posts",
        cName: "nav-sub-item",
      },
      {
        title: "My Forum Posts",
        path: "/myposts",
        cName: "nav-sub-item",
      },
    ],
  },
    {
      title: "Message",
      path: "/message",
      icons: <AiIcons.AiOutlineMail />,
      cName: "nav-text",
    }
  ]);
  const userId = localStorage.getItem('userId'); 
  const jwtToken = localStorage.getItem('accessToken');

  useEffect(() => {
    let subscription;
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
      subscription = stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
        setNewMessage(true);
        updateMessageIcon(true);
      });
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      stompClient.disconnect();
    };
  }, [userId, jwtToken]);


  const renderLinks = (data) => {
    return data.map((item, index) => (
      <div className={`nav-item ${item.subNav ? 'nav-item-with-submenu' : ''}`} key={index}>
        <NavLink
          to={item.path}
          className="nav-link"
          onClick={() => {
            if (item.title === "Message" && newMessage) {
              setNewMessage(false);
              updateMessageIcon(false);
            }
          }}
        >
          {item.icons}
          <span className="nav-text">{item.title}</span>
          {item.subNav && <AiIcons.AiOutlineDown />}
        </NavLink>
        {item.subNav && (
          <div className="nav-sub-menu">
            {item.subNav.map((subItem, subIndex) => (
              <NavLink to={subItem.path} key={subIndex} className="nav-sub-item">
                <span className="nav-text">{subItem.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    ));
  };
  const MailIconWithDot = ({ hasNewMessage }) => {
    return (
      <div style={{ position: 'relative' }}>
        <AiIcons.AiOutlineMail />
        {hasNewMessage && (
          <span style={{
            position: 'absolute',
            top: '-0.25em',
            right: '-0.25em',
            height: '0.5em',
            width: '0.5em',
            borderRadius: '50%',
            backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '0.75em',
            color: 'white',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)',
          }}>
          </span>
        )}
      </div>
    );
  };
  
  const updateMessageIcon = (hasNewMessage) => {
    setSidebarData(data =>
      data.map(item => {
        if (item.title === "Message") {
          return {
            ...item,
            icons: <MailIconWithDot hasNewMessage={hasNewMessage} />
          };
        }
        return item;
      })
    );
  };
  return (
    <div className="Header">
      <div className="HeaderContent">
        <div className="HeaderLogo">
          <h1>DDDDDDDDDDD</h1>
        </div>
        <div className="HeaderLinks">
          {role === 'ADMIN' && renderLinks(adminData)}
          {role === 'CLINICIAN' && renderLinks(clinicianData)}
          {role === 'PATIENT' && renderLinks(sidebarData)}
        </div>
        <Dropdown className="userDropdown" text="User" />
      </div>
    </div>
  );
}

export default Header;
