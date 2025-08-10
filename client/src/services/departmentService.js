import axios from "axios";

const BASE_URL = "http://localhost:8080/api/departments";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Fetch all departments
export const getAllDepartments = () =>
  axios.get(BASE_URL, { headers: getAuthHeaders() });

// Create a new department
export const createDepartment = (departmentData) =>
  axios.post(BASE_URL, departmentData, { headers: getAuthHeaders() });

// Update an existing department by ID
export const updateDepartment = (id, departmentData) =>
  axios.put(`${BASE_URL}/${id}`, departmentData, { headers: getAuthHeaders() });

// Delete a department by ID
export const deleteDepartment = (id) =>
  axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
