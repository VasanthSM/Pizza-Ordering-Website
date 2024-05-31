import React, { useState } from 'react';
import { pizzaBases, sizes, toppings } from '../../assets/assets'; 
import './Customize.css';

const Customize = ({ onAddToCart }) => {
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleBaseChange = (base) => {
    setSelectedBase(base);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleToppingChange = (topping) => {
    const index = selectedToppings.findIndex((t) => t.name === topping.name);
    if (index === -1) {
      setSelectedToppings([...selectedToppings, topping]);
    } else {
      const newToppings = [...selectedToppings];
      newToppings.splice(index, 1);
      setSelectedToppings(newToppings);
    }
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    if (selectedBase) {
      totalPrice += selectedBase.price;
    }
    if (selectedSize) {
      totalPrice += selectedSize.price;
    }
    selectedToppings.forEach((topping) => {
      totalPrice += topping.price;
    });
    return totalPrice;
  };

  const handleConfirm = () => {
    const customizationDetails = {
      base: selectedBase || pizzaBases[0], 
      size: selectedSize || sizes[0], 
      toppings: selectedToppings,
      price: getTotalPrice(),
    };
    onAddToCart(customizationDetails);
  };


  return (
    <div className="pizza-customize">
      <h2>Customize Your Pizza</h2>
      <div className="customize-section">
        <h3>Base:</h3>
        <div className="options">
          {pizzaBases.map((base, index) => (
            <button
              key={index}
              onClick={() => handleBaseChange(base)}
              className={selectedBase === base ? 'selected' : ''}
            >
              {base.name} - ₹{base.price}
            </button>
          ))}
        </div>
      </div>
      <div className="customize-section">
        <h3>Size:</h3>
        <div className="options">
          {sizes.map((size, index) => (
            <button
              key={index}
              onClick={() => handleSizeChange(size)}
              className={selectedSize === size ? 'selected' : ''}
            >
              {size.name} - ₹{size.price}
            </button>
          ))}
        </div>
      </div>
      <div className="customize-section">
        <h3>Toppings:</h3>
        <div className="options2">
          {Object.keys(toppings).map((toppingType, index) => (
            <div key={index}>
              <h4>{toppingType}</h4>
              {toppings[toppingType].map((topping, idx) => (
                <button
                  key={idx}
                  onClick={() => handleToppingChange(topping)}
                  className={selectedToppings.find((t) => t.name === topping.name) ? 'selected' : ''}
                >
                  {topping.name} - ₹{topping.price}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="total-price">
        <h3>Total Price: ₹{getTotalPrice()}</h3>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Customize;