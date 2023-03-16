import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, DropdownButton, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";

import logo from "../logo.png";
import avatarImg from "../auth/avatar.png";
import "../core/core.css";
import { isAuthenticated, signout } from "../auth/helper";
import { useHistory } from "react-router-dom";

export default function CustomNavBar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const { user } = isAuthenticated();
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  return (
    <div>
      <Navbar style={{ height: 80 }} variant="light">
        <Container className="nav-container">
          <div className="d-flex flex-row align-items-center">
            <Navbar.Brand href="/">
              <img alt="" src={logo} width={120} />
              {""}
            </Navbar.Brand>
            <Nav>
              <Nav.Link href="/" style={{ fontSize: "14px" }}>
                Home
              </Nav.Link>
              {/* <Nav.Link href="products">Products</Nav.Link> */}
            </Nav>
          </div>
          <div className="d-flex flex-row align-items-center">
            <Nav>
              {
                <Form className="">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={{ height: 40, width: 320, fontSize: "14px" }}
                  />
                  {/* <Button className=''>Search</Button> */}
                </Form>
              }
            </Nav>
            <Nav.Link
              id="shopping-bag"
              className="ms-3 me-3 d-flex flex-row align-items-center text-center"
              style={{ color: "#5271FF", cursor: "pointer" }}
            >
              <i className="fa fa-shopping-bag fa-lg"></i>
            </Nav.Link>
            {
              loggedInUser && (
                <>
                  <Nav>
                    <Dropdown >
                      <Dropdown.Toggle id="user-account-drop-down" >
                      <i
                          style={{ color: "#5271FF" }}
                          className="fa-solid fa-user fa-lg"
                        ></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu align={"end"} className={"mt-3"}>
                        <Dropdown.Item className="d-flex flex-row justify-content-space-between align-items-center text-center">
                          <p className="m-0 pe-5 text-center" style={{fontSize: "14px"}}>Profile</p>
                          <img
                            src={
                                loggedInUser.picture
                                ? loggedInUser.picture
                                : avatarImg
                            }
                            width={40}
                            style={{ borderRadius: "50%" }}
                          />
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item style={{fontSize: "14px"}}
                        onClick={() => {
                          signout(() => {
                            setLoggedInUser(null);
                            history.push("/");
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
            <Nav className="login-section">
              {/* {loggedInUser && (
                <Nav.Link
                  id="signout-btn"
                  className="text-center"
                  style={{ fontSize: "14px" }}
                  onClick={() => {
                    signout(() => {
                      setLoggedIn(false);
                      history.push("/");
                    });
                  }}
                >
                  Sign Out
                </Nav.Link>
              )} */}
              {!loggedInUser && (
                <Nav.Link
                  href="/login"
                  id="login-btn"
                  className="text-center"
                  style={{ fontSize: "14px" }}
                >
                  Sign In
                </Nav.Link>
              )}
              {!loggedInUser && (
                <Nav.Link
                  id="signup-btn"
                  href="/signup"
                  className="btn btn-primary"
                  style={{ fontSize: "14px" }}
                >
                  Register
                </Nav.Link>
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
