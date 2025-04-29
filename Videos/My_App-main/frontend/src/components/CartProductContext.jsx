import React, { createContext, useState } from "react";
import Swal from 'sweetalert2';

export const CartProductContext = createContext();

export const CartProductProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);


  const addToCart = (product) => {
    setCartProducts((prevProducts) => [...prevProducts, product]);
  };
  const proceedCheckOutHandler = async (formData) => {
    const BASE_URL = 'http://localhost:5000/api/auth';
        
    const payloadArray = formData.map((item) => ({
      name: item.title,
      description: item.description,
      quantity: item.quantity || 1,
    }));
  
  
    try {
      const response = await fetch(`${BASE_URL}/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ products: payloadArray }),  
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire("Order Placed Successfully");
        clearCartProducts();
      } else {
        Swal.fire("Failed to place order", result.error || result.message || "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Network Error", error.message, "error");
    }
  };
  
  

  const updateQuantity = (productId, amount) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      )
    );
  };


  const removeFromCart = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
  const clearCartProducts = () => {
    setCartProducts([]);
  };

  return (
    <CartProductContext.Provider
      value={{
        cartProducts,
        proceedCheckOutHandler,
        setCartProducts,
        updateQuantity,
        addToCart,
        removeFromCart,
        clearCartProducts,
      }}
    >
      {children}
    </CartProductContext.Provider>
  );
};
