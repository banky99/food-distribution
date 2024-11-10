// src/components/DonorForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DonorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact_info: '',
        donation_frequency: '',
        preferred_food_types: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/donors', formData);

            console.log(response.data);
            // Reset form or show success message
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <div className="container">
            <h2>Donor Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contact Info</label>
                    <input type="text" className="form-control" name="contact_info" value={formData.contact_info} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Donation Frequency</label>
                    <input type="text" className="form-control" name="donation_frequency" value={formData.donation_frequency} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Preferred Food Types</label>
                    <textarea className="form-control" name="preferred_food_types" value={formData.preferred_food_types} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default DonorForm;