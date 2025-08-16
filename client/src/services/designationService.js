import axios from "axios";

const BASE_URL = "http://hrms-server:8080/api/designations";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getDesignations = () =>
  axios.get(BASE_URL, { headers: getAuthHeaders() });

export const createDesignation = (designationData) =>
  axios.post(BASE_URL, designationData, { headers: getAuthHeaders() });

export const updateDesignation = (id, designationData) =>
  axios.put(`${BASE_URL}/${id}`, designationData, { headers: getAuthHeaders() });

export const deleteDesignation = (id) =>
  axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
