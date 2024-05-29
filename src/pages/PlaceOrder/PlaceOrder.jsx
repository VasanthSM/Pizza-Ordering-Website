import React, { useContext } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';


const PlaceOrder = () => {
  const {getTotalAmount} = useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-orderleft">
        <p className='title'> Delivery Details</p>
        <div className="customer-information">
          <input type="text" placeholder='First Name' required />
          <input type="text" placeholder='Last Name' required />
        </div>
        <input type="email" placeholder='Email-Id' required />
        <input type="text" placeholder='Street'required />
        <div className="customer-information">
          <input type="text" placeholder='City' required />
          <input type="text" placeholder='District'required />
        </div>
        <div className="customer-information">
        <input type="text" placeholder='State' required />
          <input type="text" placeholder='Zip-code' required />
          
        </div>
        <input type="text" placeholder='Mobile Number' required/>
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
          <button>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder