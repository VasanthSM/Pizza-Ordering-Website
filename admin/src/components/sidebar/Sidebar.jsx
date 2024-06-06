import React from 'react';
import { IoAddCircle, IoListCircleSharp } from "react-icons/io5";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import "./Sidebar.css";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
            <IoAddCircle className='icons' />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
            <IoListCircleSharp className='icons' />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
            <MdOutlineBookmarkBorder className='icons' />
                <p>Orders</p>
            </NavLink>
        </div>

    </div>
  )
}

export default Sidebar