import axios from "axios";
import API from "../../backend";

export const createSubscriptions = async (cartItems) => {
  try {
    const response = await fetch(`${API}/create-subscription`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
      }),
    });

    console.log('response create subscription ->', response );

    return await response.json();
 
  } catch (error) {
    console.log("Error occured in creating subscription API", error);
  }
}

export const fetchCategories = async () => {
  try {
    const API_URL = `${process.env.REACT_APP_BACKEND}/categories`;

    const jwt = JSON.parse(localStorage.getItem('jwt'));


    const response = await axios.get(API_URL, {headers: {Authorization: `Bearer ${jwt.token}`}});

    if(!response) {
      console.log('No Response recieved from fetch Categories API!');
    }
    return response.data;
  } catch (error) {
    console.log('Error occured in fetching categories!', error);
  }
}

export const fetchAllProducts = async () => {
  try {
    const API_URL = `${process.env.REACT_APP_BACKEND}/products`;

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const response = await axios.get(API_URL, {headers: {Authorization: `Bearer ${jwt.token}`}});

    if(!response) {
      console.log('No Response recieved from fetch Products API!');
    }
    return response.data;
  } catch (error) {
    console.log('Error occured in fetching Products!', error);
  }
}

export const fetchProductsByCategoryId = async (categoryId) => {
  try {
    const API_URL = `${process.env.REACT_APP_BACKEND}/products/${categoryId}`;

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const response = await axios.get(API_URL, {headers: {Authorization: `Bearer ${jwt.token}`}});

    if(!response) {
      console.log('No Response recieved from fetch Products by Category ID API!');
    }
    return response.data;
  } catch (error) {
    console.log('Error occured in fetching Products by Category ID!', error);
  }
}