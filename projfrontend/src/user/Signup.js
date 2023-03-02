import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
import "../user/css/signup.css"
import signupIllustration from "./sign-up-page-illustration.png"
import logo from "../logo.png"

const SignUp = () => {
  const [values, setValues] = useState({
    first_name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { first_name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ first_name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            first_name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in SignUp"));
  };

  const signUpForm = () => {
    return (
      <div className="container">
        <CustomNavBar></CustomNavBar>
        <div className="row">
          <div className="col-6 left-section">
            <h3 className="left-section-heading">Rent furniture with an ease of comfort.</h3>
            <h6 className="left-section-sub-heading">Our Registration process is quick, taking no more than 2 minutes to complete</h6>
            <img src={signupIllustration} alt="signup-page" className="sign-up-image"></img>
          </div>
          <div className="col-6 right-section">
            <h3 className="right-section-heading"> Get started</h3>
            <h6 className="right-section-sub-heading">
              Signin Up for Rentvio is Fast and 100% free.
            </h6>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="full-name"
                  value={first_name}
                  onChange={handleChange("first_name")}
                  placeholder="Enter your full name."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  onChange={handleChange("email")}
                  className="form-control"
                  value={email}
                  type="email"
                  placeholder="e.g. john.doe@rentvio.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  onChange={handleChange("password")}
                  className="form-control"
                  type="password"
                  value={password}
                  placeholder="Enter password."
                />
              </div>
              <div className="form-group">
                <button onClick={onSubmit} className="btn sign-up-btn">
                  Sign Up
                </button>
              </div>

              <div className="form-footer-section">
                <h6>Have an account? <Link to="/login">Login.</Link></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New Account was Created Succesfully!! Please{" "}
        <Link to="/signin">Login Here!!</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const CustomNavBar = () => {
    return ( <div>
      <img src={logo} width={120} />
    </div> );
  }

  return (
    <div id="Signup Page" className="signUp text-dark">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </div>
  );
};

export default SignUp;
