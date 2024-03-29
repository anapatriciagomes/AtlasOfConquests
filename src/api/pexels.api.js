import axios from 'axios';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/pexels`;

export const getPexelsImage = query => {
  return axios.get(baseURL, {
    params: {
      query: query,
      orientation: 'landscape',
      size: 'large',
    },
  });
};
