const User = require("../models/user");
let jwt = require("jsonwebtoken");
let expressJwt = require("express-jwt");
let { check, validationResult } = require("express-validator");

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.send("User Signout Succesfully");
};

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  console.log("Sign Up", req.body);
  console.log("Sign Up", errors);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: "NOT ABLE TO SAVE USER " });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  console.log("SIGNIN ROUTE CALLED");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  console.log("Errors ", errors);

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({ error: "EMAIL NOT FOUND!!!" });
    }
    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ error: "EMAIL AND PASSWORD DOESNT MATCH!!" });
    }
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //create token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to front end
    const { _id, first_name, email, privilages } = user;

    return res.json({ token, user: { _id, first_name, email, privilages } });
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  console.log("IS AUTHENTICATED CALLED");
  console.log(`req.profile - ${req.profile}`);

  let checker = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  console.log(checker)
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED!! Not Authenticated",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  console.log("IS ADMIN CALLED");
  if (req.profile.privilages === 0) {
    return res.status(403).json({
      error: " Access Denied! You don't have admin privilages.",
    });
  }

  next();
};
