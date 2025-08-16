import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = "http://myhrms.duckdns.org:8080/api/leaves";

// Employee APIs
export const addLeave = (leaveData) => {
    const token = localStorage.getItem("token");
    return axios.post(`${BASE_URL}/employee`, leaveData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getMyLeaves = () => {
    const token = localStorage.getItem("token");
    return axios.get(`${BASE_URL}/employee`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateLeave = (leaveId, leaveData) => {
    const token = localStorage.getItem("token");
    return axios.put(`${BASE_URL}/employee/${leaveId}`, leaveData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteLeave = (leaveId) => {
    const token = localStorage.getItem("token");
    return axios.delete(`${BASE_URL}/employee/${leaveId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Admin APIs
export const approveLeave = (leaveId, comment) => {
    const token = localStorage.getItem("token");
    return axios.put(`${BASE_URL}/admin/approve/${leaveId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
        params: comment ? { comment } : {}
    });
};

export const rejectLeave = (leaveId, comment) => {
    const token = localStorage.getItem("token");
    return axios.put(`${BASE_URL}/admin/reject/${leaveId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
        params: comment ? { comment } : {}
    });
};

export const getAllLeaves = () => {
    const token = localStorage.getItem("token");
    return axios.get(`${BASE_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Optional helper to get user info from token
export const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
