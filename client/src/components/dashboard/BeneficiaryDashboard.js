import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

// Clear Axios default headers to prevent bloating
axios.defaults.headers.common = {};
axios.defaults.headers.post['Content-Type'] = 'application/json';

const BeneficiaryDashboard = () => {
  const [foodRequests, setFoodRequests] = useState([]);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', location: '', food_preferences: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [newFoodRequest, setNewFoodRequest] = useState({ food_type: '', quantity: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Session verification and data fetch function
  const verifySessionAndFetchData = async () => {
    setLoading(true);
    try {
      // Verify session is active
      const sessionResponse = await axios.get('http://localhost:3001/check-session', {
        withCredentials: true,
      });
      console.log('Session data:', sessionResponse.data);

      
       // Fetch dashboard data (food requests and profile)
       const [foodRequestsResponse, profileResponse] = await Promise.all([
        axios.get('http://localhost:3000/food-requests', { withCredentials: true }),
        axios.get('http://localhost:3000/profile', { withCredentials: true }),
      ]);

      setFoodRequests(foodRequestsResponse.data);
      setProfile(profileResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data or session expired:', error.response?.data || error.message);
      alert('Session expired or unauthorized. Please log in again.');
      navigate('/beneficiary/login');
    } finally {
      setLoading(false);
    }
  };

  // Use effect to verify session and fetch initial data
  useEffect(() => {
    verifySessionAndFetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      alert('Logged out successfully.');
      navigate('/beneficiary/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Try again.');
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await axios.put('/update-profile', profile, { withCredentials: true });
      alert('Profile updated successfully!');
      setShowProfileUpdate(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Profile update failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setLoading(true);
    try {
      await axios.post('/update-password', passwords, { withCredentials: true });
      alert('Password updated successfully!');
      setShowPasswordUpdate(false);
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Password update failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleFoodRequestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        ...newFoodRequest,
        quantity: parseInt(newFoodRequest.quantity, 10),
        request_date: new Date().toISOString().split('T')[0],
        status: 'Pending',
      };

      const response = await axios.post('/request-food', requestData, { withCredentials: true });

      if (response.status === 201) {
        alert('Food request submitted successfully!');
        setFoodRequests([...foodRequests, response.data]);
        setNewFoodRequest({ food_type: '', quantity: '' });
      } else {
        alert('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error creating food request:', error);
      alert(error.response?.data?.error || 'Failed to create food request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, {profile.name}!</h2>
      <button className="btn btn-danger mb-4" onClick={handleLogout}>
        Logout
      </button>

      {loading && <div>Loading...</div>}

      {/* Food Request Form */}
      <div className="card p-4 mb-4">
        <h3>Request for Food</h3>
        <form onSubmit={handleFoodRequestSubmit}>
          <div className="mb-3">
            <label htmlFor="foodType" className="form-label">
              Food Type
            </label>
            <input
              type="text"
              id="foodType"
              className="form-control"
              value={newFoodRequest.food_type}
              onChange={(e) => setNewFoodRequest({ ...newFoodRequest, food_type: e.target.value })}
              placeholder="Enter food type (e.g., rice, beans)"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={newFoodRequest.quantity}
              onChange={(e) => setNewFoodRequest({ ...newFoodRequest, quantity: e.target.value })}
              placeholder="Enter quantity needed"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Request
          </button>
        </form>
      </div>

      
      {/* Display Food Requests */}
<h3>Your Food Requests</h3>
{foodRequests.length === 0 ? (
  <p>No food requests made yet.</p>
) : (
  <table className="table table-striped mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Food Type</th>
        <th>Quantity</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {foodRequests.map((request, index) => (
        <tr key={request.request_id}>
          <td>{index + 1}</td>
          <td>{request.food_type}</td>
          <td>{request.quantity}</td>
          <td>{new Date(request.request_date).toLocaleDateString()}</td>
          <td>{request.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}


      {/* Profile Update Section */}
      <button
        className="btn btn-info mt-4 w-100"
        onClick={() => setShowProfileUpdate(!showProfileUpdate)}
      >
        Update Profile
      </button>
      {showProfileUpdate && (
        <div className="card p-4 mt-3">
          <h3>Update Profile</h3>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter your name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            type="email"
            className="form-control mt-3"
            placeholder="Enter your email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter your location"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter your food preferences"
            value={profile.food_preferences}
            onChange={(e) => setProfile({ ...profile, food_preferences: e.target.value })}
          />
          <button className="btn btn-success mt-3" onClick={handleProfileUpdate}>
            Save Changes
          </button>
        </div>
      )}

      {/* Password Update Section */}
      <button
        className="btn btn-warning mt-4 w-100"
        onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
      >
        Update Password
      </button>
      {showPasswordUpdate && (
        <div className="card p-4 mt-3">
          <h3>Change Password</h3>
          <input
            type="password"
            className="form-control mt-3"
            placeholder="Old Password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          />
          <input
            type="password"
            className="form-control mt-3"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
          <button className="btn btn-success mt-3" onClick={handlePasswordUpdate}>
            Change Password
          </button>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryDashboard;