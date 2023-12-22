import { useState, useEffect } from 'react';
import OpenWeatherAPI from 'openweather-api-node';

function Weather({ capital }) {
  const firstCity = capital.length > 0 ? capital[0] : '';

  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentConditions, setCurrentConditions] = useState(null);

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
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [firstCity]);

  return (
    <div>
      {currentTemperature !== null ? (
        <p>
          <p>
            Current temperature in {firstCity} is{' '}
            {currentTemperature.toFixed(1)}
            °C
          </p>
          <img src={currentConditions} alt='weather conditions' />
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
