import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  NavLink,
  Navbar,
} from "react-bootstrap";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../logo.png";
import avatarImg from "../assets/avatar.png";
import "../styles/core.css";
import { isAuthenticated, signout } from "../utils/authapicalls";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

export default function CustomNavBar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { cartItems, clearCart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    if(!menuOpen) {
      setMenuOpen(true);
    }
    else {
      setMenuOpen(false);
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    const { user } = isAuthenticated();
    if (user) {
      setLoggedInUser(user);
    }
  }, []);


  return (
    <div>
      <Navbar style={{ height: 80 }} variant="light">
        <Container>
          <div id="nav-brand">
            <Navbar.Brand
              href="/"
              onClick={() => {
                navigate("/");
              }}
            >
              <img alt="logo" src={logo} width={120} />
              {""}
            </Navbar.Brand>
          </div>
          <div id="nav-links">
            
            <div id="mobile" onClick={toggleMenuOpen}>
              {!menuOpen ? <MenuIcon></MenuIcon> : <CloseIcon></CloseIcon>}
            </div>
            <div id="nav-menus" className={menuOpen ? "active" : ""}>
              <NavLink href="/">Home</NavLink>
              <NavLink>
                <Button
                  id="shopping-bag"
                  onClick={() => {
                    navigate("/cart");
                  }}
                  variant="text"
                >
                  <i className="fa fa-shopping-bag fa-lg"></i>
                </Button>
              </NavLink>
              {
                loggedInUser && (
                  <>
                    <Nav>
                      <Dropdown>
                        <Dropdown.Toggle id="user-account-drop-down">
                          <i
                            style={{ color: "#5271FF" }}
                            className="fa-solid fa-user fa-lg"
                          ></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align={"end"} className={"mt-3"}>
                          <Dropdown.Item className="d-flex flex-row justify-content-space-between align-items-center text-center">
                            <p
                              className="m-0 pe-5 text-center"
                              style={{ fontSize: "14px" }}
                            >
                              {loggedInUser.full_name}
                            </p>
                            <img
                              src={
                                loggedInUser.picture
                                  ? loggedInUser.picture
                                  : avatarImg
                              }
                              width={40}
                              alt="profile pic"
                              style={{ borderRadius: "50%" }}
                            />
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            onClick={() => {
                              navigate("/user/orders");
                            }}
                            style={{ fontSize: "14px" }}
                          >
                            Orders
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            style={{ fontSize: "14px" }}
                            onClick={() => {
                              signout(() => {
                                setLoggedInUser(null);
                                navigate("/");
                              });
                            }}
                          >
                            Sign Out
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav>
                  </>
                )
                // <Nav.Link id="user-account" className="ms-3 me-3 d-flex flex-row align-items-center text-center" style={{color: "#5271FF", cursor: "pointer"}}>
                //   <i className="fa-solid fa-user fa-lg"></i>
                // </Nav.Link>
              }

              {!loggedInUser && (
                <Nav.Link href="/login" id="login-btn" className="text-center">
                  Sign In
                </Nav.Link>
              )}
              {!loggedInUser && (
                <Nav.Link
                  id="signup-btn"
                  href="/signup"
                  className="btn btn-primary"
                >
                  Register
                </Nav.Link>
              )}
            </div>
            
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
