import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800/api', // Set your base URL here
  withCredentials: true, // Enable credentials globally
  headers: {
    'Content-Type': 'application/json', // Set custom headers here
    // Add other headers if needed
  },
});

export default axiosInstance;