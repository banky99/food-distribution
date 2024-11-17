// src/components/auth/PasswordUpdate.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Auth.css';

const PasswordUpdate = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userType, setUserType] = useState('beneficiary');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/update-password', { userType, email, oldPassword, newPassword });
      alert(response.data.message);
    } catch (error) {
      alert('Password Update Failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Update Password</h3>
      <form onSubmit={handlePasswordUpdate}>
        <div className="mb-3">
          <label>User Type</label>
          <select className="form-control" value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="beneficiary">Beneficiary</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Old Password</label>
          <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-dark">Update Password</button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
