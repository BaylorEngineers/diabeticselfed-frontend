import React from 'react';
import './Header.css';
import Dropdown from '../Dropdown/Dropdown';

function Header() {

  return (

    <div className="Title">
    
      <Dropdown text="User"/>
      
    </div>
  )
}

export default Header;