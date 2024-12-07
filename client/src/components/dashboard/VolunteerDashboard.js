import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboard.css';

const VolunteerDashboard = () => {
  const [deliveries, setDeliveries] = useState([]); // Holds list of deliveries
  const [deliveryData, setDeliveryData] = useState({
    beneficiaryId: '',
    foodItems: [],
    deliveryDate: '',
  }); // Holds new delivery data
  const [foodInventory, setFoodInventory] = useState([]); // Holds food items available for delivery
  const navigate = useNavigate();
  
  const API_BASE_URL = 'http://localhost:3001'; // Update with your API base URL

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/volunteer/deliveries`, { withCredentials: true });
        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
    
    const fetchFoodInventory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/food-inventory`, { withCredentials: true });
        setFoodInventory(response.data);
      } catch (error) {
        console.error('Error fetching food inventory:', error);
      }
    };

    fetchDeliveries();
    fetchFoodInventory();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('volunteerToken');
    navigate('/volunteer/login');
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/volunteer/deliveries`, deliveryData, {
        withCredentials: true,
      });
      setDeliveries((prev) => [...prev, response.data]);
      setDeliveryData({ beneficiaryId: '', foodItems: [], deliveryDate: '' });
      alert('Delivery successfully recorded!');
    } catch (error) {
      console.error('Error adding delivery:', error);
      alert('Failed to record delivery. Please try again.');
    }
  };

  const handleMarkAsComplete = async (deliveryId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/volunteer/deliveries/${deliveryId}/complete`);
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery.delivery_id === deliveryId ? { ...delivery, status: 'Completed' } : delivery
        )
      );
      alert('Delivery marked as complete!');
    } catch (error) {
      console.error('Error marking delivery as complete:', error);
      alert('Failed to mark delivery as complete.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, Volunteer</h2>
      <button className="btn btn-danger mb-4" onClick={handleLogout}>
        Logout
      </button>

      {/* New Delivery Form */}
      <h3>New Delivery</h3>
      <form onSubmit={handleDeliverySubmit} className="mb-4">
        <div className="form-group mb-3">
          <label>Beneficiary ID</label>
          <input
            type="number"
            className="form-control"
            name="beneficiaryId"
            value={deliveryData.beneficiaryId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Food Items</label>
          <select
            multiple
            className="form-control"
            name="foodItems"
            value={deliveryData.foodItems}
            onChange={handleInputChange}
            required
          >
            {foodInventory.map((foodItem) => (
              <option key={foodItem.inventory_id} value={foodItem.inventory_id}>
                {foodItem.food_type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Delivery Date</label>
          <input
            type="date"
            className="form-control"
            name="deliveryDate"
            value={deliveryData.deliveryDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Delivery
        </button>
      </form>

      {/* Pending Deliveries */}
      <h3>Pending Deliveries</h3>
      {deliveries.length > 0 ? (
        <ul className="list-group mt-3">
          {deliveries
            .filter((delivery) => delivery.status === 'Pending')
            .map((delivery, index) => (
              <li className="list-group-item" key={index}>
                <strong>Beneficiary:</strong> {delivery.beneficiary_name} |{' '}
                <strong>Food:</strong> {delivery.food_items.map((item) => item.food_type).join(', ')} |{' '}
                <strong>Delivery Date:</strong> {new Date(delivery.delivery_date).toLocaleDateString()} |{' '}
                <strong>Status:</strong> {delivery.status} |{' '}
                <button className="btn btn-success" onClick={() => handleMarkAsComplete(delivery.delivery_id)}>
                  Mark as Complete
                </button>
              </li>
            ))}
        </ul>
      ) : (
        <p className="mt-3">No pending deliveries.</p>
      )}

      {/* Completed Deliveries */}
      <h3>Completed Deliveries</h3>
      {deliveries.length > 0 ? (
        <ul className="list-group mt-3">
          {deliveries
            .filter((delivery) => delivery.status === 'Completed')
            .map((delivery, index) => (
              <li className="list-group-item" key={index}>
                <strong>Beneficiary:</strong> {delivery.beneficiary_name} |{' '}
                <strong>Food:</strong> {delivery.food_items.map((item) => item.food_type).join(', ')} |{' '}
                <strong>Delivery Date:</strong> {new Date(delivery.delivery_date).toLocaleDateString()} |{' '}
                <strong>Status:</strong> {delivery.status}
              </li>
            ))}
        </ul>
      ) : (
        <p className="mt-3">No completed deliveries yet.</p>
      )}
    </div>
  );
};

export default VolunteerDashboard;
