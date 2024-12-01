import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Auth.css';

const VolunteerLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = credentials; 
      const response = await axios.post('http://localhost:3000/auth/login', { userType: 'volunteer', email, password });

      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem('token', response.data.token); // Store token for authenticated requests
        navigate('/volunteer/dashboard');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Volunteer Login Failed. Please check your credentials and try again.';
      alert(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h3>Volunteer Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Login
        </button>
      </form>
    </div>
  );
};

export default VolunteerLogin;
