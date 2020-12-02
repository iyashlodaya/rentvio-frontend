let express = require("express");
let router = express.Router();
const { signout, signup, signin } = require("../controllers/auth");

router.get("/signout", signout);

router.post("/signup", signup);

router.post("/signin", signin);

module.exports = router;
