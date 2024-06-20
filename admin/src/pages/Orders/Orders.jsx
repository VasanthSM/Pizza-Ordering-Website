import React, { useEffect, useState} from 'react';
import axios from 'axios';
import "./Orders.css"


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [itemData, setItemData] = useState({});

  const url ="https://pizzaman-backend.onrender.com"
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/order`);
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchItemData = async () => {
      try {
        const response = await axios.get(`${url}/data`);
        setItemData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchOrders();
    fetchItemData();
  }, []);

  const renderPizzaDetails = (pizza) => {
    if (pizza.name) {
      return (
        <>
          <t/> <strong>Name:</strong> {pizza.customizations[0]},
          <t/> <strong>Base:</strong> {pizza.name.base},
          <t/> <strong>Size:</strong> {pizza.name.size},
          <t/> <strong>Toppings:</strong> {pizza.name.toppings},
        </>
      );
    } else if (pizza.customizations && pizza.customizations.length > 0) {
      const custom = pizza.customizations[0];
      return (
        <>
          <t/> <strong>Name:</strong> {`Customized Pizza`}, 
          <t/> <strong>Base:</strong> {custom.base},
          <t/> <strong>Size:</strong> {custom.size},
          <t/> <strong>Toppings:</strong> {custom.toppings},
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
      <h1>Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-details">
          <p><strong>OrderId: {order.id}</strong></p>
          <p><strong>Username: </strong> {order.first_name}.{order.last_name}</p>
          <p><strong>Order Time: </strong> {new Date(order.order_time).toLocaleString()}</p>
          <p><strong>Total Amount: </strong> ${order.total_amount}</p>
          <p><strong>Address: </strong> {order.street}, {order.city}, {order.district}, {order.state}, {order.zip_code}</p>
          <p><strong>Mobile Number: </strong> {order.mobile_number}</p>
          <p><strong>Ordered-Items: </strong></p>
          <ul className='OrderedItems'>
              {JSON.parse(order.cartItems).map((item, i) => (
                <li key={i}>
                  <strong>ID:</strong> {Object.keys(item).join(', ')}
                  <ul className='OrderPizzaList'>
                    {Object.values(item).map((pizza, j) => (
                      <li key={j} className='idKey'>
                        {renderPizzaDetails(pizza)}
                        <strong>Price: </strong> ${pizza.price}, 
                        <strong>Quantity: </strong> {pizza.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className='orderStatus'>
                <p>{getOrderStatus(order)}</p>
            </div>
          <hr className='Line' />
        </div>
      ))}
    </div>
  );
};

export default Orders;
