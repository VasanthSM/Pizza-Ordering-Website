import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Orders.css"

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order');
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchItemData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        setItemData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchOrders();
    fetchItemData();
  }, []);

  return (
    <div className='order'>
      <h1>Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-details">
          <p><strong>OrderId: {order.id}</strong></p>
          <p><strong>Username:</strong> {order.first_name} {order.last_name}</p>
          <p><strong>Order Time:</strong> {new Date(order.order_time).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> ${order.total_amount}</p>
          <p><strong>Address:</strong> {order.street}, {order.city}, {order.district}, {order.state}, {order.zip_code}</p>
          <p><strong>Mobile Number:</strong> {order.mobile_number}</p>
          <p><strong>Ordered-Items:</strong></p>
          <ul className='OrderedItems'>
          {Array.isArray(JSON.parse(order.cartItems)) && JSON.parse(order.cartItems).map((item, i) => (
                <li key={i}>
                  (ID: {Object.keys(item).join(', ')})
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
          <hr className='Line' />
        </div>
      ))}
    </div>
  );
};

export default Orders;
