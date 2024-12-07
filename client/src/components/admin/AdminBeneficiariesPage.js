// src/components/admin/AdminBeneficiariesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminBeneficiariesPage = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('/admin/beneficiaries');
        setBeneficiaries(response.data);
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
      }
    };
    fetchBeneficiaries();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Manage Beneficiaries</h2>
      <Link to="/admin/beneficiaries/add" className="btn btn-primary mb-4">
        Add New Beneficiary
      </Link>
      <ul className="list-group mt-3">
        {beneficiaries.map((beneficiary, index) => (
          <li className="list-group-item" key={index}>
            {beneficiary.name} - {beneficiary.contact}
            {/* Add buttons for editing and deleting */}
            <button className="btn btn-warning btn-sm ml-2">Edit</button>
            <button className="btn btn-danger btn-sm ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBeneficiariesPage;
