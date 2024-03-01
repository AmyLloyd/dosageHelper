import React, { useState } from "react";
import Logo from "/images/logo.png";
import { Link } from "react-router-dom";
import "./styles.css";
import Auth from "../../utils/auth";

function Navbar() {

  function showNavigation() {
    if (Auth.loggedIn()) {
        const [openLinks, setOpenLinks] = useState(false);

        const toggleNavbar = () => {
          setOpenLinks(!openLinks);
        };

          return (
            <div className="navbar">
              <div className="leftSide" id={openLinks ? "open" : "close"}>
                <img src={Logo} />
                <div className="hiddenLinks">
                  <Link to="/Home"> + Home </Link>
                  <Link to="/Drug">+ Drug</Link>
                  <div>
                  <a href="/" onClick={() => Auth.logout()}>Logout</a>
                  </div>
                </div>
              </div>
              <div className="rightSide">
                <Link to="/Home">+ Home</Link>
                <Link to="/Drug">+ Drug</Link>
                <div>
                  <a href="/" onClick={() => Auth.logout()}>Logout</a>
                </div>
                <button onClick={toggleNavbar}>
                {/* <ReorderIcon /> */}
                </button>
              </div>
            </div>
          );


    } else {
      
          return (
            <div className="navbar">
            <div className="leftSide" id={openLinks ? "open" : "close"}>
              <img src={Logo} />
              <div className="hiddenLinks">
      
                <Link to="/Signup"> Sign Up </Link>
              </div>
            </div>
            <div className="rightSide">  
     
              <Link to="/Signup"> Sign Up </Link>
              <Link to="/Login">Log in</Link>
              <button onClick={toggleNavbar}>
              {/* <ReorderIcon /> */} 
            </button>
            </div>
          </div>
          );
    }
  };

  
  return (
      <nav>
        {showNavigation()}
      </nav>
  );

}

export default Navbar;