import React, { useState, useRef, useEffect } from 'react';
import pizzaLogo from '../../assets/logo-removebg-preview.png';
import './Navbar.css';
import { IoSearch, IoCart, IoLogOut, IoBag } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import Cart from '../../pages/Cart/Cart';

const Navbar = ({ onSearch }) => {
    const [menu, setMenu] = useState('Home');
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [isCartVisible, setCartVisible] = useState(false);
    const cartRef = useRef(null);
    const navigate = useNavigate('');
    const token = document.cookie;

    const toggleCartVisibility = () => {
        setCartVisible(!isCartVisible);
    };

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    const displayNavbar = !['/signup', '/login', ].includes(location.pathname);

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

    const logout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 2024 00:00:00 UTC;';
        navigate('/');
    };

    return (
        <>
            {displayNavbar && (
                <div className='Navbar'>
                    <Link to='/'><img src={pizzaLogo} alt='Logo' className='Logo' /></Link>
                    <ul className='Navbar-Menu'>
                        <Link to='/' onClick={() => setMenu('Home')} className={`${menu === 'Home' ? 'active' : ''} link-hover`}>Home</Link>
                        <Link to='/menu' id='menu' onClick={() => setMenu('Menu')} className={`${menu === 'Menu' ? 'active' : ''} link-hover`}>Menu</Link>
                        <Link to='/about'id='about' onClick={() => setMenu('About Us')} className={`${menu === 'About Us' ? 'active' : ''} link-hover`}>About Us</Link>
                        <Link to='/specials' id='specials' onClick={() => setMenu('TodaySpecial')} className={`${menu === 'TodaySpecial' ? 'active' : ''} link-hover`}>Today's Special</Link>
                        <Link to='/account' onClick={() => setMenu('Account')} className={`${menu === 'Account' ? 'active' : ''} link-hover`}>Account</Link>
                        <Link to='/contact' id='contactus' onClick={() => setMenu('Contact Us')} className={`${menu === 'ContactUs' ? 'active' : ''} link-hover`}>Contact Us</Link>
                    </ul>
                    <div className='Navbar-right'>
                        {location.pathname === '/' && ( 
                            <div className='Navbar-search'>
                                <IoSearch onClick={toggleSearch} />
                                {searchVisible && (
                                    <input
                                        type='text'
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder='Search your pizza here...'
                                        className='Navbar-search-input'
                                    />
                                )}
                            </div>
                        )}
                        <div className='Navbar-cart' ref={cartRef}>
                            <IoCart onClick={toggleCartVisibility} />
                        </div>

                        {!token ? <div className='Navbar-signin'>
                            <Link to='/signup' className='Navbar-signin-link'>Sign up</Link>
                            <Link to='/login' className='Navbar-signin-link navbar-login-button'>Log in</Link>
                        </div> : <div className='Navbar-profile'>
                            <CgProfile className='profile-icon' />
                            <ul className="nav-profile">
                                <Link to='orderlist'><li><IoBag className='icons' /><p>Orders</p></li></Link>
                                <hr />
                                <li onClick={logout}><IoLogOut className='icons' /><p>Logout</p></li>
                            </ul>
                        </div>
                        }
                    </div>
                    {isCartVisible && <Cart />}
                </div>
            )}
        </>
    );
};

export default Navbar;
