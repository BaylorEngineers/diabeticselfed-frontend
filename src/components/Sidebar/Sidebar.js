import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {SidebarData} from "./SidebarData";
import {SidebarAdminData} from "./SidebarAdminData";
import {SidebarDataClinician} from "./SidebarDataClinician";

import "../../App.css";
import {IconContext} from "react-icons";

function Sidebar({sidebarType}) {

    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);

    // Defining the sidebar data based on the user type
    const getSidebarData = () => {
        switch (sidebarType) {
            case 'sidebarAdmin':
                return SidebarAdminData;
            case 'sidebarClinician':
                return SidebarDataClinician;
            default:
                return SidebarData;
        }
    };

    const sidebarData = getSidebarData();

    return (
        <>
            <IconContext.Provider value={{color: "undefined"}}>
                <div className='sidebar'>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="sidebar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        {sidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar