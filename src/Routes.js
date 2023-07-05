import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import Profile from "./user/Profile";

import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ProductPage from "./user/ProductPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <Route path={`/product`} component={ProductPage} />
        <Route path="/product/:productId" component={ProductPage} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute exact path="/admin/create/category" component={AddCategory} />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
