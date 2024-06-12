import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import Customize from '../Customize/Customize';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeCart, url } = useContext(StoreContext);
  const [showCustomize, setShowCustomize] = useState(false);
  const [customization, setCustomization] = useState(null);

  const toggleCustomize = () => {
    setShowCustomize(!showCustomize);
  };

  const handleCustomizationChange = (customizationDetails) => {
    setCustomization(customizationDetails);
  };
  

  const handleAddToCart = () => {
    if (!customization) {
      addToCart(id, price, name,{ base: 'Default Base', size: 'Medium', toppings: 'No toppings' });
    } else {
      addToCart(id, customization.price, {
        base: customization.base.name,
        size: customization.size.name,
        toppings: customization.toppings.map(topping => topping.name).join(', ')
      });
      setShowCustomize(false); 
    }
  };

  return (
    <div className="food-item">
      <div className="fooditem-image-container">
        <img className="fooditem-image" src={`${url}/uploads/${image}`} alt={name} />
        {!cartItems[id] ? (
          <img className="additem" onClick={handleAddToCart} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className="food-item-counter">
            <img className="icon-green" onClick={handleAddToCart} src={assets.add_icon_green} alt="Add" />
            <p className="item-count">{cartItems[id].quantity}</p>
            <img className="icon-red" onClick={() => removeCart(id)} src={assets.remove_icon_red} alt="Remove" />
          </div>
        )}
      </div>
      <div className="fooditem-info">
        <div className="fooditem-rating">
          <p>{name}</p>
          <img className='rating' src={assets.rating_starts} alt="Rating Stars" />
        </div>
        <p className="fooditem-desc">{description}</p>
        <p className="fooditem-price">₹ {price}</p>
        
        <div className="fooditem-options">
          <button className="customize-btn" onClick={toggleCustomize}>Customize</button>
          {showCustomize && <Customize onAddToCart={handleCustomizationChange} />}
          <p className='fooditem-id'> ID: {id}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;