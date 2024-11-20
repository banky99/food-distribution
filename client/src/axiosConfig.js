import axios from 'axios';

// Base URL for your API
axios.defaults.baseURL = 'http://192.168.56.1:3000';

// Clear any default headers
axios.defaults.headers.common = {};

// Set default Content-Type for POST requests
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Optionally include Authorization header if you need tokens globally
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
