import React from 'react';
import "./Footer.css";
import pizzaLogo from '../../assets/logo-removebg-preview.png';
import { assets } from '../../assets/assets';
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='logo' src={pizzaLogo} alt=""  />
            <h2 className=''>About Us</h2>
            <p className='paragarph' id='paragarph'>Welcome to Pizza Man, your ultimate destination for delicious pizzas! At Pizza Man, we take pride in offering a wide variety of mouthwatering pizzas to satisfy every craving.</p>
            <p>Our menu features an extensive selection of pizzas, including classic favorites like Margherita, Pepperoni, and Hawaiian, as well as gourmet options for the more adventurous pizza lovers. Whether you prefer a veggie-packed delight or a meaty extravaganza, we've got you covered!</p>
            <p>At Pizza Man, quality is our top priority. We use only the finest ingredients to create our pizzas, ensuring that each bite is a burst of flavor. Whether you dine in, take out, or order delivery, we guarantee a delicious and satisfying experience every time.</p>
            <p>Thank you for choosing Pizza Man. We look forward to serving you!</p>
            <div className="footer-social-icons">
                <FaTwitter className='icons1' />
                <FaFacebook className='icons2'  />
                <FaWhatsapp className='icons3' />
            </div>

        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
                <li>Contact us</li>
            </ul>
        </div>
        <div className="footer-content-right" id='footer-content-right'>
            <h2>Get in Touch</h2>
            <ul>
                <li>+91-6372167453</li>
                <li>info@pizzaman.com</li>
            </ul>     
        </div>
      </div>
      <hr />
      <p className="footer-copyrights">All Copyrights &copy; 2024 Pizza Man. All rights reserved</p>
    </footer>
  );
};

export default Footer;
