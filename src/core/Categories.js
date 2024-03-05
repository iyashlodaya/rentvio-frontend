import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "./helper/coreapicalls";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    // console.log(category.id);
    navigate(`/products/${category.id}`);
  };

  return (
    <div
      className="text-center"
      onClick={() => {
        handleClick(category);
      }}
      style={{ marginRight: "29px", width: "12rem" }}
    >
      <img
        alt="category-pic"
        className="d-block w-100"
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          opacity: 1,
          height: "8rem",
          objectFit: "cover",
          cursor: "pointer",
        }}
        src={category.imageLink}
      ></img>
      <p className="mt-2" style={{ fontSize: "14px", cursor: "pointer" }}>
        {category.name}
      </p>
    </div>
  );
};

const Categories = () => {

  const [categoriesData, setCategories] = useState([]);

  useEffect(()=>{
    fetchCategories().then((response) => {
      // console.log('response in useEffect ->', response);
      setCategories(response);
    })
    .catch((err)=>{
      // console.log('error in useEffect ->', err)
    });
  },[]);

  return (
    <div className="d-flex justify-content-center pt-4 pb-4">

      {categoriesData.map((category, index) => {
        return (
          <CategoryCard category={category} key={index}></CategoryCard>
        )
      })}
    </div>
  );
};

export default Categories;
