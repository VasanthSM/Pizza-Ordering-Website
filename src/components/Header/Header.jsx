import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='Header'>
        <div className="Header-content">
            <h1>Welcome to <br /> <div className='span'> Pizza Man</div></h1>
            <h3>Delicious Pizza, Just a Click Away!</h3>
            <span>At Pizza Man, located in the heart of Hyderabad, we're dedicated to serving you the finest pizzas crafted from fresh, locally-sourced ingredients. Whether you're in the mood for a classic Margherita, a hearty Meat Lover's, or a gourmet specialty pizza, we've got something to satisfy every craving.</span>
            <Link to='/Menu' className='Menu' >View Menu</Link>
        </div>
    </div>
  )
}

export default Header