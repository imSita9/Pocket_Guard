/*import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users';

export const registerUser = async (formData) => {
    return await axios.post(`${API_URL}/register`, formData);
};

export const getUsers = async () => {
    return await axios.get(`${API_URL}/all`);
};*/


import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const registerUser = async (formData) => {
    return await axios.post(`${API_URL}/register`, formData);
};

export const loginUser = async (formData) => {
    return await axios.post(`${API_URL}/login`, formData);
};

export const getUsers = async () => {
    return await axios.get(`${API_URL}/all`); // make sure backend supports this
};
