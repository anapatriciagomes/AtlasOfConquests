import axios from 'axios';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

export const getUserDetails = userId => {
  return axios.get(`${baseURL}/users/${userId}`);
};

export const changePassword = user => {
  return axios.put(`${baseURL}/users/${user._id}`, user);
};

export const deleteAccount = userId => {
  return axios.delete(`${baseURL}/users/${userId}`);
};

export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  });
};
