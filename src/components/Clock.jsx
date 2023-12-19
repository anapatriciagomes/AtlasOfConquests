import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import countryTimezone from 'country-timezone';

const Clock = ({ countryCode, capital }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timezones = await countryTimezone.getTimezonesWithCountryCode(
          countryCode
        );

        if (timezones.length > 0) {
          const timezone = timezones[0];
          const countryTime = moment().tz(timezone);
          const timeInCountry = countryTime.format('YYYY-MM-DD HH:mm');
          setCurrentTime(`Time in ${capital}: ${timeInCountry}`);
        } else {
          setCurrentTime(`Invalid country code: ${countryCode}`);
        }
      } catch (error) {
        console.error('Error fetching timezone data:', error);
      }
    };

    fetchData();
  }, [countryCode, capital]);

  let currentDate = new Date();
  let localTime = currentDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });
  let localDate = currentDate.toISOString().split('T')[0];

  // Use 24-hour format
  return (
    <div>
      <h2>{currentTime}</h2>
      <h2>{`Your local time: ${localDate} ${localTime}`}</h2>
    </div>
  );
};

export default Clock;
