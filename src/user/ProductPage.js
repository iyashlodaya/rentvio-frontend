import { Slider } from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../core/Base";

import "./css/product-page.css";
import { Alert } from "react-bootstrap";
import { CartContext } from "../core/CartContext";


const marks = [
  {
    value: 3,
    label: "3+",
  },
  {
    value: 6,
    label: "6+",
  },
  {
    value: 9,
    label: "9+",
  },
  {
    value: 12,
    label: "12+",
  },
];

const productSubImagesArray = [1, 2, 3];

function ProductPage() {
  const history = useHistory();
  const productInfo = history.location.state;
  const [showAlert, setShowAlert] = useState(false);
  const [message, setAlertMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const {addToCart} = useContext(CartContext); 

  const showAlertWithTimeout = (message) => {
    setShowAlert(true);
    setAlertMessage(message);

    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage("");
    }, 2000);
  };

  const handleAddToCart = (productInfo, selectedTenure, updatedProductRent) => {
    const currentSelectProduct = {
      productInfo: productInfo,
      selectedTenure,
      updatedProductRent,
    };

    let productCartArray = [];
    productCartArray.push(currentSelectProduct);
    setCartItems(productCartArray);
    addToCart(currentSelectProduct);
    showAlertWithTimeout("Item Added To Cart.");
  };

  const [productRent, setProductRent] = useState(productInfo.productRent);
  const [rentTenure, setRentTenure] = useState(3);
  const convertMonthlyPriceAccordingToSelectedMonths = (e) => {
    const selectedMonth = e.target.value;
    if (selectedMonth === 3) {
      setRentTenure(selectedMonth);
      setProductRent(Math.trunc(productInfo.productRent));
    } else if (selectedMonth === 6) {
      setRentTenure(selectedMonth);
      setProductRent(Math.trunc(productInfo.productRent - 25));
    } else if (selectedMonth === 9) {
      setRentTenure(selectedMonth);
      setProductRent(Math.trunc(productInfo.productRent - 50));
    } else if (selectedMonth === 12) {
      setRentTenure(selectedMonth);
      setProductRent(Math.trunc(productInfo.productRent - 100));
    } else {
      console.log("Something Went Wrong!");
    }
  };

  return (
    <Base navbar={true} cartItems={cartItems} footer={true}>
      <div
        id="alert-container"
        className="d-flex justify-content-center align-items-center"
      >
        <Alert
          show={showAlert}
          style={{ width: 300, display: "flex", justifyContent: "center" }}
          key={"primary"}
          variant={"primary"}
        >
         {message}
        </Alert>
      </div>

      <div className="container d-flex" style={{ height: "max-content" }}>
        <div id="product-left-section">
          <img id="product-main-image" alt="product" src={productInfo.productImageLink} />
          <div id="sub-images-section">
            {productSubImagesArray.map((image, index) => {
              return (
                <img
                  className="product-sub-image"
                  key={index}
                  alt="product-secondary"
                  style={{ borderRadius: "8px" }}
                  src={productInfo.productImageLink}
                />
              );
            })}
          </div>
        </div>
        <div id="product-right-section">
          <h4 id="product-name">{productInfo.productName}</h4>
          <p id="product-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            accusamus animi reprehenderit lorem aseq accusamus animi
            reprehenderit.
          </p>
          {/*  <div id="menu-header">
            <p style={{ fontSize: 12, fontWeight: "500", margin:0 }}>{`Select (Type / Color)`}</p>
            <p style={{ fontSize: 12, fontWeight: "500", margin:0 }}>{<i className="fa fa-info-circle"></i>}</p>
          </div>
          <div id="menu-items">
            <div
              className="color-menu-item selected-menu-item"
              style={{backgroundColor: "orange"}}>
              {""}
            </div>
            <div
              className="color-menu-item"
              style={{backgroundColor: "coral"}}>
              {""}
            </div>
            <div
              className="color-menu-item"
              style={{backgroundColor: "maroon"}}>
              {""}
            </div>
            <div
              className="color-menu-item"
              style={{backgroundColor: "pink"}}>
              {""}
            </div>
          </div> */}
          <div id="menu-header">
            <p
              style={{ fontSize: 12, fontWeight: "500", margin: 0 }}
            >{`Choose Tenure (In months)`}</p>
            <p style={{ fontSize: 12, fontWeight: "500", margin: 0 }}>
              {<i className="fa fa-info-circle"></i>}
            </p>
          </div>
          <div id="slider-bar-section">
            <Slider
              style={{ color: "#5271FF" }}
              aria-label="Always visible"
              defaultValue={3}
              step={3}
              marks={marks}
              min={3}
              max={12}
              onChange={convertMonthlyPriceAccordingToSelectedMonths}
            />
          </div>
          <div id="price-section">
            <div>
              <h6>Monthly Rent</h6>
              <p>{`₹ ${productRent}/mo `}</p>
            </div>
            <div className="vertical-line"></div>
            <div>
              <h6>Refundale Deposit</h6>
              <p>{`₹ ${Math.trunc(productInfo.productRefundableDeposit)}`}</p>
            </div>
          </div>
          <div id="offer-section">
            <p>Offers</p>
            <p>
              <strong>FREEDEL</strong>: Get free delivery for your rented items.
            </p>
            <p>
              <strong>RENT15</strong>: Get 15% off for first month.
            </p>
          </div>
          <button
            id="add-to-cart-btn"
            onClick={() => {
              handleAddToCart(productInfo, rentTenure, productRent);
            }}
            className="btn w-100 mt-3"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Base>
  );
}

export default ProductPage;
