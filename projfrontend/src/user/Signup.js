import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
import "../user/css/user.css"
import CustomNavBar from "../core/CustomNavBar";
import signupIllustration from "./sign-up-page-illustration.png"
import Base from "../core/Base";

const SignUp = () => {
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { full_name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!full_name || !email || !password) {
      setValues({...values, error: 'Some fields are empty', success: false});
      return;
    }
    setValues({ ...values, error: false });
    signup({ full_name, email, password })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, error: data.err, success: false });
        } else {
          setValues({
            ...values,
            full_name: "",
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
        <div className="row">
          <div className="col-6 left-section">
            <h3 className="left-section-heading">Rent furniture with an ease of comfort.</h3>
            <h6 className="left-section-sub-heading">Our Registration process is quick, taking no more than 2 minutes to complete</h6>
            <img src={signupIllustration} alt="signup-page" className="sign-up-image"></img>
          </div>
          <div className="col-6 right-section">
            <h3 className="right-section-heading"> Get started</h3>
            <h6 className="right-section-sub-heading">
              Sign Up for Rentvio is Fast and 100% free.
            </h6>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Full name
                </label>
                {/* <label className="form-label-error" htmlFor="name">
                  Full Name Error
                </label> */}
                <input
                  type="text"
                  className="form-control"
                  id="full-name"
                  value={full_name}
                  onChange={handleChange("full_name")}
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
                <button onClick={onSubmit} className="btn sign-up-sign-in-btn">
                  Sign Up
                </button>
              </div>

              <div className="form-footer-section">
                <h6 style={{fontWeight: "400"}}>Have an account? <Link to="/login">Login.</Link></h6>
              </div>
            </form>

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
        style={{textAlign: "center", width: "480px", display: success ? "" : "none" }}
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
        style={{textAlign: "center", width: "480px", display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };


  return (
    <Base navbar={true} id="Signup Page" className="signUp text-dark">
      {signUpForm()}
    </Base>
  );
};

export default SignUp;
