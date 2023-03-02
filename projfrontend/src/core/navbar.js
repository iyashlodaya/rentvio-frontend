import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../core/core.css";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#FF7F50" };
  } else {
    return { color: "#d1d1d1" };
  }
};

const NavBar = () => {
  let history = useHistory();
  
  const openSignUpScreen = () => {
    history.push('/signup');
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <ul className="nav container">
          <li className="nav-item">
            <Link className="nav-link" style={currentTab(history, "/")} to="/">
              RentVio
            </Link>
          </li>
          <div className="nav-item login-section">
            <button id="login-btn" className="btn btn-secondary">
              Login
            </button>
            <button
              id="signup-btn"
              type="button"
              onClick={()=>{openSignUpScreen();}}
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </div>
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
