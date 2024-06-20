import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const {url } = useContext(StoreContext);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}/forgotpassword`, { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to reset password. Please try again later.');
        }
    };

    return (
        <div className='forgotPassword'>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
export default ForgotPassword;