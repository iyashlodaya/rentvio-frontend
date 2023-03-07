import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'

import logo from "../logo.png"
import "../core/core.css"

export default function CustomNavBar() {
  return (
    <div>
      <Navbar style={{ height: 80 }} variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img alt="" src={logo} width={120} />
            {""}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="products">Products</Nav.Link> */}
          </Nav>
          <Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{height: 40, width:320, fontSize: '14px'}}
            />
            {/* <Button className=''>Search</Button> */}
          </Form>
          </Nav>
          <Nav className="d-flex float-right login-section">
            <Nav.Link
              href='/login'
              id='login-btn'
              className='text-center'
              style={{fontSize: "14px"}}
            >
              Sign In
            </Nav.Link>
            <Nav.Link
              id="signup-btn"
              href='/signup'
              className="btn btn-primary"
              style={{fontSize: "14px"}}
            >
              Register
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <nav className="navbar">
        <img src={logo} width={120} />
      </nav> */}
    </div>
  );
}
