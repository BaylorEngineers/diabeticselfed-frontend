import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IOIcons from "react-icons/io";

export const SidebarAdminData = [
  {
    title: "Home",
    path: "/",
    icons: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
      title: "Account Manager",
      path: "/accountmanager",
      icons: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  {
        title: "View Profile",
        path: "/adminprofile",
        icons: <AiIcons.AiFillHome />,
        cName: "nav-text",
      },
  {
          title: "Access Records",
          path: "/adminaccessrecords",
          icons: <AiIcons.AiFillHome />,
          cName: "nav-text",
        },
   {
           title: "Messages",
           path: "/",
           icons: <AiIcons.AiFillHome />,
           cName: "nav-text",
         },

]
