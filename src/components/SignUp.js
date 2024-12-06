import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success states
    setError('');
    setSuccess('');
    setUserName('');  // Reset username state

    try {
      // Make the POST request to the backend API to register the user
      const response = await axios.post('http://localhost:999/budgetmanager/user/register', {
        userName: name,        // Change to match the backend field (userName)
        userEmail: email,      // Change to match the backend field (userEmail)
        userPassword: password // Change to match the backend field (userPassword)
      });

      // Check if the response contains a userName or error
      const { userName: newUserName, message } = response.data;

      // Handle errors like user already existing
      if (message && message === 'User with this email already exists.') {
        setError('This email is already registered. Please try with a different email.');
        return; // Stop the process if the user already exists
      }

      // If registration is successful, set the username and success message
      if (newUserName) {
        setUserName(newUserName);
        console.log('Current userName state:', userName);
        alert(`Sign up successful! Welcome, ${newUserName}!`);
        window.location.href = '/signin';  // Redirect to SignIn page

        // Reset the form fields
        setName('');
        setEmail('');
        setPassword('');
      }

    } catch (err) {
      // General error handling
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="signup">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default SignUp;
