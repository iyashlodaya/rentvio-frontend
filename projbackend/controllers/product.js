const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const category = require("../models/category");
const { sortBy } = require("lodash");




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

// Get All Products i.e Use Limit()
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        res.status(400).json({ error: "No Products Found!!" });
      }
      res.json(products);
    });
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
  console.log("Create Product Called");
  let form = formidable.IncomingForm({ multiples: true });
  form.keepExtensions = true;

  console.log("Before Parse");
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({ error: "Something Went Wrong!!" });
    }

    console.log("After Parse");

    const {
      name,
      description,
      price,
      depositAmount,
      category,
      remainingStock,
      color,
      
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !depositAmount ||
      !category ||
      !remainingStock ||
      !color 
    ){
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
      console.log('Product Saved Successfuly!')
      res.json({product});
    });
  });
};

// update a product
exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm({ multiples: true });
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({ err: "Something Went Wrong!!" });
    }

    let product = req.product;
    product = _.extend(product, fields);

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
        res.status(400).json({ error: "Updation Failed!!" });
      }
      res.json(product);
    });
  });
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

// update stock middleware
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, prods) => {
    if (err) {
      res.status(400).json({ error: "BULK OPERATION FAILED" });
    }
    console.log("PRODS->", prods);
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({ error: "No Categories Found!!!" });
    }
    res.json(category);
  });
};
