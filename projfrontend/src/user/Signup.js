import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";

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
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={first_name}
                onChange={handleChange("first_name")}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                value={email}
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
                placeholder="Enter password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
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

  return (
    <Base title="Signup Page">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <h6 className="text-white text-center">{JSON.stringify(values)}</h6>
    </Base>
  );
};

export default SignUp;
