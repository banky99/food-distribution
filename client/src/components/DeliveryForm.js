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
            const response = await axios.post('http://127.0.0.1:3000/deliveries', formData);
            console.log(response.data);
            // Reset form or show success message
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <div className="container">
            <h2>Delivery Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Inventory ID</label>
                    <input type="number" className="form-control" name="inventory_id" value={formData.inventory_id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Beneficiary ID</label>
                    <input type="number" className="form-control" name="beneficiary_id" value={formData.beneficiary_id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Volunteer ID</label>
                    <input type="number" className="form-control" name="volunteer_id" value={formData.volunteer_id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Delivery Date</label>
                    <input type="date" className="form-control" name="delivery_date" value={formData.delivery_date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input type="text" className="form-control" name="status" value={formData.status} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default DeliveryForm;