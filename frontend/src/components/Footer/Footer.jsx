import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Wishpicks. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;