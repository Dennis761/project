import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <h2 className="company-name">Antique store</h2>
          <p className="company-description">Look for unique things around the world!</p>
        </div>
        <div className="contact-info">
          <h3 className="contact-heading">Contact Information</h3>
          <p className="contact-detail">Address: city, street, building</p>
          <p className="contact-detail">Phone: +38 (000) 000-00-00</p>
          <p className="contact-detail">Email: info@example.com</p>
        </div>
      </div>
      <div className="copyright">
        &copy; 2024 All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
