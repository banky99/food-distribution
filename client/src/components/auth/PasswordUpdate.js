import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Auth.css';

const PasswordUpdate = () => {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    userType: 'beneficiary',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, oldPassword, newPassword, userType } = formData;
      const response = await axios.post('/auth/update-password', { email, oldPassword, newPassword, userType });

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Password Update Failed. Please try again later.';
      alert(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h3>Update Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>User Type</label>
          <select
            className="form-control"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
          >
            <option value="beneficiary">Beneficiary</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Old Password</label>
          <input
            type="password"
            name="oldPassword"
            className="form-control"
            value={formData.oldPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
