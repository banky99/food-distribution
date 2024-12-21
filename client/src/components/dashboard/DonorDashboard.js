import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]); 
  const [donationData, setDonationData] = useState({
    donor_id: '',          
    food_type: '',         
    quantity: '',
    donationDate: '',
  });
  const API_BASE_URL = 'http://localhost:3001'; 
  const navigate = useNavigate();

  // Fetch donations for the logged-in donor
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const storedDonorId = localStorage.getItem('donor_id');
        if (!storedDonorId) {
          alert('Session expired. Please log in again.');
          navigate('/donor/login');
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/donor/${storedDonorId}/donations`, {
          withCredentials: true,
        });
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error.response?.data || error.message);
      }
    };
    fetchDonations();
  }, [navigate]);

  // Retrieve donor_id from local storage
  useEffect(() => {
    const storedDonorId = localStorage.getItem('donor_id');
    if (storedDonorId) {
      setDonationData((prev) => ({ ...prev, donor_id: storedDonorId }));
    }
  }, []);

  // Handle donation form submission
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    console.log('Donation data being submitted:', donationData);
    const { donor_id, food_type, quantity, donationDate } = donationData;
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/contribute`, {
        donor_id,
        food_type,           
        quantity,
        donationDate
      }, {
        withCredentials: true,
      });

      setDonations((prev) => [...prev, response.data]); // Add new donation to list
      setDonationData((prev) => ({ ...prev, food_type: '', quantity: '', donationDate: '' })); // Reset form
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
      localStorage.removeItem('donor_id'); // Remove donor ID
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
            name="food_type"
            value={donationData.food_type}
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
              <strong>Food Type:</strong> {donation.food_type} |{' '}
              <strong>Quantity:</strong> {donation.quantity} units |{' '}
              <strong>Date:</strong> {donation.donationDate ? new Date(donation.donationDate).toLocaleDateString() : 'N/A'}
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
