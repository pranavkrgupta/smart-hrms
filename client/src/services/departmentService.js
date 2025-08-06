import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/departments";

export const getEmployees = () => axios.get(BASE_URL);

export const addDepartment = (departmentData) => axios.post(BASE_URL, departmentData);
