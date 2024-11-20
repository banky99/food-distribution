// src/components/auth/VolunteerLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Auth.css';

const VolunteerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { userType: 'volunteer', email, password });
      alert(response.data.message);
      navigate('/volunteer/dashboard');
    } catch (error) {
      alert('Volunteer Login Failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Volunteer Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-warning">Login</button>
      </form>
    </div>
  );
};

export default VolunteerLogin;