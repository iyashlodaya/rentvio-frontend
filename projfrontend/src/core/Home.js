import React from "react";
import "../styles.css";
import Base from "./Base";
import photo from "../images/unsplash.jpg"
import couchPhoto from "../images/couch.jpg"
import Categories from "./Categories";

const Home = () => {
  const products = [1, 2, 3,4,5,6,7,8];
  return (
    <Base>
      <div className="container">
        <div className="row">
          <div className="col p-0">
            <img
              src={photo}
              alt="..."
              className="rounded img-fluid w-100"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>

          <Categories/>

        <div className="randomProducts row">
          {products.map((product, index) => {
            return (
              <div className="col m-0 p-0 text-center d-flex justify-content-center">
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
                      class="btn btn-outline-primary"
                    >
                      View More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
