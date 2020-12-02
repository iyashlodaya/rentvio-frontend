let express = require("express");
let router = express.Router();

const {
  getCategoryById,
  getCategory,
  createCategory,
  getAllCategories,
  updateCategory,
  removeCategory
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("categoryId", getCategoryById);

// read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

// create route
router.post("/category/create/:userId", getUserById, createCategory);

// update route
router.put("/category/:categoryId/:userId", updateCategory);

// delete route
router.delete("/category/:categoryId/", removeCategory);

module.exports = router;
