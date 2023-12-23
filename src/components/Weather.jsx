import { useState, useEffect } from 'react';
import OpenWeatherAPI from 'openweather-api-node';

function Weather({ capital }) {
  const firstCity = capital.length > 0 ? capital[0] : '';

  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentConditions, setCurrentConditions] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [sunrise, setSunrise] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weather = new OpenWeatherAPI({
          key: `${import.meta.env.VITE_API_WEATHER_KEY}`,
          locationName: encodeURIComponent(firstCity),
          units: 'metric',
        });
        const data = await weather.getCurrent();
        console.log(data);
        setCurrentTemperature(data.weather.temp.cur);
        setCurrentConditions(data.weather.icon.url);
        setFeelsLike(data.weather.feelsLike.cur);
        setDescription(data.weather.description);
        setHumidity(data.weather.humidity);
        setSunrise(data.astronomical.sunrise);
        setSunset(data.astronomical.sunset);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [firstCity]);

  const formatSunsetTime = () => {
    if (sunset instanceof Date) {
      return `${sunset.getHours()}h${String(sunset.getMinutes()).padStart(
        2,
        '0'
      )}`;
    } else {
      const sunsetDate = new Date(sunset);
      return `${sunsetDate.getHours()}:${String(
        sunsetDate.getMinutes()
      ).padStart(2, '0')}`;
    }
  };

  const formatSunriseTime = () => {
    if (sunrise instanceof Date) {
      return `${sunrise.getHours()}h${String(sunrise.getMinutes()).padStart(
        2,
        '0'
      )}`;
    } else {
      const sunriseDate = new Date(sunrise);
      return `${sunriseDate.getHours()}:${String(
        sunriseDate.getMinutes()
      ).padStart(2, '0')}`;
    }
  };

  return (
    <>
      {currentTemperature !== null ? (
        <>
          <p className='flex items-center'>
            {' '}
            <img
              className='w-[50px]'
              src={currentConditions}
              alt='weather conditions'
            />
            <span className='text-xl'>{currentTemperature.toFixed(1)}°C</span>
          </p>{' '}
          <p className='text-sm pb-4'>
            Feels like {feelsLike.toFixed(1)}°C.{' '}
            {description.charAt(0).toUpperCase() + description.slice(1)}.{' '}
            Humidity:{humidity}%{' '}
            <p>
              Sunrise: {formatSunriseTime()}m | Sunset: {formatSunsetTime()}m
            </p>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Weather;
