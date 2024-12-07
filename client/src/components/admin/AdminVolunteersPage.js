// src/components/admin/AdminVolunteersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminVolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('/admin/volunteers');
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };
    fetchVolunteers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Manage Volunteers</h2>
      <Link to="/admin/volunteers/add" className="btn btn-primary mb-4">
        Add New Volunteer
      </Link>
      <ul className="list-group mt-3">
        {volunteers.map((volunteer, index) => (
          <li className="list-group-item" key={index}>
            {volunteer.name} - {volunteer.contact}
            <button className="btn btn-warning btn-sm ml-2">Edit</button>
            <button className="btn btn-danger btn-sm ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminVolunteersPage;
