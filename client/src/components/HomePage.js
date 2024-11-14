// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="text-center mt-5">
      <h2>Welcome to the Community Food Network</h2>
      <div className="d-flex justify-content-center mt-4">
        <div className="card m-3" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Admin</h5>
            <Link to="/admin/login" className="btn btn-primary">Admin Login</Link>
          </div>
        </div>
        <div className="card m-3" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Beneficiary</h5>
            <Link to="/beneficiary/login" className="btn btn-success">Beneficiary Login</Link>
          </div>
        </div>
        <div className="card m-3" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Donor</h5>
            <Link to="/donor/login" className="btn btn-info">Donor Login</Link>
          </div>
        </div>
        <div className="card m-3" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Volunteer</h5>
            <Link to="/volunteer/login" className="btn btn-warning">Volunteer Login</Link>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h5>Don't have an account?</h5>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
