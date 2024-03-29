import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from "./components/CartContext";
import App from "./App";

ReactDOM.render(
    <GoogleOAuthProvider clientId="280716700998-sa9hrnfkv3iicik2vlvo3acle3aeh0gm.apps.googleusercontent.com">
        <React.StrictMode>
            <CartProvider>
            <App></App>
            </CartProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>, document.getElementById("root")
);
