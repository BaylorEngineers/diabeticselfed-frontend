// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import * as AiIcons from "react-icons/ai";
// import { useSidebarData } from '../Sidebar/useSidebarData'; // Make sure the path is correct
// import './Header.css';
// import Dropdown from '../Dropdown/Dropdown';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// function Header({ role }) {
//   const sidebarData = useSidebarData(role);
//   const [newMessage, setNewMessage] = useState(false);
//   const userId = localStorage.getItem('userId');
//   const jwtToken = localStorage.getItem('accessToken');

//   useEffect(() => {
//     let subscription;
//     const socket = new SockJS('http://localhost:8080/ws');
//     const stompClient = Stomp.over(socket);

//     stompClient.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
//       subscription = stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
//         setNewMessage(true);
//       });
//     });

//     return () => {
//       if (subscription) {
//         subscription.unsubscribe();
//       }
//       stompClient.disconnect();
//     };
//   }, [userId, jwtToken]);

//   const renderLinks = (data) => {
//     return data.map((item, index) => (
//       <div className={`nav-item ${item.subNav ? 'nav-item-with-submenu' : ''}`} key={index}>
//         <NavLink
//           to={item.path}
//           className="nav-link"
//           onClick={() => {
//             if (item.title === "Message" && newMessage) {
//               setNewMessage(false);
//             }
//           }}
//         >
//           {item.icon}
//           <span className="nav-text">{item.title}</span>
//           {item.subNav && <AiIcons.AiOutlineDown />}
//         </NavLink>
//         {item.subNav && (
//           <div className="nav-sub-menu">
//             {item.subNav.map((subItem, subIndex) => (
//               <NavLink to={subItem.path} key={subIndex} className="nav-sub-item">
//                 <span className="nav-text">{subItem.title}</span>
//               </NavLink>
//             ))}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   const MailIconWithDot = () => {
//     return (
//       <div style={{ position: 'relative' }}>
//         <AiIcons.AiOutlineMail />
//         {newMessage && (
//           <span style={{
//             position: 'absolute',
//             top: '-0.25em',
//             right: '-0.25em',
//             height: '0.5em',
//             width: '0.5em',
//             borderRadius: '50%',
//             backgroundColor: 'red',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             fontSize: '0.75em',
//             color: 'white',
//             boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)',
//           }} />
//         )}
//       </div>
//     );
//   };

//   // useEffect(() => {
//   //   // Dynamically update the message icon when a new message is received
//   //   setSidebarData(data =>
//   //     data.map(item => {
//   //       if (item.title === "Message") {
//   //         return {
//   //           ...item,
//   //           icon: <MailIconWithDot />
//   //         };
//   //       }
//   //       return item;
//   //     })
//   //   );
//   // }, [newMessage]);

//   return (
//     <div className="Header">
//       <div className="HeaderContent">
//         <div className="HeaderLogo">
//           <h1>Your Logo Here</h1>
//         </div>
//         <div className="HeaderLinks">
//           {renderLinks(sidebarData)}
//         </div>
//         <Dropdown className="userDropdown" text="User" />
//       </div>
//     </div>
//   );
// }

// export default Header;



import React, { useState, useEffect } from 'react';
import * as AiIcons from "react-icons/ai";
import { useSidebarData } from '../Sidebar/useSidebarData'; // Adjust the path as needed
import './Header.css'; // Make sure this path is correct
import Dropdown from '../Dropdown/Dropdown'; // Adjust the path as needed
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { NavLink, Link } from 'react-router-dom'; // Import Link from react-router-dom


function Header({ role }) {
  const [newMessageReceived , setNewMessageReceived] = useState(false);
  const { sidebarData, updateMessageIcon } = useSidebarData(role);
  const [newMessage, setNewMessage] = useState(false);
  const userId = localStorage.getItem('userId');
  const jwtToken = localStorage.getItem('accessToken');
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
      stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
        if(parseInt( JSON.parse(message.body).receiverId, 10) === parseInt(userId, 10))
        setNewMessageReceived(true); // Set to true when a new message is received
      });
    });

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [userId, jwtToken]);

  useEffect(() => {
    let timer;
    if (newMessageReceived) {
      setShowNotification(true);
      updateMessageIcon(<AiIcons.AiOutlineMail style={{ color: 'red' }} />);

      timer = setTimeout(() => {
        setShowNotification(false);
        setNewMessageReceived(false); // Reset after showing the notification
      }, 5000); // Notification disappears after 5 seconds
    }

    return () => clearTimeout(timer);
  }, [newMessageReceived]);

  // useEffect(() => {
  //   let timer;
  //   if (newMessage) {
  //     setShowNotification(true);

  //     // Reset newMessage state after showing the notification
  //     setNewMessage(false);

  //     timer = setTimeout(() => {
  //       setShowNotification(false);
  //     }, 5000); // Notification disappears after 5 seconds

  //     return () => clearTimeout(timer);
  //   }
  // }, [newMessage]);

  useEffect(() => {
    if (newMessage) {
      updateMessageIcon(<AiIcons.AiOutlineMail style={{ color: 'red' }} />);
      setNewMessage(false); // Reset new message state immediately after updating the icon
    }
  }, [newMessage, updateMessageIcon]);

  // Function to render links and submenus
  const renderLinks = (data) => {
    return data.map((item, index) => {
      return (
        <div className={`nav-item ${item.subNav ? 'nav-item-with-submenu' : ''}`} key={index}>
          <NavLink to={item.path} className="nav-link">
            {item.icon}
            <span className="nav-text">{item.title}</span>
            {item.subNav && <AiIcons.AiOutlineDown />}
          </NavLink>
          {item.subNav && (
            <div className="nav-sub-menu">
              {item.subNav.map((subItem, subIndex) => (
                <NavLink to={subItem.path} key={subIndex} className="nav-sub-item">
                  {subItem.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    if (newMessage) {
      updateMessageIcon(<AiIcons.AiOutlineMail style={{ color: 'red' }} />);
    }
  }, [newMessage, updateMessageIcon]);

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>DiabeticSelfEd</h1>
          </Link>
        </div>
        <div className="header-links">
          {renderLinks(sidebarData)}
        </div>
        <Dropdown className="user-dropdown" text="User" />
      </div>

      {showNotification && (
        <div className="notification-popup">
          You received a new message!
        </div>
      )}
    </div>
  );
}

export default Header;
