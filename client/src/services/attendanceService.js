import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = "https://myhrms.duckdns.org:8080/api";

export const getAllAttendance = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${BASE_URL}/admin/attendance`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const checkIn = () => {
  const token = localStorage.getItem("token");

  return axios.post(`${BASE_URL}/employee/attendance/checkin`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );
}

export const checkOut = () => {
  const token = localStorage.getItem("token");

  return axios.put(`${BASE_URL}/employee/attendance/checkout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );
}

export const getAttendanceByUser = () => {
  const token = localStorage.getItem("token");
  const userId = jwtDecode(token).userId;

  return axios.get(`${BASE_URL}/employee/attendance/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
