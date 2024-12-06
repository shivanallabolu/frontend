import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Check if the user is authenticated (check localStorage for the user)
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = async () => {
    try {
      // Call the logout API without assigning the response
      await axios.get('https://backend-u3oi.onrender.com/budgetmanager/user/logout');
  
      // Clear the local storage and update the authentication state
      localStorage.removeItem('user');
      setIsAuthenticated(false);
  
      // Show a success message as an alert
      alert('Sign out successful!');
  
      // Reload the page and navigate to the homepage
      window.location.reload();
      navigate('/'); // Redirect to homepage after reload
    } catch (err) {
      console.error('Error logging out:', err);
      alert('An error occurred while logging out.');
    }
  };
  

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      {/* Make the logo a clickable link that redirects to the homepage */}
      <Link to="/" className="logo">
        Budget Manager
      </Link>
      
      <nav>
        <Link
          to="/"
          className={activeLink === 'home' ? 'active' : ''}
          onClick={() => handleLinkClick('home')}
        >
          Home
        </Link>
        <Link
          to="/features"
          className={activeLink === 'features' ? 'active' : ''}
          onClick={() => handleLinkClick('features')}
        >
          Features
        </Link>
        <Link
          to="/contact"
          className={activeLink === 'contact' ? 'active' : ''}
          onClick={() => handleLinkClick('contact')}
        >
          Contact
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/signup"
              className={activeLink === 'signup' ? 'active' : ''}
              onClick={() => handleLinkClick('signup')}
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className={activeLink === 'signin' ? 'active' : ''}
              onClick={() => handleLinkClick('signin')}
            >
              Sign In
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/myaccount"
              className={activeLink === 'myaccount' ? 'active' : ''}
              onClick={() => handleLinkClick('myaccount')}
            >
              My Account
            </Link>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
