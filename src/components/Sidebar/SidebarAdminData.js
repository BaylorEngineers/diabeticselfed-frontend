// import { useState, useEffect } from 'react';
// import * as AiIcons from "react-icons/ai";
// import { useContentAreas } from './useContentAreas'; // Assuming this is correctly implemented

// export const useSidebarAdminData = () => {

//   const { contentAreas, fetchContentAreas } = useContentAreas();

//   useEffect(() => {
//     fetchContentAreas(); 
//   }, [fetchContentAreas]); 

//   const contentAreaMenuItems = contentAreas.map(area => ({
//     title: area.name,
//     path: `/content-area/${area.id}`,
//     icons: <AiIcons.AiFillBook />,
//     cName: "nav-sub-text"
//   }));

//   const menuItems = [
//     {
//       title: "Home",
//       path: "/",
//       icons: <AiIcons.AiFillHome />,
//       cName: "nav-text",
//     },
//     {
//       title: "Forum",
//       path: "/posts",
//       icons: <AiIcons.AiFillHome/>,
//       cName: "nav-text",
//     },
//     {
//       title: "My Forum Posts",
//       path: "/myposts",
//       icons: <AiIcons.AiFillHome/>, 
//       cName: "nav-text",
//     },
//     {
//       title: "Message",
//       path: "/message",
//       icons: <AiIcons.AiFillHome/>, 
//       cName: "nav-text",
//     },
//     {
//       title: "Learn",
//       path: "#",
//       icons: <AiIcons.AiFillBook />,
//       cName: "nav-text",
//       subNav: contentAreaMenuItems,
//     }
//   ];

//   return menuItems;
// };


import { useState, useEffect } from 'react';
import * as AiIcons from "react-icons/ai";
import { useContentAreas } from './useContentAreas'; // Assuming this is correctly implemented

export const useSidebarAdminData = () => {

  const { contentAreas, fetchContentAreas } = useContentAreas();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchContentAreas(); 
  }, [fetchContentAreas]);

  useEffect(() => {
    const contentAreaMenuItems = contentAreas.map(area => ({
      title: area.name,
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
