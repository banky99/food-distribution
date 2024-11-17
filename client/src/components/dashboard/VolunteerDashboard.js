// src/components/dashboard/VolunteerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const VolunteerDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch deliveries for the logged-in volunteer
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('/deliveries');
        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
    fetchDeliveries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('volunteerToken');
    navigate('/volunteer/login');
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, Volunteer</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      <h3 className="mt-4">Your Deliveries</h3>
      <ul className="list-group mt-3">
        {deliveries.map((delivery, index) => (
          <li className="list-group-item" key={index}>
            {delivery.beneficiaryName} - {new Date(delivery.delivery_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerDashboard;
