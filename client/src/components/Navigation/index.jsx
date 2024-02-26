import React, { useState } from "react";
import Logo from "./public/images/logo.png";
import { Link } from "react-router-dom";
// import ReorderIcon from "@material-ui/icons/Reorder";
import "./Navigation.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <div className="hiddenLinks">
          <Link to="/Home"> Home </Link>
          <Link to="/Drug"> + Drug </Link>
          <Link to="/Signup"> Sign Up </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/Home"> Home </Link>
        <Link to="/Drug"> + Drug </Link>
        <Link to="/Signup"> Sign Up </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;