let express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
let router = express.Router();

const {
  getProductById,
  photo,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
  getAllUniqueCategories,
  getAllProducts,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");

router.param("productid", getProductById);
router.param("userId", getUserById);

router.get("/products", getAllProducts);

// read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo, getProduct);

// create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// update route
router.put(
  "/product/:productid/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// delete route
router.delete(
  "/product/:productid/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

router.get("/product/categories", getAllUniqueCategories);

module.exports = router;
