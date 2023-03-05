import React from "react";
import "../styles.css";
import Base from "./Base";
import photo from "./couch.jpg"
import couchPhoto from "./unsplash.jpg"
import Categories from "./Categories";
import { Carousel } from "react-bootstrap";

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
  // const products = [1, 2, 3,4,5,6,7,8];
  return (
    <Base navbar={true} footer={false} className="pt-1">
      <div className="container">
        <div className="row">
          <div className="col p-0">
            {renderCarousalForHeroSection()}
            {/* <img
              src={photo}
              alt="..."
              className="rounded img-fluid w-100"
              style={{ height: "500px", objectFit: "cover" }}
            /> */}
          </div>
        </div>

          {/* <Categories/> */}

        {/* <div className="randomProducts row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col m-0 p-0 text-center d-flex justify-content-center">
                <div className="card m-2" style={{ width: "16rem" }}>
                  <img
                    className="card-img-top"
                    src={couchPhoto}
                    alt="Card imagecap"
                  />
                  <div className="card-body text-dark">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">₹550</p>
                    <a
                      href="https://www.google.com"
                      className="btn btn-outline-primary"
                    >
                      View More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </Base>
  );
};

export default Home;
