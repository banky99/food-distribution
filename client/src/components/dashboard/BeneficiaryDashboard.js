// src/components/dashboard/BeneficiaryDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const BeneficiaryDashboard = () => {
  const [foodRequests, setFoodRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch food requests for the logged-in beneficiary
    const fetchFoodRequests = async () => {
      try {
        const response = await axios.get('/food-requests');
        setFoodRequests(response.data);
      } catch (error) {
        console.error('Error fetching food requests:', error);
      }
    };
    fetchFoodRequests();
  }, []);

  const handleLogout = () => {
    // Clear localStorage or session data
    localStorage.removeItem('beneficiaryToken');
    navigate('/beneficiary/login');
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, Beneficiary</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      <h3 className="mt-4">Your Food Requests</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Request ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodRequests.map((request, index) => (
            <tr key={request.id}>
              <td>{index + 1}</td>
              <td>{request.id}</td>
              <td>{request.status}</td>
              <td>{new Date(request.date).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-warning btn-sm">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeneficiaryDashboard;
