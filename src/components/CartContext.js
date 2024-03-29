import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (item) => {

    const isItemPresentInCart = cartItems.some(
      (cartItem) =>
        cartItem.productInfo.productId ===
        item.productInfo.productId
    );

    if (isItemPresentInCart) {
      // console.log("Item Already Present In the cart!!");
    } 
    else {
      let updatedProductCart = [...cartItems, item];
      setCartItems(updatedProductCart);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
