import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Base from "../core/Base";
import { authenticate, isAuthenticated, signin } from "../auth/helper/index";

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
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
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
      <div className="container-fluid pb-4">
        <div className="row">
          <div className="col-md-4 offset-sm-4 text-left">
            <form>
              <div className="form-group">
                <label className="text-light">Email</label>
                <input
                  value={email}
                  placeholder="eg. johndoe@yahoo.com"
                  onChange={handleChange("email")}
                  className="form-control"
                  type="email"
                />
              </div>
              <div className="form-group">
                <label className="text-light">Password</label>
                <input
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleChange("password")}
                  className="form-control"
                  type="password"
                />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignIn Page" className="signIn bg-dark text-white">
      {errorMessage()}
      {signInForm()}
      {loadingMessage()}
      {performRedirect()}
    </Base>
  );
};

export default SignIn;
