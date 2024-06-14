import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmailId = localStorage.getItem('Email:');
    if (userEmailId) {
      setUserEmail(userEmailId);
    } else {
      console.error('User email not found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/order?email=${userEmail}`);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }
  }, [userEmail]);

  const handleReorder = (order) => {
    navigate(`/order`, { state: { totalAmount: order.total_amount } });
  };

  const renderPizzaDetails = (pizza) => {
    if (pizza.name) {
      return (
        <>
          <strong>Base:</strong> {pizza.name.base}, 
          <strong>Size:</strong> {pizza.name.size}, 
          <strong>Toppings:</strong> {pizza.name.toppings}, 
        </>
      );
    } else {
      const custom = pizza.customizations[0];
      return (
        <>
          <strong>Base:</strong> {custom.base}, 
          <strong>Size:</strong> {custom.size}, 
          <strong>Toppings:</strong> {custom.toppings}, 
        </>
      );
    }
  };

  const getOrderStatus = (order) => {
    const orderTime = new Date(order.order_time);
    const currentTime = new Date();
    const elapsedMinutes = (currentTime - orderTime) / (1000 * 60); 

    if (elapsedMinutes <= 15) {
      return 'Preparing';
    } else if (elapsedMinutes > 15 && elapsedMinutes <= 25) {
      return 'Out of Delivery';
    } else if (elapsedMinutes > 25 && elapsedMinutes <= 60) {
      return 'Delivered';
    } else {
      return 'Unknown'; 
    }
  };

  return (
    <div className='order'>
      <h1>Previous Orders</h1>
      {orders.map((order) => (
        order.email === userEmail && (
          <div key={order.id} className="order-details">
            <p><strong>Order Id: {order.id}</strong></p>
            <p><strong>Email: {order.email}</strong></p>
            <p><strong>Order Time:</strong> {new Date(order.order_time).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ${order.total_amount}</p>
            <p><strong>Ordered Items:</strong></p>
            <ul className='OrderedItems'>
              {JSON.parse(order.cartItems).map((item, i) => (
                <li key={i}>
                  <strong>ID:</strong> {Object.keys(item).join(', ')}
                  <ul className='OrderPizzaList'>
                    {Object.values(item).map((pizza, j) => (
                      <li key={j} className='idKey'>
                        {renderPizzaDetails(pizza)}
                        <strong>Price:</strong> ${pizza.price}, 
                        <strong>Quantity:</strong> {pizza.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div>
              <button
                className={`PlaceOrder ${order.total_amount}`}
                onClick={() => handleReorder(order)}
              >
                Re-Order
              </button>
              <div className='orderStatus'>
                <p>{getOrderStatus(order)}</p>
              </div>
            </div>
            <hr className='Line' />
          </div>
        )
      ))}
    </div>
  );
};

export default Order;
