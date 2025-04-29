import React, { useContext, useEffect, useState } from 'react';
import { CartProductContext } from '../components/CartProductContext';
import { toast } from 'react-toastify';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartProductContext);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Product Added to Cart', {
      autoClose: 2000,
      style: {
        marginTop: '20px',
      },
    });
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <h2 className="heading">
        Welcome Back, <span className="username">{user?.username || 'User'}</span>
      </h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">&#8377;{product.price}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
