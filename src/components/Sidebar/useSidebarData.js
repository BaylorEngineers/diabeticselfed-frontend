
import { useState, useEffect } from 'react';
import * as AiIcons from "react-icons/ai";
import { useContentAreas } from './useContentAreas'; 

export const useSidebarData = (role) => {
  const { contentAreas, fetchContentAreas } = useContentAreas();
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    fetchContentAreas();
  }, [fetchContentAreas]);

  useEffect(() => {
    let baseData = [
      {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
      },
      {
        title: "Learn",
        path: "#",
        icon: <AiIcons.AiFillBook />,
        cName: "nav-text",
        subNav: contentAreas.map(area => ({
          title: area.name,
          path: `/content-area/${area.id}`,
          cName: "nav-text"
        }))
      },
    ];

    if (['ADMIN', 'CLINICIAN', 'PATIENT'].includes(role)) {
      const forumData = {
        title: 'Forum',
        path: '/posts', 
        icon: <AiIcons.AiOutlineWechat />,
        cName: 'nav-text'
      };
  
      if (role === "PATIENT") {
        forumData.subNav = [
          {
            title: "My Posts",
            path: "/myposts", 
            icon: <AiIcons.AiOutlineUnorderedList />, 
            cName: "nav-sub-item"
          },
        ];
      }
  
      baseData.push(forumData);
  }
  
      if (['CLINICIAN', 'PATIENT'].includes(role)) {
        baseData.push({
          title: 'Messages',
          path: '/message',
          icon: <AiIcons.AiOutlineMail />,
          cName: 'nav-text',
        });
      }
  
      if (role === 'CLINICIAN') {
        baseData.push({
          title: 'Patient List',
          path: '/patient-list',
          icon: <AiIcons.AiOutlineUser />,
          cName: 'nav-text',
        });
      }
  
      if (role === 'ADMIN') {
        baseData.push({
          title: 'Account Manager',
          path: '/accountmanager',
          icon: <AiIcons.AiFillSetting />,
          cName: 'nav-text',
        });
        baseData.push({
          title: 'Access Records',
          path: '/adminaccessrecords',
          icon: <AiIcons.AiFillDatabase />,
          cName: 'nav-text',
        });
      }

    setSidebarData(baseData);
  }, [role, contentAreas]);

  const updateMessageIcon = (newIcon) => {
    setSidebarData(data =>
      data.map(item => {
        if (item.title === "Message") {
          return { ...item, icon: newIcon };
        }
        return item;
      })
    );
  };

  return { sidebarData, updateMessageIcon };
};

