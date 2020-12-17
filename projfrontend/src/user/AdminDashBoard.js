import React from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const AdminDashboard = () => {
  const {
    user: { first_name, email, privilages },
  } = isAuthenticated();

  const AdminLeftSide = () => {
    return (
      <div className="card">
        <h5 className="card-header bg-dark text-white">Admin Navigation</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/producs" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const AdminRightSide = () => {
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            <h4>
              <span className="badge badge-warning">Name: </span> {first_name}
            </h4>
          </li>

          <li className="list-group-item">
            <h4>
              <span className="badge badge-warning">Email: </span> {email}
            </h4>
          </li>

          <li className="list-group-item">
            <h6>
              <span className="badge badge-danger">Your Are Admin</span> 
                
            </h6>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title="Welcome To Admin Panel" className="container bg-info p-3">
      <div className="row">
        <div className="col-3">{AdminLeftSide()}</div>
        <div className="col-9">{AdminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
