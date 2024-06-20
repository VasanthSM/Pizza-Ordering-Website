import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const {url } = useContext(StoreContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateEmail(email)) {
        setMessage('Please enter a valid email address.');
        return;
      }
      const response = await axios.post(`${url}/resetpassword`, {
        email: email,
        password: password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className='resetPassword'>
      <h2>Reset Password</h2>
      <form onSubmit={handleFormSubmit} className='Form'>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter already registered email" require />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" required />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
