let express = require("express");
let { check, validationResult } = require("express-validator");
let router = express.Router();
const {
  signout,
  signup,
  signin,
  isAuthenticated,
  isSignedIn,
  signInWithGoogle
} = require("../controllers/auth");

router.get("/signout", signout);

router.post(
  "/signup",
  [
    check("full_name").isLength({ min: 1 }),
    check("email").isEmail().withMessage("Enter a valid Email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("The password must be 8+ chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Must be an valid Email"),
    check("password").isLength({ min: 8 })
      .withMessage("The password must be 8+ chars long"),
  ],
  signin
);

router.post(
  "/google/signin",
  signInWithGoogle
)

module.exports = router;
