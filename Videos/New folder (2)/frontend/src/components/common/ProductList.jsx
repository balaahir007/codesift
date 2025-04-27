import React, { useEffect, useState } from 'react';
import { useCart } from '../CartProductContext'; 
import './ProductList.css';
import {toast,ToastContainer} from 'react-toastify'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const capitalizeUserName = (text)=>{
    if(!text)return;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const handleAddToCart = (product)=>{
    addToCart(product)
    toast.success('Product Added to Cart',{
        position : 'top-center'
    })
  }


  let user = JSON.parse(localStorage.getItem('user'))   
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);
  console.log(user);
  

  return (
    <div className="container">
      <h2 className="heading">Welcome Back, <span className="username">{ capitalizeUserName(user?.username) ||'Username'}</span></h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)} 
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
