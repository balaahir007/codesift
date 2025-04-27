import React, { useState } from "react";
import ProductList from "../components/common/ProductList";
import Navbar from "../components/common/Navbar";

const HomePage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
