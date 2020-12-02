let express = require("express");
let router = express.Router();

const {
  getProductById,
  photo,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct
} = require("../controllers/product");

router.param("productid", getProductById);

// read route
router.get("/product/:productid", getProduct);
router.get("/product/photo/:productid", photo, getProduct);

// create route
router.post("/product/create", createProduct);

// update route
router.put("/product/:productid", updateProduct);

// delete route
router.delete("/product/:productid", removeProduct);

module.exports = router;
