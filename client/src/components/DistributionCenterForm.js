// src/components/DistributionCenterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DistributionCenterForm = () => {
    const [formData, setFormData] = useState({
        location: '',
        storage_capacity: '',
        contact_info: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/distribution-centers', formData);
            console.log(response.data);
            // Reset form or show success message
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <div className="container">
            <h2>Distribution Center Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange } required />
                </div>
                <div className="form-group">
                    <label>Storage Capacity</label>
                    <input type="number" className="form-control" name="storage_capacity" value={formData.storage_capacity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contact Info</label>
                    <input type="text" className="form-control" name="contact_info" value={formData.contact_info} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default DistributionCenterForm;