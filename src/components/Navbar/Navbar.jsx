import React, { useState } from 'react';
import pizzaLogo from '../../assets/logo-removebg-preview.png';
import './Navbar.css';
import { IoSearch, IoCart } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../../pages/Cart/Cart';

const Navbar = ({ onSearch }) => {
    const [menu, setMenu] = useState('Home');
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [isCartVisible, setCartVisible] = useState(false);

    const toggleCartVisibility = () => {
        setCartVisible(!isCartVisible);
    };

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    // Determine whether to display the navbar based on the current route
    const displayNavbar = !['/signup', '/login'].includes(location.pathname);

    return (
        <>
            {displayNavbar && (
                <div className='Navbar'>
                    <Link to='/'><img src={pizzaLogo} alt='Logo' className='Logo' /></Link>
                    <ul className='Navbar-Menu'>
                        <Link to='/' onClick={() => setMenu('Home')} className={menu === 'Home' ? 'hover' : ''}>Home</Link>
                        <Link to='/menu' onClick={() => setMenu('Menu')} className={menu === 'Menu' ? 'active' : ''}>Menu</Link>
                        <Link to='/about' onClick={() => setMenu('About Us')} className={menu === 'About Us' ? 'active' : ''}>About Us</Link>
                        <Link to='/specials' onClick={() => setMenu('Specials')} className={menu === 'Specials' ? 'active' : ''}>Today's Special</Link>
                        <Link to='/account' onClick={() => setMenu('Account')} className={menu === 'Account' ? 'active' : ''}>Account</Link>
                        <Link to='/contact' onClick={() => setMenu('Contact Us')} className={menu === 'Contact Us' ? 'active' : ''}>Contact Us</Link>
                    </ul>
                    <div className='Navbar-right'> 
                        <div className='Navbar-search'>
                            <IoSearch onClick={toggleSearch} />
                            {searchVisible && (
                                <input 
                                    type='text' 
                                    value={searchQuery} 
                                    onChange={handleSearchChange} 
                                    placeholder='Search...' 
                                    className='Navbar-search-input'
                                />
                            )}
                        </div>
                        <div className='Navbar-cart'>
                            <IoCart onClick={toggleCartVisibility} />
                        </div>
                        <div className='Navbar-signin'>
                            <Link to='/signup' className='Navbar-signin-link'>Sign up</Link>
                            <Link to='/login' className='Navbar-signin-link'>Log in</Link>
                        </div>
                    </div>
                    {isCartVisible && <Cart />} {/* Conditionally render the Cart component */}
                </div>
            )}
        </>
    );
};

export default Navbar;
