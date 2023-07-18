import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashboard = () => {
  return (
  <Base navbar={true} footer={true}>
    <div style={{height: '386px'}}></div>
    {performRedirect()}
  </Base>
  );
};

const performRedirect = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/home" />;
  }
};

export default UserDashboard;
