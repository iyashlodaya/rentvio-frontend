import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./pages/home/Home";
import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/Signup";
import ProductPage from "./pages/product/ProductPage";
import Cart from "./pages/cart/Cart";
import ProductList from "./pages/products-list/ProductsList";
import OrdersPage from "./pages/orders/OrdersPage";
import PaymentSuccessPage from "./pages/payment-success/PaymentSuccessPage";

//components
import ScrollToTop from "./components/ScrollToTop";


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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
