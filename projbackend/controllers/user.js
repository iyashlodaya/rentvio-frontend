const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "No User was found in DB!!" });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        res
          .status(400)
          .json({ error: "Something Went Wrong, Not Updated Values!!" });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json({ User: user });
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id first_name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: "No Order in this account" });
      }
      res.json(order);
    });
};

// Method to get all users

/* exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({ error: "No Users in DATABASE!!!" });
    }
    res.json(users);
  });
}; */
