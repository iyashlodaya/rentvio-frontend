import { GoogleLogin } from "@react-oauth/google";
import React, { useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin, signInWithGoogle } from "../auth/helper/index";
import Base from "../core/Base";
import signInPageIllustration from "./sign-in-page-illustration.png"
import logo from "../logo.png";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  let emailRef = useRef("")
  let passwordRef = useRef("")

  const { email, password, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleValidation = () => {
    let result = false;
    if (!email) {
      setValues({
        ...values,
        error: "Email address should not be blank",
      });
      emailRef.current.focus();
    } else if (!password) {
      setValues({
        ...values,
        error: `Password shouldn't be blank.`,
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
    // console.log("OnSubmit Clicked!");

    const validationResponse = handleValidation();

    if (!validationResponse) {
      return;
    } else {
      setValues({ ...values, error: false });

      const signInResponse = await signin({ email, password });

      if (!signInResponse) {
        // console.log("Error in SignIn!", signInResponse);
      } else {
        if(signInResponse.err) {
          // console.log('Error Occured in Signin', signInResponse);
          setValues({ ...values, error: signInResponse.err });
        }
        else if (signInResponse.error) {
          console.log("SignIn API Error Response. ", signInResponse);
          setValues({ ...values, error: signInResponse.error });
        } 
        else {
          console.log("SignIn API Success Response. ", signInResponse);
          authenticate(signInResponse, () => {
            setValues({
              ...values,
              didRedirect: true,
              error: "",
              email: "",
              password: "",
            });
          });
        }
      }
    }
  };

  const signInGoogle = async (token) => {

    const googleResponse = await signInWithGoogle(token);

    if(!googleResponse) {
      console.log('error in google signIn');
    }
    else if (googleResponse.error) {
      console.log('Error in google sign in', googleResponse);
      setValues({ ...values, error: googleResponse.error });
    }
    else {
      console.log('Sucess in google sign in', googleResponse);
      authenticate(googleResponse, () => {
        setValues({
          ...values,
          didRedirect: true,
          error: "",
          email: "",
          password: "",
        });
      });
    }
  }

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/home" />;
    }
  };


  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
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

  const signInForm = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 left-section">
            <h3 className="left-section-heading">Rent furniture and appliances with an ease of comfort.</h3>
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
                  ref={emailRef}
                  onChange={handleChange("email")}
                  className={`form-control ${
                    error && email === "" ? "is-invalid" : null
                  }`}
                  value={email}
                  type="email"
                  placeholder="e.g. john.doe@rentvio.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  ref={passwordRef}
                  onChange={handleChange("password")}
                  className={`form-control ${
                    error && password === "" ? "is-invalid" : null
                  }`}
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
                  <GoogleLogin
                  onSuccess={async (successResponse)=>{signInGoogle(successResponse.credential)}}
                  onError={(errorResponse)=>{console.log('successful login', errorResponse)}}
                  >
                  </GoogleLogin>
                </div>
              </div>
              <div className="form-footer-section">
                <h6 style={{fontWeight: "400"}}>New to Rentvio? <Link to="/signup">Sign up</Link></h6>
              </div>
            </form>
            {errorMessage()}
          </div>
        </div>
      </div>
    );
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
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default SignIn;
