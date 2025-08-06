import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/users";

export const getEmployees = () => axios.get(BASE_URL);

export const addEmployee = (employeeData) => axios.post(BASE_URL, employeeData);

export const getEmployeeById = (user_id) => axios.get(`${BASE_URL}/${user_id}`);

export const deleteEmployeeById = (user_id) => axios.delete(`${BASE_URL}/${user_id}`);