// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Community Food Network
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/beneficiary/login">
                Beneficiary Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donor/login">
                Donor Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/volunteer/login">
                Volunteer Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
