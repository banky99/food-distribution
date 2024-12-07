import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Link as it's not used
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Navbar and Footer
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import HomePage
import HomePage from './components/HomePage';

// Import form components
import DonorForm from './components/DonorForm';
import BeneficiaryForm from './components/BeneficiaryForm';
import FoodInventoryForm from './components/FoodInventoryForm';
import DistributionCenterForm from './components/DistributionCenterForm';
import DeliveryForm from './components/DeliveryForm';
import VolunteerForm from './components/VolunteerForm';
import FoodRequestForm from './components/FoodRequestForm';
import CommunityGardenForm from './components/CommunityGardenForm';

// Import authentication components
import AdminLogin from './components/auth/AdminLogin';
import BeneficiaryLogin from './components/auth/BeneficiaryLogin';
import DonorLogin from './components/auth/DonorLogin';
import VolunteerLogin from './components/auth/VolunteerLogin';
import PasswordUpdate from './components/auth/PasswordUpdate';
import Signup from './components/auth/Signup';

// Import dashboards
import AdminDashboard from './components/dashboard/AdminDashboard';
import BeneficiaryDashboard from './components/dashboard/BeneficiaryDashboard';
import DonorDashboard from './components/dashboard/DonorDashboard';
import VolunteerDashboard from './components/dashboard/VolunteerDashboard';

// Import admin management pages
import AdminBeneficiariesPage from './components/admin/AdminBeneficiariesPage';
import AdminDonorsPage from './components/admin/AdminDonorsPage';
import AdminVolunteersPage from './components/admin/AdminVolunteersPage';
import AdminFoodInventoryPage from './components/admin/AdminFoodInventoryPage';
import AdminDonationsPage from './components/admin/AdminDonationsPage';
import AdminDeliveriesPage from './components/admin/AdminDeliveriesPage';

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      <div className="container mt-4">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Forms Routes */}
          <Route path="/donor" element={<DonorForm />} />
          <Route path="/beneficiary" element={<BeneficiaryForm />} />
          <Route path="/food-inventory" element={<FoodInventoryForm />} />
          <Route path="/distribution-center" element={<DistributionCenterForm />} />
          <Route path="/delivery" element={<DeliveryForm />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/food-request" element={<FoodRequestForm />} />
          <Route path="/community-garden" element={<CommunityGardenForm />} />

          {/* Authentication Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/beneficiary/login" element={<BeneficiaryLogin />} />
          <Route path="/donor/login" element={<DonorLogin />} />
          <Route path="/volunteer/login" element={<VolunteerLogin />} />

          {/* Password Update Route */}
          <Route path="/update-password" element={<PasswordUpdate />} />

          {/* Dashboard Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />

          {/* Admin Management Pages */}
          <Route path="/admin/beneficiaries" element={<AdminBeneficiariesPage />} />
          <Route path="/admin/donors" element={<AdminDonorsPage />} />
          <Route path="/admin/volunteers" element={<AdminVolunteersPage />} />
          <Route path="/admin/food-inventory" element={<AdminFoodInventoryPage />} />
          <Route path="/admin/donations" element={<AdminDonationsPage />} />
          <Route path="/admin/deliveries" element={<AdminDeliveriesPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
