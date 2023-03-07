import React, { useRef, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Categories from "./Categories";
import { Carousel } from "react-bootstrap";
import ProductCard from "./ProductCard";

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

const Home = () => {
  const scroll = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

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
  const products = [
    {
      productName: "Orange Chair",
      productPrice: '₹ 499/mo.',
      productImageLink:
        "https://images.unsplash.com/photo-1506332088442-9e0024864f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      productName: "Bed and Mattress",
      productImageLink:
        "https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productName: "Yellow Sofa Set",
      productImageLink:
        "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80",
    },
    {
      productName: "Table & Chair Set",
      productImageLink:
        "https://images.pexels.com/photos/271696/pexels-photo-271696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productName: "Vintage Refrigerator",
      productImageLink:
        "https://images.pexels.com/photos/2962002/pexels-photo-2962002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productName: "Laptop",
      productImageLink:
        "https://images.pexels.com/photos/5793953/pexels-photo-5793953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productName: "Dining Table Set",
      productImageLink:
        "https://images.pexels.com/photos/932095/pexels-photo-932095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      productName: "Coffee Maker",
      productImageLink:
        "https://images.unsplash.com/photo-1565452344518-47faca79dc69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
  ];
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
                <ProductCard productInfo={product} key={index}/>
              );
            })}
          </div>
        </div>
    </Base>
  );
};

export default Home;
