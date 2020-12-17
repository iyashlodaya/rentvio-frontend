import React from "react";
import Footer from "./footer";
import NavBar from "./navbar";

const Base = ({
  title = "Base Component",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <NavBar />
      <h2 className="text-center text-white">{title}</h2>
      <div className={className}>{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
