import React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <div className='Header'>
        <div className="Header-content">
            <h1>Welcome to <br /> <span> Pizza Man</span></h1>
            <h3>Delicious Pizza, Just a Click Away!</h3>
            <p>At Pizza Man, located in the heart of Hyderabad, we're dedicated to serving you the finest pizzas crafted from fresh, locally-sourced ingredients. Whether you're in the mood for a classic Margherita, a hearty Meat Lover's, or a gourmet specialty pizza, we've got something to satisfy every craving.</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header