import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/auth/login";

export const loginService = (email, password) => axios.post(BASE_URL, { email, password });