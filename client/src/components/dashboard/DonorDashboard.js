import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]); // Holds donation history
  const [donationData, setDonationData] = useState({
    foodType: '',
    quantity: '',
    donationDate: '',
  }); // Holds new donation data
  const API_BASE_URL = 'http://localhost:3001'; // Update with your API base URL
  const navigate = useNavigate();

  // Fetch donations for the logged-in donor
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/donations`, {
          withCredentials: true,
        });
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, []);

  // Handle donation form submission
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/donations`, donationData, {
        withCredentials: true,
      });
      setDonations((prev) => [...prev, response.data]); // Add new donation to list
      setDonationData({ foodType: '', quantity: '', donationDate: '' }); // Reset form
      alert('Donation successfully recorded!');
    } catch (error) {
      console.error('Error recording donation:', error);
      alert('Failed to record donation. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('donorToken'); // Remove token if stored
      navigate('/donor/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, Donor</h2>
      <button className="btn btn-danger mb-4" onClick={handleLogout}>
        Logout
      </button>

      {/* Donation Form */}
      <h3>Make a Donation</h3>
      <form onSubmit={handleDonationSubmit} className="mb-4">
        <div className="form-group mb-3">
          <label>Food Type</label>
          <input
            type="text"
            className="form-control"
            name="foodType"
            value={donationData.foodType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={donationData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Donation Date</label>
          <input
            type="date"
            className="form-control"
            name="donationDate"
            value={donationData.donationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Donation
        </button>
      </form>

      {/* Donation History */}
      <h3>Your Donations</h3>
      {donations.length > 0 ? (
        <ul className="list-group mt-3">
          {donations.map((donation, index) => (
            <li className="list-group-item" key={index}>
              <strong>Food Type:</strong> {donation.foodType} |{' '}
              <strong>Quantity:</strong> {donation.quantity} units |{' '}
              <strong>Date:</strong> {new Date(donation.donationDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3">No donations recorded yet.</p>
      )}
    </div>
  );
};

export default DonorDashboard;
