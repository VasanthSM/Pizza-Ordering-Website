import React, { useState, useRef, useEffect } from 'react';
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
    const cartRef = useRef(null);

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

   
    const displayNavbar = !['/signup', '/login'].includes(location.pathname);


    useEffect(() => {
        const handleClickOutside = (event) => {
          if (isCartVisible && cartRef.current && !cartRef.current.contains(event.target) && !event.target.closest('.cart')) {
            setCartVisible(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isCartVisible]);
    
    
    return (
        <>
            {displayNavbar && (
                <div className='Navbar'>
                    <Link to='/'><img src={pizzaLogo} alt='Logo' className='Logo' /></Link>
                    <ul className='Navbar-Menu'>
                        <Link to='/' onClick={() => setMenu('Home')} className={`${menu === 'Home' ? 'active' : ''}link-hover`}>Home</Link>
                        <Link to='/menu' onClick={() => setMenu('Menu')} className={`${menu === 'Menu' ? 'active' : ''}link-hover`}>Menu</Link>
                        <Link to='/about' onClick={() => setMenu('About Us')} className={`${menu === 'About Us' ? 'active' : ''}link-hover`}>About Us</Link>
                        <Link to='/specials' onClick={() => setMenu('TodaySpecial')} className={`${menu === 'TodaySpecial' ? 'active' : ''}link-hover`}>Today's Special</Link>
                        <Link to='/account' onClick={() => setMenu('Account')} className={`${menu === 'Account' ? 'active' : ''}link-hover`}>Account</Link>
                        <Link to='/contact' onClick={() => setMenu('Contact Us')} className={`${menu === 'Contact Us' ? 'active' : ''}link-hover`}>Contact Us</Link>
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
                        <div className='Navbar-cart' ref={cartRef}>
                            <IoCart onClick={toggleCartVisibility} />
                        </div>
                        <div className='Navbar-signin'>
                            <Link to='/signup' className='Navbar-signin-link'>Sign up</Link>
                            <Link to='/login' className='Navbar-signin-link'>Log in</Link>
                        </div>
                    </div>
                    {isCartVisible && <Cart />} 
                </div>
            )}
        </>
    );
};

export default Navbar;
