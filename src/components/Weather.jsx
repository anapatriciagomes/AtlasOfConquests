import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

function Weather({ capital }) {
  let firstCity = capital.length > 0 ? capital[0] : '';
  const [fetching, setFetching] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentConditions, setCurrentConditions] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const fetchWeather = async () => {
    if (firstCity === 'Washington, D.C.') {
      firstCity = 'Washington';
    }
    let formattedCity = firstCity.replace(/ /g, '.');
    formattedCity = formattedCity
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          formattedCity
        )}&appid=${import.meta.env.VITE_API_WEATHER_KEY}&units=metric`
      );
      const data = response.data;
      setFetching(false);
      setCurrentTemperature(data.main.temp);
      setCurrentConditions(data.weather[0].icon);
      setFeelsLike(data.main.feels_like);
      setDescription(data.weather[0].description);
      setHumidity(data.main.humidity);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [firstCity]);

  return (
    <div>
      {fetching && (
        <div className="mt-[80px] text-center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '300px',
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}
      <>
        {currentTemperature !== null ? (
          <>
            <div className="flex items-center">
              {' '}
              <img
                className="w-[50px]"
                src={`http://openweathermap.org/img/wn/${currentConditions}@2x.png`}
                alt="weather conditions"
              />
              <span className="text-xl">
                {Math.round(currentTemperature)}°C
              </span>
            </div>{' '}
            <div className="text-xs">
              <p>
                Feels like {feelsLike.toFixed(1)}°C |{' '}
                {description.charAt(0).toUpperCase() + description.slice(1)} |
                Humidity: {humidity}%
              </p>
            </div>
          </>
        ) : (
          <p>
            <CircularProgress />
          </p>
        )}
      </>
    </div>
  );
}

export default Weather;
