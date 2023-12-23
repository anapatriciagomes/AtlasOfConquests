import { useState, useEffect } from 'react';
import OpenWeatherAPI from 'openweather-api-node';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Weather({ capital }) {
  let firstCity = capital.length > 0 ? capital[0] : '';
  const [fetching, setFetching] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentConditions, setCurrentConditions] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (firstCity === 'Washington, D.C.') {
        firstCity = 'Washington';
      }
      try {
        const weather = new OpenWeatherAPI({
          key: `${import.meta.env.VITE_API_WEATHER_KEY}`,
          locationName: encodeURIComponent(firstCity),
          units: 'metric',
        });
        const data = await weather.getCurrent();
        setFetching(false);
        setCurrentTemperature(data.weather.temp.cur);
        setCurrentConditions(data.weather.icon.url);
        setFeelsLike(data.weather.feelsLike.cur);
        setDescription(data.weather.description);
        setHumidity(data.weather.humidity);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setFetching(false);
      }
    };

    fetchWeather();
  }, [firstCity]);

  return (
    <div>
      {fetching && (
        <div className='mt-[80px] text-center'>
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
            <div className='flex items-center'>
              {' '}
              <img
                className='w-[50px]'
                src={currentConditions}
                alt='weather conditions'
              />
              <span className='text-xl'>
                {Math.round(currentTemperature)}°C
              </span>
            </div>{' '}
            <div className='text-xs pb-3'>
              <p>
                Feels like {feelsLike.toFixed(1)}°C |{' '}
                {description.charAt(0).toUpperCase() + description.slice(1)}. |
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
