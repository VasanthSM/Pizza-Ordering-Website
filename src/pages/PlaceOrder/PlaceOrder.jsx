import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { getTotalAmount, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "Order Bill",
    price: (getTotalAmount() + 10) * 100,
    productBy: "PizzaMan"
  });
  const [userDetails, setUserDetails] = useState({
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
      const response = await axios.post('http://localhost:5000/payment', body, { headers });
      console.log(response);
      await handlePlaceOrder(token, response.data);
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Payment Error: ' + err.message);
    }
  };

  const handlePlaceOrder = async (paymentData) => {
    let orderDetails = {
      userDetails,
      paymentData,
      totalAmount: getTotalAmount() + 10,
      cartItems,
      orderTime: new Date().toISOString()
    };
    const combinedData = JSON.stringify(orderDetails);
    try {
      console.log('Placing order:', combinedData);
      const response = await axios.post('http://localhost:5000/order', combinedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.data.status===200){
        toast.success("Order Placed Successfully");
        navigate('/');
      }else{
        toast.error("UnSuccessful Order Placed, Try Again")
      }
    }catch (err) {
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
          <input type="text" name="firstName" placeholder='First Name' required onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder='Last Name' required onChange={handleInputChange} />
        </div>
        <input type="email" name="email" placeholder='Email-Id' required onChange={handleInputChange} />
        <input type="text" name="street" placeholder='Street' required onChange={handleInputChange} />
        <div className="customer-information">
          <input type="text" name="city" placeholder='City' required onChange={handleInputChange} />
          <input type="text" name="district" placeholder='District' required onChange={handleInputChange} />
        </div>
        <div className="customer-information">
          <input type="text" name="state" placeholder='State' required onChange={handleInputChange} />
          <input type="text" name="zipCode" placeholder='Zip-code' required onChange={handleInputChange} />
        </div>
        <input type="text" name="mobileNumber" placeholder='Mobile Number' required onChange={handleInputChange} />
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
              <p>{getTotalAmount() + 10}</p>
            </div>
            <hr />
          </div>
          <div className='place-order-btns'>
            <StripeCheckout 
              stripeKey='pk_test_51PP2O1P4F4f9DURgoFjirdlr3H6V15vGHaLtUT0V3GmvR9CXiwWwR5hpZLq3KEgpQoi0ujh7gmalw9j05ihSQAws00SssTTTLT' 
              name='Order' 
              amount={(getTotalAmount() + 10) * 100} 
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
