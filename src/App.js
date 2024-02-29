import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./core/Home";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";

import ProductPage from "./user/ProductPage";
import Cart from "./core/Cart";
import UserDashboard from "./user/UserDashBoard";
import ProductList from "./core/ProductsList";
import ScrollToTop from "./core/ScrollToTop";
import OrdersPage from "./user/OrdersPage";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccessPage from "./core/PaymentSuccessPage";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/login" element={<SignIn/>} />
        <Route path={`/product`} element={<ProductPage/>} />
        <Route path="/product/:productId" element={<ProductPage/>} />
        <Route path="/products/:categoryId" element={<ProductList/>} />
        <Route path="/cart" element={<Cart stripePromise={stripePromise}/>} />
        <Route path="/user/orders" element={<OrdersPage/>} />
        <Route path="/user/payment-success" element={<PaymentSuccessPage/>} />
        <Route exact path="/user/dashboard" element={<UserDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
