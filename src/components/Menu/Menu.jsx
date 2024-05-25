import React from 'react';
import "./Menu.css";
import {menu_list} from "../../assets/assets"

const Menu = () => {
  return (
    <div className='Menu' id="menulist">
        <h1>Explore our Menu</h1>
        <p className='menu-text'>Welcome to Pizza Man! Dive into our delicious menu filled with a variety of pizzas crafted to satisfy every palate. From our classic Margherita with fresh basil and mozzarella to the meat-packed delight of our Pepperoni Paradise, there's something for everyone. Prefer something unique? Create your own pizza with our selection of fresh toppings, sauces, and cheeses. Don’t forget to try our tasty appetizers, savory pasta dishes, and irresistible desserts. Wash it all down with our refreshing drinks, including sodas, iced teas, and a selection of beers and wines. Explore our menu and find your new favorite today!</p>
        <div className="menu-list">
            {menu_list.map((item,value)=>{
                return(
                    <div key={value} className="menulist-item">
                        <img src={item.menu_image}  alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default Menu