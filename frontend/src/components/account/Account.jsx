import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './Account.css';

const Account = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmailid = localStorage.getItem('Email:');
  const {url } = useContext(StoreContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${url}/users`);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    if (userEmailid) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [userEmailid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!users.length) {
    return <p>No user details found</p>;
  }

  const user = users.find(user => user.email === userEmailid);

  return (
    <div className="account">
      <h1>Account Details</h1>
      <div className="user-details">
        {user ? (
          <div key={user.id} className="user-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>No user details found for the logged-in user</p>
        )}
      </div>
    </div>
  );
};

export default Account;
