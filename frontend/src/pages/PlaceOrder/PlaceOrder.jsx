import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { getTotalAmount, cartItems, url } = useContext(StoreContext);
  console.log(cartItems)
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails: initialUserDetails, totalAmount: initialTotalAmount } = location.state || {};

  const [userDetails, setUserDetails] = useState(initialUserDetails || {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    district: '',
    state: '',
    zipCode: '',
    mobileNumber: ''
  });

  const [product, setProduct] = useState({
    name: "Order Bill",
    price: (initialTotalAmount || getTotalAmount() + 10) * 100,
    productBy: "PizzaMan"
  });

  const [itemNames, setItemNames] = useState([]);

  useEffect(() => {
    if (initialTotalAmount) {
      setProduct({
        ...product,
        price: initialTotalAmount * 100
      });
    }
    
    axios.get(`${url}/data`)
      .then(response => {
        const items = response.data; 
        const names = items.map(item => item.name);
        setItemNames(names);
      })
      .catch(error => {
        console.error('Error fetching item names:', error);
      });

  }, [initialTotalAmount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const makePayment = async (token) => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };
    try {
      const response = await axios.post(`${url}/payment`, body, { headers });
      await handlePlaceOrder(response.data);
    } catch (err) {
      alert('Payment Error: ' + err.message);
    }
  };

  const handlePlaceOrder = async (paymentData) => {
    toast.success("Order Placed Successfully");
    navigate('/');
    
    let orderDetails = {
      userDetails,
      paymentData,
      totalAmount: initialTotalAmount || getTotalAmount() + 10,
      cartItems,
      itemNames, 
      orderTime: new Date().toISOString()
    };
    
    try {
      const response = await axios.post(`${url}/order`, orderDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201) {
        console.log("Order Placed");
      } else {
        toast.error("Unsuccessful Order Placed, Try Again");
      }
    } catch (err) {
      alert('Order Placement Error: ' + err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-orderleft">
        <p className='title'> Delivery Details</p>
        <div className="customer-information">
          <input type="text" name="firstName" placeholder='First Name' required value={userDetails.firstName} onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder='Last Name' required value={userDetails.lastName} onChange={handleInputChange} />
        </div>
        <input type="email" name="email" placeholder='Email-Id' required value={userDetails.email} onChange={handleInputChange} />
        <input type="text" name="street" placeholder='Street' required value={userDetails.street} onChange={handleInputChange} />
        <div className="customer-information">
          <input type="text" name="city" placeholder='City' required value={userDetails.city} onChange={handleInputChange} />
          <input type="text" name="district" placeholder='District' required value={userDetails.district} onChange={handleInputChange} />
        </div>
        <div className="customer-information">
          <input type="text" name="state" placeholder='State' required value={userDetails.state} onChange={handleInputChange} />
          <input type="text" name="zipCode" placeholder='Zip-code' required value={userDetails.zipCode} onChange={handleInputChange} />
        </div>
        <input type="text" name="mobileNumber" placeholder='Mobile Number' required value={userDetails.mobileNumber} onChange={handleInputChange} />
      </div>

      <div className="place-orderright">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{initialTotalAmount || getTotalAmount() + 10}</p>
            </div>
            <hr />
          </div>
          <div className='place-order-btns'>
            <StripeCheckout 
              stripeKey='pk_test_51PP2O1P4F4f9DURgoFjirdlr3H6V15vGHaLtUT0V3GmvR9CXiwWwR5hpZLq3KEgpQoi0ujh7gmalw9j05ihSQAws00SssTTTLT' 
              name='Order' 
              amount={(initialTotalAmount || getTotalAmount() + 10) * 100} 
              token={makePayment}
              currency='INR'>
              <button type='submit'>Place Order</button>
            </StripeCheckout>
            <Link className='backToHome' to='/'>Back</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
