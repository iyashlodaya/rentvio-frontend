const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const { getOrderById, createOrder,getAllOrders } = require("../controllers/order");
const { isSafeInteger } = require("lodash");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// create routes
// router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderinPurchaseList,updateStock,createOrder);
router.post("/order/create/", updateStock, createOrder);

// read routes
// router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)
router.get("/order/all/", getAllOrders);

// status of order
// router.get(
//   "/order/status/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   getOrderStatus
// );

// router.put(
//   "/order/:orderId/status/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updateOrderStatus
// );

module.exports = router;
