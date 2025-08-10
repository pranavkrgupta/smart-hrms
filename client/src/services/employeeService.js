import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getEmployees = () =>
  axios.get(`${BASE_URL}/admin/users`, { headers: getAuthHeaders() });

export const addEmployee = (employeeData) =>
  axios.post(`${BASE_URL}/add`, employeeData, { headers: getAuthHeaders() });

export const getEmployeeById = (user_id) =>
  axios.get(`${BASE_URL}/${user_id}`, { headers: getAuthHeaders() });

export const deleteEmployeeById = (user_id) =>
  axios.delete(`${BASE_URL}/${user_id}`, { headers: getAuthHeaders() });

export const updateEmployeeById = (user_id, employeeData) =>
  axios.put(`${BASE_URL}/${user_id}`, employeeData, { headers: getAuthHeaders() });
