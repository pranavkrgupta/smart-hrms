import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/users";

export const getEmployees = () => axios.get(BASE_URL);

export const addEmployee = (employeeData) => axios.post(`${BASE_URL}/add`, employeeData);

export const getEmployeeById = (user_id) => axios.get(`${BASE_URL}/${user_id}`);

export const deleteEmployeeById = (user_id) => axios.delete(`${BASE_URL}/${user_id}`);

export const updateEmployeeById = (user_id, employeeData) => axios.put(`${BASE_URL}/${user_id}`, employeeData);