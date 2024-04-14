import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../utils/coreapicalls";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    // console.log(category.id);
    navigate(`/products/${category.id}`);
  };

  return (
    <div
      id="category-image-container"
      className="text-center"
      onClick={() => {
        handleClick(category);
      }}
    >
      <img
        id="category-pic"
        alt="category-pic"
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
    <div className="pt-4 pb-4" id="categories">

      {categoriesData.map((category, index) => {
        return (
          <CategoryCard category={category} key={index}></CategoryCard>
        )
      })}
    </div>
  );
};

export default Categories;
