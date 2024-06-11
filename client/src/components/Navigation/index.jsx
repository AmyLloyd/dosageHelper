import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/images/logo.png";
import Auth from "../../utils/auth";
import "./styles.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons from FontAwesome

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <nav className="navbar">
      <div className={`leftSide ${openLinks ? "open" : "close"}`}>
        <img src={Logo} alt="Logo" />
        <div className="hiddenLinks">
          {Auth.loggedIn() ? (
            <>
              <Link to="/Home">+Clients</Link>
              <Link to="/Drug">+Drugs</Link>
              <a href="/" onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/Signup">Sign Up</Link>
              <Link to="/Login">Log in</Link>
            </>

          )}
        </div>
      </div>
      <div className="rightSide">
        {Auth.loggedIn() ? (
          <>
            <Link to="/Home">+Clients</Link>
            <Link to="/Drug">+Drugs</Link>
            <a href="/" onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/Signup">Sign Up</Link>
            <Link to="/Login">Log in</Link>
          </>
        )}
        <button onClick={toggleNavbar} className="navbar-toggle">
          {openLinks ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

