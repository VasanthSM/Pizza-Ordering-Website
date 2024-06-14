import React from 'react';
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <CgProfile className='profile' />
    </div>
  )
}

export default Navbar