// src/components/admin/AdminDeliveriesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('/admin/deliveries');
        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
    fetchDeliveries();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Track Deliveries</h2>
      <ul className="list-group mt-3">
        {deliveries.map((delivery, index) => (
          <li className="list-group-item" key={index}>
            {delivery.beneficiary_name} - {new Date(delivery.delivery_date).toLocaleDateString()}
            <button className="btn btn-success btn-sm ml-2">Mark as Delivered</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDeliveriesPage;
