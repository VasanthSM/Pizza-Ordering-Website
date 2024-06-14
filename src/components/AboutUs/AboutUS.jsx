import React from 'react';
import "./AboutUs.css"

const AboutUS = () => {
  return (
    <div className='about'>
        <h1>About Us</h1>
        <p>Welcome to Pizza Man, your ultimate destination for delicious pizzas! At Pizza Man, we take pride in offering a wide variety of mouthwatering pizzas to satisfy every craving.</p>
        <p>Our menu features an extensive selection of pizzas, including classic favorites like Margherita, Pepperoni, and Hawaiian, as well as gourmet options for the more adventurous pizza lovers. Whether you prefer a veggie-packed delight or a meaty extravaganza, we've got you covered!</p>
        <p>At Pizza Man, quality is our top priority. We use only the finest ingredients to create our pizzas, ensuring that each bite is a burst of flavor. Whether you dine in, take out, or order delivery, we guarantee a delicious and satisfying experience every time.</p>
        <p>Thank you for choosing Pizza Man. We look forward to serving you!</p>  


        <div className='Contact'>
        <h2>Get in Touch</h2>
            <ul>
                <li>Mobile No: +91-6372167453</li>
                <li>Emailid: info@pizzaman.com</li>
            </ul> 
        </div> 
    </div>
  )
}

export default AboutUS