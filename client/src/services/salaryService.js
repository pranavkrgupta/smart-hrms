import axios from "axios";

const BASE_URL = "https://myhrms.duckdns.org:8080/api/salaries";

export const getAllSalaries = () => {
  const token = localStorage.getItem("token");
  return axios.get(BASE_URL + "/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createSalary = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(BASE_URL + "/admin", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateSalary = (id, data) => {
  const token = localStorage.getItem("token");
  return axios.put(`${BASE_URL}/admin/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSalaryByUser = (userId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/employee`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

