import React, { useState } from 'react';
import pizzaLogo from '../../assets/logo-removebg-preview.png';
import "./Navbar.css";
import { IoSearch, IoCart } from "react-icons/io5";


const Navbar = () => {
    const [Menu, setMenu] = useState('Home')


  return (
    <div className='Navbar'>
        <img src={pizzaLogo} alt="Logo" className='Logo' />
        <ul className='Navbar-Menu'>
            <li onClick={() => setMenu("Home")} className={Menu === "Home" ? "hover" : "" }>Home</li>
            <li onClick={() => setMenu("Menu")} className={Menu === "Menu" ? "active" : "" }>Menu</li>
            <li onClick={() => setMenu("Order Online")} className={Menu === "Order Online" ? "active" : "" }>Order Online</li>
            <li onClick={() => setMenu("About Us")} className={Menu === "About Us" ? "active" : "" }>About Us</li>
            <li onClick={() => setMenu("Specials")} className={Menu === "Specials" ? "active" : "" } >Specials</li>
            <li onClick={() => setMenu("Locations")} className={Menu === "Locations" ? "active" : "" }>Locations</li>
            <li onClick={() => setMenu("Account")} className={Menu === "Account" ? "active" : "" }>Account</li>
            <li onClick={() => setMenu("Cart")} className={Menu === "Cart" ? "active" : "" }>Cart</li>
            <li onClick={() => setMenu("Contct Us")} className={Menu === "Contact Us" ? "active" : "" }>Contact Us</li>
        </ul>
        <div className="Navbar-right">
            <IoSearch />
            <div className="Navbar-cart">
                <IoCart />
            </div>
            <div className="Navbar-signin">
                <button>Sign up</button>
                <button>Log in</button>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar;






