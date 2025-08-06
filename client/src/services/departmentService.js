import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/departments";

export const getEmployees = () => axios.get(BASE_URL);
