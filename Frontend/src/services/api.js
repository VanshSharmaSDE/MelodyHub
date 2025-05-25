import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://melodyhub-pr26.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to set auth token for requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Check if there's a token in localStorage and set it
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export default api;
