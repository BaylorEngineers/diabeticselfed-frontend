import { useState, useEffect } from 'react';
import * as AiIcons from "react-icons/ai";
import { useContentAreas } from './useContentAreas'; 

export const useSidebarAdminData = () => {

  const { contentAreas, fetchContentAreas } = useContentAreas();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchContentAreas(); 
  }, [fetchContentAreas]);

  useEffect(() => {
    const contentAreaMenuItems = contentAreas.map(area => ({
      title: area.name,
      // path: `http://localhost:8080/api/content-areas/${area.id}`,
      path: `/content-area/${area.id}`,
      icons: <AiIcons.AiFillBook />,
      cName: "nav-sub-text"
    }));

    const newMenuItems = [
      {
        title: "Home",
        path: "/",
        icons: <AiIcons.AiFillHome />,
        cName: "nav-text",
      },
      {
        title: "Forum",
        path: "/posts",
        icons: <AiIcons.AiFillHome/>,
        cName: "nav-text",
      },
      {
        title: "My Forum Posts",
        path: "/myposts",
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
        title: "Learn",
        path: "#",
        icons: <AiIcons.AiFillBook />,
        cName: "nav-text",
        subNav: contentAreaMenuItems,
      }
    ];

    setMenuItems(newMenuItems);
  }, [contentAreas]); 

  return menuItems;
};
