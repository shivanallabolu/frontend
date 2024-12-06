import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyAccount.css';
import { useNavigate } from 'react-router-dom';

function MyAccount() {
  const [userDetails, setUserDetails] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    userPassword: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserDetails({
        userId: storedUser.userId, // Make sure userId is set from localStorage
        userName: storedUser.userName,
        userEmail: storedUser.userEmail,
        userPassword: '', // Don't load password for security reasons
      });
    } else {
      navigate('/signin'); // Redirect to sign-in page if no user is found
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('https://backend-u3oi.onrender.com/budgetmanager/user/update', {
        userId: userDetails.userId,
        userName: userDetails.userName,
        userEmail: userDetails.userEmail,
        userPassword: userDetails.userPassword,
      });

      // Check if userId is present in the response to confirm update
      if (response.data.userId) {
        alert('Account updated successfully!');
        // Update user in localStorage with the new data
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        alert('Error updating account. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again later.');
      console.error('Update error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="myaccount">
      <h1>My Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={userDetails.userName}
          onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
          disabled={!isEditMode}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={userDetails.userEmail}
          onChange={(e) => setUserDetails({ ...userDetails, userEmail: e.target.value })}
          disabled={!isEditMode}
          required
        />
        {isEditMode && (
          <>
            <label>Password</label>
            <input
              type="password"
              value={userDetails.userPassword}
              onChange={(e) => setUserDetails({ ...userDetails, userPassword: e.target.value })}
              required
            />
          </>
        )}
        {isEditMode && (
          <div className="buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
              Cancel
            </button>
          </div>
        )}
        {!isEditMode && (
          <button type="button" onClick={() => setIsEditMode(true)}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default MyAccount;
