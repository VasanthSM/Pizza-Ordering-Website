import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css';
import AccountImage from "../../assets/depositphotos_17680877-stock-illustration-funny-pizza-delivery-boy-riding.jpg"

const Account = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data)
    };
    fetchUserDetails();
  }, []);

  if (!users.length) {
    return <p>No user details found</p>;
  }

  return (
    <div className="account">
      <h1>Account Details</h1>
      <div className="user-details">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))}
        {/* <div className="image-container">
        <img src={AccountImage} alt="" className="account-image" />
        </div> */}
      </div>
      
    </div>
  );
};

export default Account;
