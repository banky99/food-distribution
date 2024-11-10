// src/components/CommunityGardenForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommunityGardenForm = () => {
    const [formData, setFormData] = useState({
        location: '',
        crop_type: '',
        yield_amount: '',
        harvest_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/community-gardens', formData);
            console.log(response.data);
            // Reset form or show success message
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <div className="container">
            <h2>Community Garden Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Crop Type</label>
                    <input type="text" className="form-control" name="crop_type" value={formData.crop_type} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Yield Amount</label>
                    <input type="number" className="form-control" name="yield_amount" value={formData.yield_amount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Harvest Date</label>
                    <input type="date" className="form-control" name="harvest_date" value={formData.harvest_date} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CommunityGardenForm;