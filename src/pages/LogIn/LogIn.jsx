import React, { useState } from 'react';
import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/login', values);
            if (res.status === 200) {
                localStorage.setItem("Email:",values.email)
                document.cookie = `token=${res.data.token}; path=/; max-age=${2 * 24 * 60 * 60}`; 
                navigate('/');
            }
        } catch (error) {
            alert("Password and userMailid does not match, Try again later");
        }
    };

    return (
        <main className='Login-Head'>
            <img src="../../assets/ai-generated-8704064_1280.jpg" alt="" />
            <div className='login'>
                <form className="login-container" onSubmit={handleSubmit}>
                    <div className="login-content">
                        <h1>Login</h1>
                    </div>
                    <div className='login-input'>
                        <input 
                            onChange={handleChange} 
                            name='email' 
                            type="email" 
                            placeholder='Enter your Email' 
                            value={values.email} 
                        />
                        <input 
                            onChange={handleChange} 
                            name='password' 
                            type="password" 
                            placeholder='Enter your Password' 
                            value={values.password} 
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <div className='login-checkbox'>
                        <input className='checkbox' type="checkbox" required />
                        <label className='Policy'>
                            <p>By continuing, I agree to the use of privacy & Policy </p>
                        </label>
                    </div>
                    <div className='account'>
                        <p>Create a new Account? <br /> <br /> <Link to='/forgot-password'>Forgot Password?</Link> 
                         <Link className='Clicking' to='/signup'>Click here</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default LogIn;
