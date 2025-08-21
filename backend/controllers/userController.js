import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users';

export const registerUser = async (formData) => {
    // Ensure formData includes username
    if (!formData.username) {
        throw new Error("Username is required");
    }
    return await axios.post(`${API_URL}/register`, formData);
};

export const loginUser = async (formData) => {
    // Ensure formData includes email and password
    if (!formData.email || !formData.password) {
        throw new Error("Email and password are required");
    }
    return await axios.post(`${API_URL}/login`, formData);
};

export const getUsers = async () => {
    return await axios.get(`${API_URL}/all`);
};
