import React from "react";
import "../styles.css";
import Base from "./Base";
import photo from "../images/unsplash.jpg"
import couchPhoto from "../images/couch.jpg"
const Home = () => {
  const categories = [1,2,3,4,5,6];
  const products = [1, 2, 3,4,5,6];
  return (
    <Base>
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              src={photo}
              alt="..."
              className="rounded img-fluid w-100"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="p-3 categories row">
          {categories.map((category, index) => {
            return (
              <div className="col">
                <div
                  className="card text-dark"
                  style={{ width: "9rem", height: "6rem" }}
                >{category.name}</div>
              </div>
            );
          })}
        </div>

        <div className="p-5 randomProducts row">
          {
            products.map((product,index)=>{
              return (
                <div className="col mb-5">
                  <div className="card" style={{width:"18rem", height:"25rem"}}>
                    <img className="card-img-top" src={couchPhoto} alt="Card imagecap"  />
                    <div className="card-body text-dark">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="https://www.google.com" class="btn btn-outline-primary">View More</a>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </Base>
  );
};

export default Home;
