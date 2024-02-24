import axios from 'axios';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  });
};

setAuthorizationHeaders();

export const getAllVisitedCountries = () => {
  return axios.get(`${baseURL}/visited`);
};

export const getVisitedCountry = countryId => {
  return axios.get(`${baseURL}/visited/${countryId}`);
};

export const addVisitedCountry = visitedCountry => {
  return axios.post(`${baseURL}/visited`, visitedCountry);
};

export const deleteVisitedCountry = countryId => {
  return axios.delete(`${baseURL}/visited/${countryId}`);
};
