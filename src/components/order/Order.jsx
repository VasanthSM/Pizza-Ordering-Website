import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userEmailid = localStorage.getItem('Email:');
    console.log(userEmailid)
    if (userEmailid) {
      setUserEmail(userEmailid);
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
          console.log("Fetchorders:",response.data)
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }
  }, [userEmail]);

  return (
    <div className='order'>
      <h1>Previous Orders</h1>
      {orders.map((order) => (
        order.email === userEmail && (
          <div key={order.id} className="order-details">
            <p><strong>Order Id: {order.id}</strong></p>
            <p><strong>Emailid: {order.email}</strong></p>
            <p><strong>Order Time:</strong> {new Date(order.order_time).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ${order.total_amount}</p>
            <p><strong>Ordered-Items:</strong></p>
            <ul className='OrderedItems'>
              {Array.isArray(JSON.parse(order.cartItems)) && JSON.parse(order.cartItems).map((item, i) => (
                <li key={i}>
                  ID: {Object.keys(item).join(', ')}
                  <ul className='OrderPizzaList'>
                    {Object.values(item).map((pizza, j) => (
                      <li key={j} className='idKey'>
                        <strong>Name:</strong> {Array.isArray(pizza.customizations) ? pizza.customizations.join(', ') : "Customized Pizza"},
                        {pizza.name && pizza.name.base && <><strong>Base:</strong> {pizza.name.base}, </>}
                        {pizza.name && pizza.name.size && <><strong>Size:</strong> {pizza.name.size}, </>}
                        {pizza.name && pizza.name.toppings && <><strong>Toppings:</strong> {pizza.name.toppings}, </>}
                        <strong>Price:</strong> ${pizza.price}, 
                        <strong>Quantity:</strong> {pizza.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button className='PlaceOrder'>Re-Order</button>
            <hr className='Line' />
          </div>
        )
      ))}
    </div>
  );
};

export default Order;
