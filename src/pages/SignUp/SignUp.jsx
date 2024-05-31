import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <main className='signin-head'>
            <div className="Signup">
            <form onSubmit={handleSubmit} className="signup-container">
                <div className="signup-content">
                    <h2>Sign Up</h2>
                </div>
                <div className="signup-input">
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        placeholder='Enter your Name..'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter your Email..'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter your Password..'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className='checkbox-content'>
                    <input className='checkbox' type="checkbox" required />
                    <label className='Policy'><p>By continuing, I agree to the use of privary & Policy</p></label>
                </div>
                <div className='account'>
                    <p> Already have an account? <Link className='Clicking' to='/login'>Login here</Link></p>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </main>
    );
};

export default SignUp;
