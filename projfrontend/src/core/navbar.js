import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import "../core/core.css";
import SignUpModal from "./SignUpModal";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#FF7F50" };
  } else {
    return { color: "#d1d1d1" };
  }
};

const NavBar = () => {
  let history = useHistory();
  return (
    <div>
      {/* modal */}
      <SignUpModal />

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
              onClick={()=>{console.log(`Sign Up Btn pressed!!`)}}
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#signUpModal"
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
