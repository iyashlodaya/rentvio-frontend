import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated, signup } from "../../utils/authapicalls";
import "../../styles/user.css";
import signupIllustration from "../../assets/sign-up-page-illustration.png";
import Base from "../../components/Base";
import { Container, Navbar } from "react-bootstrap";
import logo from "../../logo.png";
import { Button, TextField, Typography } from "@mui/material";

const SignUp = () => {
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const fullnameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { full_name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleValidation = () => {
    let result = false;
    if (!full_name) {
      setValues({
        ...values,
        error: "Please enter your full name.",
        success: false,
      });
      fullnameRef.current.focus();
    } else if (!email) {
      setValues({
        ...values,
        error: "Email address should not be blank",
        success: false,
      });
      emailRef.current.focus();
    } else if (!password) {
      setValues({
        ...values,
        error: `Password shouldn't be blank.`,
        success: false,
      });
      passwordRef.current.focus();
    } else {
      // console.log("no errors in validation.");
      result = true;
    }
    return result;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    const validationResult = handleValidation();

    if (!validationResult) {
      return;
    } else {
      setValues({ ...values, error: false });
      let signupResponse = await signup({ full_name, email, password });

      if (!signupResponse) {
        // console.log("Error in Signup!", signupResponse);
      } else {
        if (signupResponse.error) {
          // console.log("Signup API return error Response. ", signupResponse);
          setValues({
            ...values,
            error: signupResponse.error,
            success: false,
          });
        }
        else {
          // console.log('Signup API return success Response. ', signupResponse);
          setValues({
          ...values,
          full_name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
        }
      }
    }
  };

  const signUpForm = () => {
    // console.log(values)
    return (
      <div className="container">
        <div className="d-flex">
          <div className="left-section">
            <h3 className="left-section-heading">
              Rent furniture and appliances with an ease of comfort.
            </h3>
            <h6 className="left-section-sub-heading">
              Our registration process is quick, taking no more than 2 minutes
              to complete
            </h6>
            <img
              src={signupIllustration}
              alt="signup-page"
              className="sign-up-image"
            ></img>
          </div>
          <div className="right-section">
            <h3 className="right-section-heading"> Get started</h3>
            <h6 className="right-section-sub-heading">
              Sign Up for Rentvio is Fast and 100% free.
            </h6>
            <div id="sign-up-form">
                  <TextField
                    fullWidth
                    ref={fullnameRef}
                    onChange={handleChange("full_name")}
                    className={`form-control ${
                      error && full_name === "" ? "Mui-error" : null
                    }`}
                    value={full_name}
                    type="text"
                    label="Full Name"
                    placeholder="Enter your full name."
                  />
                  <TextField
                    fullWidth
                    ref={emailRef}
                    onChange={handleChange("email")}
                    className={`form-control ${
                      error && email === "" ? "Mui-error" : null
                    }`}
                    value={email}
                    type="email"
                    label="Email"
                    placeholder="e.g. john.doe@rentvio.com"
                  />
                  <TextField
                    fullWidth
                    ref={passwordRef}
                    onChange={handleChange("password")}
                    className={`form-control ${
                      error && password === "" ? "Mui-error" : null
                    }`}
                    value={password}
                    type="password"
                    label="Password"
                    placeholder="Enter password."
                  />
                  <button className='sign-up-sign-in-btn' variant="outlined" onClick={onSubmit}>
                    Sign Up
                  </button>
                <div className="form-footer-section">
                  <Typography variant="body2">
                    Have an account? <Link to="/login">Login.</Link>
                  </Typography>
                </div>
              </div>

            {errorMessage()}
            {successMessage()}
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-4"
        style={{
          textAlign: "center",
          width: "480px",
          display: success ? "" : "none",
        }}
      >
        New Account was Created Succesfully!! Please{" "}
        <Link to="/login">Login Here!!</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-4"
        style={{
          textAlign: "center",
          width: "480px",
          display: error ? "" : "none",
        }}
      >
        {error}
      </div>
    );
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  return (
    <Base>
      <Container className="pt-0 pb-0">
      <Navbar style={{ height: 80 }} variant="light">
        <Navbar.Brand href="/">
              <img alt="" src={logo} width={120} />
              {""}
            </Navbar.Brand>
        </Navbar>
      </Container>
      {signUpForm()}
      {performRedirect()}
    </Base>
  );
};

export default SignUp;
