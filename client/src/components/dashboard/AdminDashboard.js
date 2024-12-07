import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Function to handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear the token
    navigate('/admin/login'); // Redirect to login page
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-danger mb-4" onClick={handleLogout}>
        Logout
      </button>

      {/* Dashboard Options */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <h4>Manage Beneficiaries</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/admin/beneficiaries')}
          >
            View Beneficiaries
          </button>
        </div>
        <div className="col-md-3 mb-4">
          <h4>Manage Donors</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/admin/donors')}
          >
            View Donors
          </button>
        </div>
        <div className="col-md-3 mb-4">
          <h4>Manage Volunteers</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/admin/volunteers')}
          >
            View Volunteers
          </button>
        </div>
        <div className="col-md-3 mb-4">
          <h4>Manage Food Inventory</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/admin/food-inventory')}
          >
            View Food Inventory
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-4">
          <h4>Track Donations</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/admin/donations')}
          >
            View Donations
          </button>
        </div>
        <div className="col-md-3 mb-4">
          <h4>Track Deliveries</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/admin/deliveries')}
          >
            View Deliveries
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
