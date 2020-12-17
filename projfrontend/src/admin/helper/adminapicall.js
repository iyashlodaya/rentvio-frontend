import { API } from "../../backend";

// Create A Category
export const createCategory = (userId, token, categoryName) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryName),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR" + err);
    });
};

// Get All Categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR" + err);
    });
};

// Create Product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR" + err);
    });
};

//  Get All Products
export const getAllProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR" + err);
    });
};

// Get a Single Product
export const getProduct = (productId) => {
  // /product/:productid
  return fetch(`${API}/product/${productId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR" + err);
    });
};

// Update Product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR" + err);
    });
};

// Delete Product
export const deteleProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR" + err);
    });
};
