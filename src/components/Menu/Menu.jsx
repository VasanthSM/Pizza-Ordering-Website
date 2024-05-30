import React, { useState } from 'react';
import './Menu.css';
import { menu_list } from '../../assets/assets';
import FoodDisplay from '../FoodDisplay/FoodDisplay';

const Menu = ({ searchQuery }) => {
  const [category, setCategory] = useState('All');

  const handleMenuItemClick = (menuItem) => {
    setCategory(menuItem);
  };

  const isMenuPage = window.location.pathname === '/menu';
  const DisplayFoodDisplay = isMenuPage && category !== 'All';

  return (
    <div className="Menu" id="menulist">
      <h1>Explore our Menu</h1>
      <p className="menu-text">
        Welcome to Pizza Man! Dive into our delicious menu filled with a variety of pizzas crafted to satisfy every
        palate. From our classic Margherita with fresh basil and mozzarella to the meat-packed delight of our Pepperoni
        Paradise, there's something for everyone. Prefer something unique? Create your own pizza with our selection of
        fresh toppings, sauces, and cheeses. Explore our menu and find your new favorite today!
      </p>
      <div className="menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() => handleMenuItemClick(item.menu_name)}
            key={index}
            className="menulist-item"
          >
            <img className={category === item.menu_name ? 'hover' : ''} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      {DisplayFoodDisplay && <FoodDisplay category={category} searchQuery={searchQuery} />}
      <hr />
    </div>
  );
};

export default Menu;
