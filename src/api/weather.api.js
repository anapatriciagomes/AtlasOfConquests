import axios from 'axios';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/weather`;

export const getWeatherData = async city => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        city: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch weather data');
  }
};
