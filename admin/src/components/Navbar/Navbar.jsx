import React from 'react';
import "./Navbar.css";
import { FaUserLarge } from "react-icons/fa6";
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <FaUserLarge className='profile' />
    </div>
  )
}

export default Navbar
