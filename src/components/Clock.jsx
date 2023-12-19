import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import countryTimezone from 'country-timezone';

const Clock = ({ countryCode, capital }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timezones = countryTimezone.getTimezonesWithCountryCode(countryCode);

    if (timezones.length > 0) {
      const timezone = timezones[0];
      const timeInCountry = moment().tz(timezone).format('hh:mm:ss A');
      setCurrentTime(`Current time in ${capital}: ${timeInCountry}`);
    } else {
      setCurrentTime(`Invalid country code: ${countryCode}`);
    }
  }, [countryCode]);

  return (
    <div>
      <h2>{currentTime}</h2>
    </div>
  );
};

export default Clock;
