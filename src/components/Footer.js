// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
      <p className="footer-text">© 2024 Budget Manager. All rights reserved.</p>
        <div className="footer-links">
          <a>Privacy Policy</a> __
          <a>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
