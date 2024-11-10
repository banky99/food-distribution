// src/components/BeneficiaryForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BeneficiaryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact_info: '',
        location: '',
        dietary_restrictions: '',
        allergies: '',
        food_preferences: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/beneficiaries', formData);
            console.log(response.data);
            // Reset form or show success message
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <div className="container">
            <h2>Beneficiary Registration</h2>
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
                    <label>Location</label>
                    <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Dietary Restrictions</label>
                    <textarea className="form-control" name="dietary_restrictions" value={formData.dietary_restrictions} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Allergies</label>
                    <textarea className="form-control" name="allergies" value={formData.allergies} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Food Preferences</label>
                    <textarea className="form-control" name="food_preferences" value={formData.food_preferences} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default BeneficiaryForm;