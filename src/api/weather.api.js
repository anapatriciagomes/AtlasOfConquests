import axios from 'axios';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/weather`;

export const getWeatherData = city => {
  return axios.get(baseURL, {
    params: {
      city: city,
    },
  });
};
