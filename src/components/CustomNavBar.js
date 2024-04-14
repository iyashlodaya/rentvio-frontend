import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
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
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import { AddShoppingCartOutlined, ArrowDownwardOutlined, ChevronRight, ChevronRightOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const cities = ['Delhi', 'Mumbai', 'Bangalore'];



export default function CustomNavBar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { cartItems, clearCart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

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
      <Navbar
        style={{ height: 80, boxShadow: `0 2px 4px 0 rgba(0,0,0,.2)` }}
        variant="light"
      >
        <Container>
          <div id="nav-left-menus">
            <Navbar.Brand
              href="/"
              onClick={() => {
                navigate("/");
              }}
            >
              <img alt="logo" src={logo} width={120} />
              {""}
            </Navbar.Brand>
            <div className="ms-2">
              <FormControl variant="standard" sx={{ minWidth: 104 }}>
                <Select
                  id="city-select"
                  value={selectedCity}
                  onChange={handleChange}
                  autoWidth={true}
                  sx={{
                    '.MuiSvgIcon-root ': {
                      // fill: "red !important",
                      paddingRight: "8px !important",
                    }
                  }}
                  disableUnderline={true}
                  placeholder="Select City"
                  
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div id="nav-links">
            <div id="mobile" onClick={toggleMenuOpen}>
              {!menuOpen ? <MenuIcon></MenuIcon> : <CloseIcon></CloseIcon>}
            </div>
            <div id="nav-menus" className={menuOpen ? "active" : ""}>
              <NavLink>
                <Button size="small" onClick={()=>{navigate('/cart')}} id="cart-button">
                  <AddShoppingCartOutlined className="me-2" />
                  Cart
                </Button>
              </NavLink>
              {loggedInUser && (
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
              )}

              {!loggedInUser && (
                <NavLink href="/login">
                  <Button id="login-btn" variant="outlined" size="small" style={{textTransform: 'initial'}}>
                    Login / Sign Up
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
