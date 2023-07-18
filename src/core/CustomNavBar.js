import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar
} from "react-bootstrap";

import logo from "../logo.png";
import avatarImg from "../auth/avatar.png";
import "../core/core.css";
import { isAuthenticated, signout } from "../auth/helper";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

export default function CustomNavBar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { cartItems, clearCart } = useContext(CartContext);

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
        <Container className="nav-container">
          <div className="d-flex flex-row align-items-center">
            <Navbar.Brand
              href="/"
              onClick={() => {
                navigate("/");
              }}
            >
              <img alt="logo" src={logo} width={120} />
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
            <Nav
              id="shopping-bag"
              className="ms-3  d-flex flex-row align-items-center text-center"
            >
              <Dropdown>
                <Dropdown.Toggle id="cart-drop-down">
                  <i
                    className="fa fa-shopping-bag fa-lg"
                    style={{ color: "#5271FF" }}
                  >
                    {cartItems && cartItems.length > 0 && (
                      <Badge
                        pill
                        bg="danger"
                        style={{ fontSize: 12, position: "absolute", backgroundColor:'red' }}
                      >
                        {cartItems.length}
                      </Badge>
                    )}
                  </i>
                </Dropdown.Toggle>
                <Dropdown.Menu id="cart-drop-down-menu">
                  {cartItems.map((item, index) => {
                    return (
                      <div key={index}>
                        <Dropdown.Item
                          className="d-flex flex-row align-items-center justify-content-between"
                        >
                          <img
                            src={item.productInfo.productImageLink}
                            width={80}
                            height={60}
                            alt="product-mini-pic"
                            style={{ borderRadius: 20, marginRight: 20 }}
                          />
                          <div style={{marginRight: 20, cursor:"default"}}>
                            <p className="m-0" style={{ fontSize: "14px",  }}>
                              {item.productInfo.productName}
                            </p>
                            <p className="m-0" style={{ fontSize: "14px" }}>
                              Rent: ₹{item.productInfo.productRent}
                            </p>
                            <p className="m-0" style={{ fontSize: "14px" }}>
                              Refundable Deposit: ₹
                              {item.productInfo.productRefundableDeposit}
                            </p>
                          </div>
                          <div id="item-button-section">
                            <i
                              style={{ color: "#E97451" }}
                              className="fa-solid fa-trash fa-lg"
                            />
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Divider></Dropdown.Divider>
                      </div>
                    );
                  })}
                  {cartItems && cartItems.length > 0 ? (
                    <Dropdown.Item
                      id="button-section"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        style={{ marginRight: 8 }}
                        onClick={() => {
                          clearCart();
                        }}
                      >
                        Clear Cart
                      </Button>
                      <Button onClick={()=>{navigate("/cart")}}>Go To Cart</Button>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item>No Items in Cart</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
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
                            Profile
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
            <Nav className="login-section">
              {/* {loggedInUser && (
                <Nav.Link
                  id="signout-btn"
                  className="text-center"
                  style={{ fontSize: "14px" }}
                  onClick={() => {
                    signout(() => {
                      setLoggedIn(false);
                      navigate("/");
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
