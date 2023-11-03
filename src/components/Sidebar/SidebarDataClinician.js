import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IOIcons from "react-icons/io";

export const SidebarDataClinician = [
    {
        title: "Home",
        path: "/",
        icons: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    {
        title: "View Patient",
        path: "/patientlist",
        icons: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    {
        title: "View Profile",
        path: "/clinicianprofile",
        icons: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    {
        title: "Message",
        path: "/message",
        icons: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },

    {
        title: "Forums",
        path: "/posts",
        icons: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
]
