const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");
const category = require("../models/category");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res
          .status(400)
          .json({ error: `Product Not Found Because:--${err}` });
      }
      req.product = product;
      next();
    });
};

// Get One Product
exports.getProduct = (req, res) => {
  console.log("IN GET PRODUCT!!!!");
  req.product.photo = undefined;
  return res.json(req.product);
};
// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Create a Product
exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm({ multiples: true });
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({ err: "Something Went Wrong!!" });
    }

    const {
      name,
      description,
      price,
      deposit_amount,
      category,
      remaining_stock,
      color,
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !deposit_amount ||
      !category ||
      !remaining_stock ||
      !color
    ) {
      return res.status(400).json({ error: "Please include All the fields" });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File Size is too big!! " });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        res.status(400).json({ error: "Product Saving Failed" });
      }
      res.json(product);
    });
  });
};

// update a product
exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.product._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, product) => {
      if (err || !product) {
        res.status(400).json({ error: `Product Not Updated ${err}` });
      }
      res.json({ product: product });
    }
  );
};

// remove a product
exports.removeProduct = (req, res) => {
  const product = req.product;
  product.remove((err, product) => {
    if (err) {
      res.status(400).json({ error: `Product Not Deleted Because: ${err}` });
    }
    res.json({ message: `Successfully Deleted Product :=> ${product}` });
  });
};
