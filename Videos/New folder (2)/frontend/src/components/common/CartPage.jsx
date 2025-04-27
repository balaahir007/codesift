import React, { useState } from "react";
import { useCart } from "../CartProductContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  const [cartData, setCartData] = useState(cart);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const proceedAddToCart = () => {
    setShowSuccessMessage(true);
    setCartData([]);
  };

  const calculateTotal = () => {
    return cartData
      .reduce((total, product) => total + product.price, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Cart</h2>
      {cartData.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartData.map((product, index) => (
            <div key={index} className="cart-item">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{product.title}</h3>
                <p className="cart-item-description">{product.description}</p>
                <span className="cart-item-price">${product.price}</span>
                <button
                  className="remove-from-cart-btn"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message">
          <p>Product is Delivered Soon...!</p>
        </div>
      )}

      {cartData.length > 0 && (
        <div className="cart-summary">
          <h3 className="total-price">
            Total: <span className="price">${calculateTotal()}</span>
          </h3>
          <button className="checkout-btn" onClick={proceedAddToCart}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
