import React from 'react';
import { FaBed, FaChair, FaCouch, FaLaptop, FaMobileAlt, FaTv } from 'react-icons/fa';

const CategoryCard = ({children,categoryName="Chairs"}) => {
    return (
      <div className="col card mt-4 mb-4 mr-2 p-0" style={{ height: "8rem" }}>
        <div className="card-image-top text-dark">
          <span 
            style={{
              position: "absolute",
              top: "25%",
              left: "40%",
              fontSize: "2rem",
            }}
          >
              {children}
          </span>
        </div>
        <div class="card-body">
        <p style={{textAlign:"center", marginTop:"64px", fontSize:"14px"}}>{categoryName}</p>
        </div>
      </div>
    );
}
 
class Categories extends React.Component {
    render() { 
        return <div className="categories row">
            <>
            <CategoryCard categoryName={"Chairs"}>{<FaChair/>}</CategoryCard>
            <CategoryCard categoryName={"Sofa Set"}>{<FaCouch/>}</CategoryCard>
            <CategoryCard categoryName={"Beds"}>{<FaBed/>}</CategoryCard>
            <CategoryCard categoryName={"Electronics"}>{<FaMobileAlt/>}</CategoryCard>
            <CategoryCard categoryName={"Laptops"}>{<FaLaptop/>}</CategoryCard>
            <CategoryCard categoryName={"Television"}>{<FaTv/>}</CategoryCard>
            </>
        </div>;
    }
}
 
export default Categories;