import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    depositAmount: "",
    remaingingStock: "",
    color: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    depositAmount,
    price,
    remainingStock,
    color,
    photo,
    category,
    categories,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const prelod = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      })
      .catch(console.log("Error Found in Prelod!"));
  };

  const { user, token } = isAuthenticated();

  useEffect(() => {
    prelod();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log("USER DETAIL IS=>", user);
    console.log("USER ID=>", user._id);
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            remainingStock: "",
            color: "",
            depositAmount: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch(console.log("Error Found in Prelod!"));
  };

  const successMessage = () => {
    return (
      <div>
        <div
          className="alert alert-success mt-3"
          style={{ display: createdProduct ? "" : "none" }}
        >
          <h4 className="text-bold">
            {createdProduct} Created Successfully!!!
          </h4>
        </div>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span className="text-white">Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("depositAmount")}
          type="number"
          className="form-control"
          placeholder="Refundable Deposit Amount"
          value={depositAmount}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("color")}
          type="text"
          className="form-control"
          placeholder="Color"
          value={color}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>Category</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("remainingStock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={remainingStock}
        />
      </div>

      <button
        onClick={onSubmit}
        type="submit"
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base title="Add a Product">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Link to="/admin/dashboard" className="btn btn-danger">
              Admin Home
            </Link>
          </div>
        </div>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {createProductForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
