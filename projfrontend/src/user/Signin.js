import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper/index";
import Base from "../core/Base";
import CustomNavBar from "../core/CustomNavBar";
import signInPageIllustration from "./sign-in-page-illustration.png"

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.err) {
          console.log('fail')
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log('Succesful')
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              error: "",
              loading: true,
              email: "",
              password: "",
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.privilages === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2 className="text-warning">Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 left-section">
            <h3 className="left-section-heading">Rent furniture with an ease of comfort.</h3>
            <h6 className="left-section-sub-heading">Sign in to get the exciting deals.</h6>
            <img src={signInPageIllustration} alt="sign-in-page" className="sign-in-image"></img>
          </div>
          <div className="col-6 right-section">
            <h3 className="right-section-heading"> Sign In</h3>
            <h6 className="right-section-sub-heading">
              Welcome Back! Please enter your details.
            </h6>
            <form>
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
                  Sign In
                </button>
              </div>
              <hr className="hr-break"></hr>
              <div className="form-group">
                <div className="google-btn">
                  <GoogleLogin>
                  </GoogleLogin>
                </div>
              </div>
              <div className="form-footer-section">
                <h6 style={{fontWeight: "400"}}>New to Rentvio? <Link to="/signup">Sign up</Link></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base navbar={true} className="signIn">
      {errorMessage()}
      {signInForm()}
      {/* {loadingMessage()} */}
      {performRedirect()}
    </Base>
  );
};

export default SignIn;
