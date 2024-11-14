// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Auth.css';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'beneficiary', // default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      const response = await axios.post('/api/auth/signup', user);
      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/login'); // Redirect to the login page
      }
    } catch (error) {
      // Handle errors and display a user-friendly message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Signup</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Select Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="beneficiary">Beneficiary</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>

      <div className="text-center mt-3">
        <p>Already have an account? <a href="/login">Log in here</a></p>
      </div>
    </div>
  );
};

export default Signup;
