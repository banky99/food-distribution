// src/components/admin/AdminFoodInventoryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminFoodInventoryPage = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('/admin/food-inventory');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching food inventory:', error);
      }
    };
    fetchInventory();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Manage Food Inventory</h2>
      <Link to="/admin/food-inventory/add" className="btn btn-primary mb-4">
        Add New Food Item
      </Link>
      <ul className="list-group mt-3">
        {inventory.map((item, index) => (
          <li className="list-group-item" key={index}>
            {item.food_type} - {item.quantity} units
            <button className="btn btn-warning btn-sm ml-2">Edit</button>
            <button className="btn btn-danger btn-sm ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFoodInventoryPage;
