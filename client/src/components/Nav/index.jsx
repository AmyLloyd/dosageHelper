import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/home">
              Go home
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/client">
              New client
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/drug">
              New drug
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
      <div>
        <ul className="d-flex flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
      );
    }
  }

  return (
    
  <div className="d-flex">
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          dosageHelper
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  </div>

  );
}

export default Nav;
