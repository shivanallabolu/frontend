import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:999/budgetmanager/user/login', {
        userEmail: email,
        userPassword: password,
      });

      if (response.data.statusCode === true && response.data.userMessage === "Login is successful!") {
        alert('Sign in successful!');
        // Store the response data including userId
        localStorage.setItem('user', JSON.stringify({
          userMessage: response.data.userMessage,
          statusCode: response.data.statusCode,
          userName: response.data.userName,
          userId: response.data.userId, // Store the userId here
        }));
        navigate('/');
        window.location.reload(); // Optionally reload to update UI
      } else if (response.data.statusCode === false) {
        setError(response.data.userMessage || 'Login failed. Please try again.');
      }

      // Clear the form after submission
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="signin">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignIn;
