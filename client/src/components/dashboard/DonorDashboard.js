// src/components/dashboard/DonorDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch donations for the logged-in donor
    const fetchDonations = async () => {
      try {
        const response = await axios.get('/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('donorToken');
    navigate('/donor/login');
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, Donor</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      <h3 className="mt-4">Your Donations</h3>
      <ul className="list-group mt-3">
        {donations.map((donation, index) => (
          <li className="list-group-item" key={index}>
            {donation.description} - {donation.amount} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorDashboard;
