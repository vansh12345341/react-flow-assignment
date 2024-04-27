import axios from 'axios';

const BASE_URL = "https://react-flow-server.onrender.com";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default api;
