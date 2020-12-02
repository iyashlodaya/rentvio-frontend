const User = require("../models/user");
let jwt = require("jsonwebtoken");
let expressJwt = require("express-jwt");

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.send("User Signout Succesfully");
};

exports.signup = (req, res) => {
  console.log("REQ BODY", req.body);
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
