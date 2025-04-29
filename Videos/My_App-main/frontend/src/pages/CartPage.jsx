import React, { useContext } from 'react';
import { CartProductContext } from '../components/CartProductContext'; 
import './CartPage.css'; 
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';  

const CartPage = () => {
  const { cartProducts, setCartProducts, removeFromCart,proceedCheckOutHandler, clearCartProducts } = useContext(CartProductContext); 
  const navigate = useNavigate(); 

 

  const handleIncrement = (productId) => {
    const updatedProducts = cartProducts.map(product =>
      product.id === productId
        ? { ...product, quantity: (product.quantity || 1) + 1 }
        : product
    );
    setCartProducts(updatedProducts);
  };

  const handleDecrement = (productId) => {
    const updatedProducts = cartProducts.map(product =>
      product.id === productId
        ? { ...product, quantity: Math.max(1, (product.quantity || 1) - 1) }
        : product
    );
    setCartProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      const quantity = product.quantity || 1;
      return total + product.price * quantity;
    }, 0).toFixed(2);
  };

  const handleAddMore = () => {
    navigate('/');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Shopping Cart</h2>

      {cartProducts.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Start adding products!</p>
      ) : (
        <div className="cart-items">
          {cartProducts.map((product) => (
            <div key={product.id} className="cart-item">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{product.title}</h3>
                <p className="cart-item-description">{product.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div >
                    <button style={{cursor: 'pointer'}} onClick={() => handleDecrement(product.id)}>-</button>
                    <span style={{ margin: '0 10px' }}>{product.quantity || 1}</span>
                    <button style={{cursor: 'pointer'}} onClick={() => handleIncrement(product.id)}>+</button>
                  </div>
                  <button
                    className="remove-from-cart-btn"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <MdDelete className='remove-icon' />
                  </button>
                </div>

                <span className="cart-item-price">
                  &#8377; {(product.price * (product.quantity || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartProducts.length > 0 && (
        <div className="cart-summary">
          <h3 className="total-price">
            Total: <span className="price">&#8377; {calculateTotal()}</span>
          </h3>
          <button className="checkout-btn" onClick={()=>proceedCheckOutHandler(cartProducts)}>
            Proceed to Checkout
          </button>
        </div>
      )}

      <button className="add-more-btn" onClick={handleAddMore}>
        Add More Products
      </button>
    </div>
  );
};

export default CartPage;
