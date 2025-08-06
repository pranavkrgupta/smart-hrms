import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/designations";

export const getDesignations = () => axios.get(BASE_URL);