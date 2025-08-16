import axios from 'axios';

const BASE_URL = "http://hrms-server:8080/api/auth";

export const loginService = (email, password) => axios.post(`${BASE_URL}/login`, { email, password });

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const updatePassword = (password) => {
  return axios.post(`${BASE_URL}/change-password`, password, {
    headers: getAuthHeaders(),
  });
};