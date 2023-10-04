import React, {useState, useEffect, useRef} from 'react';
import './Dropdown.css';
import '../../App.css';
import * as mdIcon from "react-icons/md";
import * as BiIcon from "react-icons/bi";
import * as AiIcon from "react-icons/ai";

function Dropdown(props) {

  const [open, setOpen] = useState(false);

  let DropdownRef = useRef();

  useEffect(() => {
    let hamdler = (e) => {
      if (!DropdownRef.current.contains(e.target)){
        setOpen(false);
        console.log(DropdownRef.current);
      }
      
    };
    document.addEventListener("mousedown", hamdler);

    return() =>{
      document.removeEventListener("mousedown", hamdler);
    }

  });

  return (

    <div className="menu-container" ref={DropdownRef}>
      <div className="menu-trigger" onClick={() =>{setOpen(!open)}}>
        Hi {props.text}! <mdIcon.MdArrowDropDown/>
      </div>

      <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
        <ul>
          <DropdownItem img={AiIcon.AiOutlineSetting} text = {"Settings"} />
          <DropdownItem img={BiIcon.BiLogOut} text = {"Log Out"} />
        </ul>
      </div>

    </div>
      

  )
}

function DropdownItem(props){
  return(
    <li className="dropdownItem">
      <props.img />
      <a>{props.text}</a>
    </li>
  );
}


export default Dropdown;
