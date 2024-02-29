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

    const response = await axios.get(API_URL);

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

    const response = await axios.get(API_URL);

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

    const response = await axios.get(API_URL);

    if(!response) {
      console.log('No Response recieved from fetch Products by Category ID API!');
    }
    return response.data;
  } catch (error) {
    console.log('Error occured in fetching Products by Category ID!', error);
  }
}

export const payDeposit = async (cartItems, totalMonthlyRentToBePaidEveryMonth, totalRefundableDeposit) => {
  try {

    const API_URL = `${process.env.REACT_APP_BACKEND}/pay/deposit`;

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const response = await axios.post(API_URL, {
      user_id: jwt.user._id,
      cart_items: cartItems,
      total_monthly_rent_to_be_paid: totalMonthlyRentToBePaidEveryMonth,
      total_refundable_deposit: totalRefundableDeposit
    });
    console.log('response from pay deposit api!', response);
    return response;
  }
  catch (error) {
    console.log('error occured in pay deposit api!', error);
    // return error;
  }
}

export const createOrder = async (cartItems, totalMonthlyRentToBePaidEveryMonth, totalRefundableDeposit) => {
  try {

    const API_URL = `${process.env.REACT_APP_BACKEND}/orders/create`;

    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const response = await axios.post(API_URL, {
      user_id: jwt.user._id,
      cart_items: cartItems,
      total_monthly_rent_to_be_paid: totalMonthlyRentToBePaidEveryMonth,
      total_refundable_deposit: totalRefundableDeposit
    });
    console.log('response from create order api!', response);
    return response;
  }
  catch (error) {
    console.log('error occured in create order api!', error);
    // return error;
  }
}