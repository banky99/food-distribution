// src/components/DeliveryForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeliveryForm = () => {
    const [formData, setFormData] = useState({
        inventory_id: '',
        beneficiary_id: '',
        volunteer_id: '',
        delivery_date: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/deliveries', formData);
            alert(response.data.message);
            setFormData({ inventory_id: '', beneficiary_id: '', volunteer_id: '', delivery_date: '', status: '' });
        } catch (error) {
            console.error('Error adding delivery:', error);
            alert('Failed to add delivery. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h3>Add New Delivery</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Inventory ID</label>
                    <input type="number" className="form-control" name="inventory_id" value={formData.inventory_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Beneficiary ID</label>
                    <input type="number" className="form-control" name="beneficiary_id" value={formData.beneficiary_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Volunteer ID</label>
                    <input type="number" className="form-control" name="volunteer_id" value={formData.volunteer_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Delivery Date</label>
                    <input type="date" className="form-control" name="delivery_date" value={formData.delivery_date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input type="text" className="form-control" name="status" value={formData.status} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Delivery</button>
            </form>
        </div>
    );
};

export default DeliveryForm;
