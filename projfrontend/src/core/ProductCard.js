import React from "react";
import { Link, useHistory } from "react-router-dom";

function ProductCard({productInfo}) {
  const history = useHistory();
  return (
    <div
      className="text-center me-5"
      id="product-card"
      style={{ width: "16rem" }}
    >
      <img
        id="product-image"
        src={productInfo.productImageLink}
        style={{
          width: "16rem",
          height: "18rem",
          objectFit: "cover",
          borderRadius: "2%",
        }}
      />
      <div className="product-body d-flex justify-content-between pt-3">
        <div className="d-flex flex-column text-start">
        <p id="product-name" style={{fontSize: "14px", margin: 0, fontWeight:"500"}}>
          {productInfo.productName}
        </p>
        <p id="product-price" style={{fontSize: "12px", fontWeight:"500"}}>
          {`₹ ${productInfo.productPrice}/mo`}
        </p>
        </div>
        <button id="add-to-cart-btn" className="btn text-center" onClick={()=>{history.push(`/product/${productInfo.productId}`, productInfo)}}>
          <span style={{fontSize: "14px"}}>Rent <i className="ps-1 fa fa-shopping-bag fa-sm"></i></span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
