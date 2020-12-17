const Category = require("../models/category");

// Getting Category by ID middleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: "No Category was found in DB!!" });
    }
    req.category = category;
    next();
  });
};

// Get Category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

// Get All Category
exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({ err: "No Categories Found" });
    }
    res.send(categories);
  });
};

// create a category
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({ err: "No Category Created!!" });
    }
    res.json({ category });
  });
};

// update a category
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err || !updatedCategory) {
      return res.status(400).json({ error: "Updating Category Failed!!" });
    }
    res.json({ updateCategory });
  });
};

// delete a category
exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete this category.`,
      });
    }
    res.json({
      message: `Successfull Deleted : ${category}`,
    });
  });
};
