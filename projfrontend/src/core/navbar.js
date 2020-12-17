import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ECC72" };
  } else {
    return { color: "#d1d1d1" };
  }
};

const NavBar = () => {
  let history = useHistory();
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" style={currentTab(history, "/")} to="/">
              RentVio
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.privilages === 0 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={currentTab(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                User Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.privilages === 1 && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={currentTab(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link
              className="nav-link"
              style={currentTab(history, "/cart")}
              to="/cart"
            >
              Cart
            </Link>
          </li>
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={currentTab(history, "/signup")}
                  to="/signup"
                >
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={currentTab(history, "/signin")}
                  to="/signin"
                >
                  SignIn
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
