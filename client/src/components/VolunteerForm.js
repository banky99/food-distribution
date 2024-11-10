// src/components/VolunteerForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const VolunteerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        availability: '',
        roles: '',
        contact_info: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/volunteers', formData);
            console.log(response.data);
            // Reset form or show success message
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <div className="container">
            <h2>Volunteer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Availability</label>
                    <input type="text" className="form-control" name="availability" value={formData.availability} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Roles</label>
                    <input type="text" className="form-control" name="roles" value={formData.roles} onChange={handleChange} required />
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

export default VolunteerForm;