// src/components/dashboard/AdminDashboard.js
import React from 'react'; // Removed useState since it's not used
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
        <div className="col-md-4">
          <h4>Manage Beneficiaries</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/beneficiary')}
          >
            View Beneficiaries
          </button>
        </div>
        <div className="col-md-4">
          <h4>Manage Donors</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/donor')}
          >
            View Donors
          </button>
        </div>
        <div className="col-md-4">
          <h4>Manage Volunteers</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate('/volunteer')}
          >
            View Volunteers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
