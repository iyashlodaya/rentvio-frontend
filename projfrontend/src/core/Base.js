import React from "react";
import CustomNavBar from "./CustomNavBar";
import Footer from "./footer";


const Base = ({
  children,
  navbar,
  footer
}) => {
  // console.log('BASE: Props: Navbar', navbar)
  // console.log('BASE: Props: footer', footer)
  return (
    <div>
      {navbar && <CustomNavBar/>}
      <div className={className}>{children}</div>
      {footer && <Footer />}
    </div>
  );
};

export default Base;
