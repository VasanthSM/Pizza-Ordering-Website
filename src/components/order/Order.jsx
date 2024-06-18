import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Order.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const { reorder } = useContext(StoreContext);
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

  const handleReorder = async (order) => {
    try {
      const response = await axios.get(`http://localhost:5000/order/${order.id}`);
      const orderDetails = response.data;
      reorder(orderDetails.cartItems); 
      navigate(`/order`, { state: { userDetails: orderDetails.userDetails, totalAmount: orderDetails.totalAmount } });
    } catch (error) {
      console.error('Error fetching order details for reorder:', error);
    }
  };

  const renderPizzaDetails = (pizza) => {
    if (!pizza) return null;

    if (pizza.name) {
      return (
        <>
          <strong>Name: </strong>{pizza.customizations}, 
          <t/> <strong>Base: </strong> {pizza.name.base},
          <t/> <strong>Size: </strong> {pizza.name.size},
          <t/> <strong>Toppings: </strong> {pizza.name.toppings},
        </>
      );
    } else if (pizza.customizations && pizza.customizations.length > 0) {
      const custom = pizza.customizations[0];
      return (
        <>   <strong>Name: </strong> {`Customized Pizza`},
          <t/> <strong>Base: </strong> {custom.base},
          <t/> <strong>Size: </strong> {custom.size},
          <t/> <strong>Toppings: </strong> {custom.toppings},
        </>
      );
    } 
  };

  const getOrderStatus = (order) => {
    const orderTime = new Date(order.order_time);
    const currentTime = new Date();
    const updatedtime = (currentTime - orderTime) / (1000 * 60);

    if (updatedtime <= 15) {
      return 'Preparing';
    } else if (updatedtime > 15) {
      return 'Out of Delivery';
    } else if (updatedtime >= 25 && updatedtime <= 45) {
      return 'Delivered';
    } else {
      return 'Delivered to Customer'; 
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
            <p><strong>Order Time: </strong> {new Date(order.order_time).toLocaleString()}</p>
            <p><strong>Total Amount: </strong> ${order.total_amount}</p>

            <p><strong>Ordered Items List: </strong></p>
            <ul className='OrderedItems'>
              {JSON.parse(order.cartItems).map((item, i) => (
                <li key={i}>
                  <strong>ID:</strong> {Object.keys(item).join(', ')}
                  <ul className='OrderPizzaList'>
                    <br />
                    {Object.values(item).map((pizza, j) => (
                      <li key={j} className='idKey'>
                        {renderPizzaDetails(pizza)}
                        <strong> Price: </strong> ${pizza.price},
                        <strong> Quantity: </strong> {pizza.quantity}
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
