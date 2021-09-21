import React from "react";
import Footer from "./footer";
import NavBar from "./navbar";


const Base = ({
  className = "bg-dark p-5 text-white",
  children,
}) => {
  return (
    <div>
      <NavBar />
      <div className={className}>{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
