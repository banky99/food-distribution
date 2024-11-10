// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DonorForm from './components/DonorForm';
import BeneficiaryForm from './components/BeneficiaryForm';
import FoodInventoryForm from './components/FoodInventoryForm';
import DistributionCenterForm from './components/DistributionCenterForm';
import DeliveryForm from './components/DeliveryForm';
import VolunteerForm from './components/VolunteerForm';
import FoodRequestForm from './components/FoodRequestForm';
import CommunityGardenForm from './components/CommunityGardenForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <h1>Community Food Network</h1>
                <nav className="mb-4">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Donor</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/beneficiary">Beneficiary</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/food-inventory">Food Inventory</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/distribution-center">Distribution Center</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/delivery">Delivery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/volunteer">Volunteer</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/food-request">Food Request</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/community-garden">Community Garden</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<DonorForm />} />
                    <Route path="/beneficiary" element={<BeneficiaryForm />} />
                    <Route path="/food-inventory" element={<FoodInventoryForm />} />
                    <Route path="/distribution-center" element={<DistributionCenterForm />} />
                    <Route path="/delivery" element={<DeliveryForm />} />
                    <Route path="/volunteer" element={<VolunteerForm />} />
                    <Route path="/food-request" element={<FoodRequestForm />} />
                    <Route path="/community-garden" element={<CommunityGardenForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
