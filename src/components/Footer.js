import React from 'react';
import './Footer.css';

function Footer() {
  const handlePrivacyClick = () => {
    // Handle Privacy Policy click (e.g., open a modal, scroll to section, etc.)
  };

  const handleTermsClick = () => {
    // Handle Terms of Service click (e.g., open a modal, scroll to section, etc.)
  };

  return (
    <footer>
      <div className="footer-content">
        <p className="footer-text">© 2024 Budget Manager. All rights reserved.</p>
        <div className="footer-links">
          <button onClick={handlePrivacyClick} className="footer-link">Privacy Policy</button> __
          <button onClick={handleTermsClick} className="footer-link">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
