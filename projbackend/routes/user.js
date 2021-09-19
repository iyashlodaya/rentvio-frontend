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

router.get("/user/:userId", userPurchaseList);

// update route
router.put("/user/:userId", updateUser);

//todo: delete user route

router.get("/orders/user/:userId", userPurchaseList);

module.exports = router;
