// src/components/admin/AdminDonorsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDonorsPage = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('/admin/donors');
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };
    fetchDonors();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Manage Donors</h2>
      <Link to="/admin/donors/add" className="btn btn-primary mb-4">
        Add New Donor
      </Link>
      <ul className="list-group mt-3">
        {donors.map((donor, index) => (
          <li className="list-group-item" key={index}>
            {donor.name} - {donor.contact}
            <button className="btn btn-warning btn-sm ml-2">Edit</button>
            <button className="btn btn-danger btn-sm ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDonorsPage;
