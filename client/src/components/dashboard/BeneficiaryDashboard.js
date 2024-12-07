import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

// API Base URL
const API_BASE_URL = "http://localhost:3001";

const BeneficiaryDashboard = () => {
  const [foodRequests, setFoodRequests] = useState([]);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', location: '', food_preferences: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [newFoodRequest, setNewFoodRequest] = useState({ food_type: '', quantity: '' });
  const [availableFood, setAvailableFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verify session and fetch data
  const verifySessionAndFetchData = async () => {
    setLoading(true);
    try {
      const sessionResponse = await axios.get(`${API_BASE_URL}/check-session`, { withCredentials: true });
      console.log('Session data:', sessionResponse.data);

      const [foodRequestsResponse, profileResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/food-requests`, { withCredentials: true }).catch(() => null),
        axios.get(`${API_BASE_URL}/profile`, { withCredentials: true }).catch(() => null),
    ]);

    if (foodRequestsResponse) {
      console.log('Food Requests Response:', foodRequestsResponse.data); // Log response
      setFoodRequests(foodRequestsResponse.data);
  }
  if (profileResponse) setProfile(profileResponse.data);
} catch (error) {
  console.error('Error fetching data or session expired:', error.response?.data || error.message);
  alert('Session expired or unauthorized. Please log in again.');
  navigate('/beneficiary/login');
} finally {
  setLoading(false);
}
};

  // Fetch available food items
  const fetchAvailableFood = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/available-food`, { withCredentials: true });
      setAvailableFood(response.data);
    } catch (error) {
      console.error('Error fetching available food:', error);
      alert('Failed to load available food items.');
    }
  };

  // Use effect to verify session and fetch initial data
  useEffect(() => {
    verifySessionAndFetchData();
    fetchAvailableFood();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
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
      const response = await axios.put(`${API_BASE_URL}/update-profile`, profile, { withCredentials: true });
      console.log('Profile update response:', response.data);
      alert('Profile updated successfully!');
      setShowProfileUpdate(false);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Profile update failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      alert('Both password fields are required!');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/update-password`, passwords, { withCredentials: true });
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

      const response = await axios.post(`${API_BASE_URL}/food-requests`, requestData, { withCredentials: true });

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
      <form onSubmit={handleFoodRequestSubmit}>
        <div className="mb-3">
          <label htmlFor="foodType" className="form-label">
            Select Food Type
          </label>
          <select
            id="foodType"
            className="form-control"
            value={newFoodRequest.food_type}
            onChange={(e) => setNewFoodRequest({ ...newFoodRequest, food_type: e.target.value })}
            required
          >
            <option value="">-- Select Food Type --</option>
            {availableFood.map((food, index) => (
              <option key={index} value={food.food_type}>
                {food.food_type}
              </option>
            ))}
          </select>
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
    <tr key={request.request_id || index}>
      <td>{index + 1}</td>
      <td>{request.food_type || 'Unknown'}</td>
      <td>{request.quantity || 'N/A'}</td>
      <td>{request.request_date ? new Date(request.request_date).toLocaleDateString() : 'N/A'}</td>
      <td>{request.status || 'N/A'}</td>
    </tr>
  ))}
</tbody>
        </table>
      )}

      {/* Profile Update Section */}
      <button className="btn btn-info mt-4 w-100" onClick={() => setShowProfileUpdate(!showProfileUpdate)}>
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
      <button className="btn btn-warning mt-4 w-100" onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}>
        Update Password
      </button>
      {showPasswordUpdate && (
        <div className="card p-4 mt-3">
          <h3>Change Password</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordUpdate();
            }}
          >
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="form-control"
                placeholder="Old Password"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-success mt-3" type="submit">
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryDashboard;
