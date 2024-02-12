import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Base from "./Base";
import ProductCard from "./ProductCard";
import { LoadingSpinner } from "./Home";
import { fetchProductsByCategoryId } from "./helper/coreapicalls";

function ProductList() {
  const { categoryId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [productsAsPerCategory, setProductsAsPerCategory] = useState([]);

  useEffect(()=> {
    fetchProductsByCategoryId(categoryId).then((response) => {
      console.log('this is cateogory: ->', categoryId);
      console.log('fetchProductsByCategoryID: => useEffect', response);
      setProductsAsPerCategory(response);
    })
    .catch((error) => {
      console.log('useEffect: fetchProductsByCategoryId', error);
    })
  }, [])

  return (
    <Base navbar={true} footer={true}>
      <div className="container">
        <div className="product-list-container">
          <div className="sidebar">
            <Typography
              variant="caption"
              sx={{ marginBottom: 2 }}
              fontSize={16}
            >
              Filters
            </Typography>
            <Typography variant="h6" fontSize={14}>
              Price
            </Typography>
            <FormGroup>
              <FormControlLabel
                style={{ fontSize: "12px" }}
                control={<Checkbox size="small" style={{ color: '#5271FF' }} />}
                label={<span style={{ fontSize: 14 }}>Above ₹2000</span>}
              />
              <FormControlLabel
                style={{ fontSize: "12px" }}
                control={<Checkbox size="small" style={{ color: '#5271FF' }} />}
                label={<span style={{ fontSize: 14 }}>₹1500 - ₹2000</span>}
              />
              <FormControlLabel
                style={{ fontSize: "12px" }}
                control={<Checkbox size="small" style={{ color: '#5271FF' }} />}
                label={<span style={{ fontSize: 14 }}>₹500 - ₹1500</span>}
              />
            </FormGroup>
            <Typography sx={{ marginTop: 2 }} variant="h6" fontSize={14}>
              Product Type
            </Typography>
            <FormGroup id="product-type-form-group">
              <FormControlLabel
                style={{ fontSize: "12px" }}
                control={<Checkbox size="small" style={{ color: '#5271FF' }} />}
                label={<span style={{ fontSize: 14 }}>Bed</span>}
              />
              <FormControlLabel
                style={{ fontSize: "12px" }}
                control={<Checkbox size="small" style={{ color: '#5271FF' }} />}
                label={<span style={{ fontSize: 14 }}>Dressing</span>}
              />
              <FormControlLabel
                style={{ fontSize: "12px" }}
                control={<Checkbox size="small" style={{ color: '#5271FF' }} />}
                label={<span style={{ fontSize: 14 }}>Mattress</span>}
              />
            </FormGroup>
          </div>
          <div className="product-list">
            <div className="product-grid">
              {/* Product cards */}
              {productsAsPerCategory.map((product, index) => (
                <ProductCard productInfo={product} setLoading={setLoading} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
    </Base>
    
  );
}

export default ProductList;