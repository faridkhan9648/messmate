import axios from 'axios';

const api = axios.create({
  baseURL: 'https://messmate-1g33.onrender.com', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

