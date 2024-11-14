// src/components/Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Community Food Network. All rights reserved.</p>
        <p>
          Follow us on:
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white ms-2 me-2">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white ms-2 me-2">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white ms-2">
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
