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
          const timeInCountry = countryTime.format('HH:mm | YYYY-MM-DD');
          setCurrentTime(`${timeInCountry}`);
        } else {
          setCurrentTime(`Invalid country code: ${countryCode}`);
        }
      } catch (error) {
        console.error('Error fetching timezone data:', error);
      }
    };

    fetchData();
  }, [countryCode, capital]);

  return (
    <div>
      <h2 className='text-sm'>
        Time in {capital}: <span className='font-semibold'> {currentTime}</span>
      </h2>
    </div>
  );
};

export default Clock;
