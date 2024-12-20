// src/components/auth/BeneficiaryLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Auth.css';

const BeneficiaryLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    const data = {
      email,
      password,
      userType: 'beneficiary', 
    };

    try {
      // Send login request to the backend
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        data,
        { withCredentials: true } 
      );

      // Check if login is successful
      if (response.status === 200) {
        alert(response.data.message);
        // Redirect the user to the beneficiary dashboard
        navigate('/beneficiary/dashboard');
      }
    } catch (error) {
      // Display the specific error message from the server if available
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3>Beneficiary Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default BeneficiaryLogin;
