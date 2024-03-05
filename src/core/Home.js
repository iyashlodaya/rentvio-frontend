import React, { useEffect, useRef, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Categories from "./Categories";
import { Carousel } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { isAuthenticated } from "../auth/helper";
import { Navigate } from "react-router-dom";
import { fetchAllProducts } from "./helper/coreapicalls";

const carousalImages = {
  imageOne: 'https://images.unsplash.com/photo-1594614271360-0ed9a570ae15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  imageTwo: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  imageThree: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1109&q=80',
}

const renderCarousalForHeroSection = () => {
  return (
    <Carousel style={{overflow: "hidden", borderRadius: "1rem"}}>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={carousalImages.imageOne}
          alt="First slide"
          style={{ height: "500px", objectFit: "cover" }}
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={carousalImages.imageTwo}
          alt="Second slide"
          style={{ height: "500px", objectFit: "cover" }}
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={carousalImages.imageThree}
          alt="Third slide"
          style={{ height: "500px", objectFit: "cover" }}
        />
      </Carousel.Item>
    </Carousel>
  )
}

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

const Home = () => {
  const scroll = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [scrolled, setScrollEnd] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const slide = (shift) => {
    scroll.current.scrollLeft += shift;
    setScrollValue(scrollValue + shift);

    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
      scroll.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const handleScroll = () => {
    setScrollValue(scroll.current.scrollLeft);
    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
      scroll.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };
  /* const products = [
    {
      productId: 101,
      categoryId:'living-room',
      priceId: "price_1Nhx9bSG0YDsYJkoZCHtktJz",
      productName: "Orange Chair",
      productRent: 499,
      productRefundableDeposit: (499*1.5),
      productImageLink:
        "https://images.unsplash.com/photo-1506332088442-9e0024864f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      productId: 102,
      categoryId:'bedroom',
      productName: "Bed and Mattress",
      productRent: 595,
      productRefundableDeposit: (595*1.5),
      productImageLink:
        "https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productId: 103,
      categoryId:'living-room',
      priceId: "price_1NhxAKSG0YDsYJkolGT9yrk5",
      productName: "Yellow Sofa Set",
      productRent: 1499,
      productRefundableDeposit: (1499*1.5),
      productImageLink:
        "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80",
    },
    {
      productId: 104,
      categoryId:'kitchen',
      productName: "Table & Chair Set",
      productRent: 899,
      productRefundableDeposit: (899*1.5),
      productImageLink:
        "https://images.pexels.com/photos/271696/pexels-photo-271696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productId: 105,
      categoryId:'kitchen',
      productName: "Vintage Refrigerator",
      productRent: 650,
      productRefundableDeposit: (650*1.5),
      productImageLink:
        "https://images.pexels.com/photos/2962002/pexels-photo-2962002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productId: 106,
      categoryId:'work-from-home',
      productName: "Laptop",
      productRent: 1000,
      productRefundableDeposit: (1000*1.5),
      productImageLink:
        "https://images.pexels.com/photos/5793953/pexels-photo-5793953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productId: 107,
      categoryId:'kitchen',
      productName: "Dining Table Set",
      priceId: 'price_1NiFiwSG0YDsYJkodOQOGszR',
      productRent: 899,
      productRefundableDeposit: (899*1.5),
      productImageLink:
        "https://images.pexels.com/photos/932095/pexels-photo-932095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productId: 108,
      categoryId:'kitchen',
      productName: "Coffee Maker",
      priceId: 'price_1NiFjVSG0YDsYJkoAoDPcKjk',
      productRent: 250,
      productRefundableDeposit: (250*1.5),
      productImageLink:
        "https://images.unsplash.com/photo-1565452344518-47faca79dc69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
  ]; */
  
  useEffect(() => {
    fetchAllProducts()
      .then((response) => {
        // console.log("Response fetchAllProducts: useEffect ->", response);
        setProducts(response);
      })
      .catch((error) => {
        // console.log("Error occured in fetchAllProducts", error);
      });
  }, []);

  return (
    <Base navbar={true} footer={true} >
      <div className="container">
          <div className="row">
            <div className="col p-0">
              {renderCarousalForHeroSection()}
            </div>
          </div>

          <div className="text-center pt-4">
            <h2 style={{color:'#101721'}}>Browse by category</h2>
            <h4 style={{color:'#8D8E91', fontWeight: '300'}}>Furniture rentals for your home and office.</h4>
          </div>
          <Categories/>

          <div className="d-flex justify-content-between">
              <h4 style={{color:'#101721'}}>Modern furniture right at your doorstep!</h4>
              <div>
                <button id="nav-btn" className="btn" onClick={()=>{slide(-50)}}><i className="fa fa-angle-left"></i></button>
                <button id="nav-btn" className="btn" onClick={()=>slide(+50)}><i className="fa fa-angle-right"></i></button>
              </div>
          </div>
          <div ref={scroll} onScroll={handleScroll} className="product-section pt-4">
            { products.map((product, index) => {
              return (
                <ProductCard productInfo={product} setLoading={setLoading} key={index}/>
              );
            })}
          </div>
        </div>
      {performRedirect()}
      {/* {setLoading(true)} */}
      {/* Render the loading spinner if isLoading is true */}
      {isLoading && <LoadingSpinner />}
      

    </Base>
  );
};

const performRedirect = () => {
  if (isAuthenticated()) {
    return <Navigate to="/home" />;
  }
};

export default Home;
