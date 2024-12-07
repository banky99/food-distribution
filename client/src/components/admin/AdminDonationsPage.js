// src/components/admin/AdminDonationsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDonationsPage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('/admin/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Track Donations</h2>
      <ul className="list-group mt-3">
        {donations.map((donation, index) => (
          <li className="list-group-item" key={index}>
            {donation.donor_name} donated {donation.quantity} units of {donation.food_type}
            <button className="btn btn-warning btn-sm ml-2">View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDonationsPage;
