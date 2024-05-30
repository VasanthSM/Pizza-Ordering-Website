import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { MdCancel } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeCart, getTotalAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();


  const displayCart = !['/order'].includes(location.pathname)
  return (
    <>
    {displayCart  && (
      <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          const cartItem = cartItems[item._id];
          if (cartItem && cartItem.quantity > 0) {
            return (
              <div key={index}>
                <div className='cart-items-item'>
                  <img src={item.image} alt="" />
                  <div>
                    <p>{item.name}</p>
                    {cartItem.customization && (
                      <div>
                        <p>Base: {cartItem.customization.base}</p>
                        <p>Size: {cartItem.customization.size}</p>
                        <p>Toppings: {cartItem.customization.toppings}</p>
                      </div>
                    )}
                  </div>
                  <p>₹{cartItem.price}</p>
                  <p>{cartItem.quantity}</p>
                  <p>₹{cartItem.price * cartItem.quantity}</p>
                  <p onClick={() => removeCart(item._id)}><MdCancel className='cancel' /></p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalAmount() === 0 ? 0 : getTotalAmount() + 10}</p>
            </div>
            <hr />
          </div>
          <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
    
    )}
    </>
  );
};

export default Cart;
