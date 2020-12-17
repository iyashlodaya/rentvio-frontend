import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setName("");
          setSuccess(true);
        }
      })
      .catch();
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New Category was Created Succesfully!!
      </div>
    );
  };

  const addCategoryForm = () => {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="category">Category Name</label>
            <input
              onChange={handleChange}
              value={name}
              required
              autoFocus
              placeholder="For Ex. Tables"
              type="text"
              id="category"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button
              onClick={onSubmit}
              type="button"
              className="btn btn-outline-success mr-3"
            >
              Add +
            </button>
            <Link to="/admin/dashboard" className="btn btn-outline-danger">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Base title="Create Category Here" className="container bg-info p-3">
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {addCategoryForm()}
          {successMessage()}
          {errorMessage()}
          {JSON.stringify({name:name})}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
