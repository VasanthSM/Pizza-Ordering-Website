import React, { useContext, useState } from 'react';
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeCart } = useContext(StoreContext);
  const [selectedSize, setSelectedSize] = useState('medium'); 

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleCustomize = () => {
    console.log("Customize button clicked!");
  };

  return ( 
    <div className='food-item'>
      <div className="fooditem-image-container">
        <img className='fooditem-image' src={image} alt={name} />
        {!cartItems[id]
          ? <img className='additem' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='Add' />
          : (
            <div className='food-item-counter'>
              <img className='icon-green' onClick={() => addToCart(id)} src={assets.add_icon_green} alt='Add' />
              <p className='item-count'>{cartItems[id]}</p>
              <img className='icon-red' onClick={() => removeCart(id)} src={assets.remove_icon_red} alt='Remove' />
            </div>
          )
        }
      </div>
      <div className="fooditem-info">
        <div className="fooditem-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating Stars" />
        </div>
        <p className="fooditem-desc">{description}</p>
        <p className="fooditem-price">₹ {price}</p>
        <div className="fooditem-options">
          <label className='select' htmlFor="size-select">Select size: </label>
          <select id="size-select" value={selectedSize} onChange={handleSizeChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <button className="customize-btn" onClick={handleCustomize}>Customizable</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
