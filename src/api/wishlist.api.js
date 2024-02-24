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

export const getAllWishlistCountries = () => {
  return axios.get(`${baseURL}/wishlist`);
};

export const getWishlistCountry = countryId => {
  return axios.get(`${baseURL}/wishlist/${countryId}`);
};

export const addWishlistCountry = wishlistCountry => {
  return axios.post(`${baseURL}/wishlist`, wishlistCountry);
};

export const deleteWishlistCountry = countryId => {
  return axios.delete(`${baseURL}/wishlist/${countryId}`);
};
