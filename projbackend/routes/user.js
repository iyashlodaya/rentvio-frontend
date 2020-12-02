let express = require("express");
let router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
// const {} = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", getUser);

// update route
router.put("/user/:userId", updateUser);

router.get("/orders/user/:userId", userPurchaseList);

module.exports = router;
