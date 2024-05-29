import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { MdCancel } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeCart, getTotalAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path is '/order'
  const isOrderPath = location.pathname === '/order';

  // If on the order path, don't render the cart
  if (isOrderPath) {
    return null;
  }

  return (
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
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeCart(item._id)}><MdCancel className='cancel' /></p>
                </div>
                <hr />
              </div>
            );
          }
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
  );
};

export default Cart;
