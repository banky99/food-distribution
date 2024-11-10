// src/components/FoodInventoryForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodInventoryForm = () => {
    const [formData, setFormData] = useState({
        food_type: '',
        quantity: '',
        expiration_date: '',
        status: '',
        distribution_center_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/food-inventory', formData);
            console.log(response.data);
            // Reset form or show success message
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <div className="container">
            <h2>Food Inventory Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Food Type</label>
                    <input type="text" className="form-control" name="food_type" value={formData.food_type} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Expiration Date</label>
                    <input type="date" className="form-control" name="expiration_date" value={formData.expiration_date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input type="text" className="form-control" name="status" value={formData.status} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Distribution Center ID</label>
                    <input type="number" className="form-control" name="distribution_center_id" value={formData.distribution_center_id} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default FoodInventoryForm;