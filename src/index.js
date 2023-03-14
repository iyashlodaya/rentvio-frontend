import React from "react";
import Routes from "./Routes";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
    <GoogleOAuthProvider clientId="280716700998-sa9hrnfkv3iicik2vlvo3acle3aeh0gm.apps.googleusercontent.com">
        <React.StrictMode>
            <Routes></Routes>
        </React.StrictMode>
    </GoogleOAuthProvider>, document.getElementById("root")
);
