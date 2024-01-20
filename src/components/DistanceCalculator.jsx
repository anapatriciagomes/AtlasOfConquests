import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CountryCodeConverter from './CountryCodeConverter';

function DistanceCalculator({ lat, lng, countryName }) {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

  const [distances, setDistances] = useState({
    kilometers: 0,
    miles: 0,
  });

  const [country, setCountry] = useState('');

  function haversineDistance(coords1, coords2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    const lon1 = coords1.lon;
    const lat1 = coords1.lat;

    const lon2 = coords2.lon;
    const lat2 = coords2.lat;

    const R = 6371; // Earth radius in kilometers
    const MILES_CONVERSION = 0.621371;

    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKilometers = R * c;
    const distanceInMiles = distanceInKilometers * MILES_CONVERSION;

    return {
      kilometers: distanceInKilometers,
      miles: distanceInMiles,
    };
  }

  async function reverseGeocode(latitude, longitude) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data.address && data.address.country) {
        setCountry(data.address.country);
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
    }
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.error('Error getting geolocation:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not available in your browser.');
    }
  }, []);

  useEffect(() => {
    if (position.latitude !== null && position.longitude !== null) {
      const coords1 = { lat: position.latitude, lon: position.longitude };
      const coords2 = { lat: lat, lon: lng };
      const newDistances = haversineDistance(coords1, coords2);
      setDistances(newDistances);
      reverseGeocode(position.latitude, position.longitude);
    }
  }, [lat, lng, position]);

  if (countryName === country) {
    return null;
  }

  return (
    <div className='pb-3'>
      <span className='font-semibold'>Your distance:</span>
      <span>
        {position.latitude && position.longitude ? (
          <p>
            <Link
              className={`text-[#ef914e] font-semibold hover:text-[#F53]`}
              to={`/country/${CountryCodeConverter({
                countryName: country,
              })}/${country.replaceAll(' ', '-')}`}
            >
              {country}
            </Link>{' '}
            is around
            <span className='font-semibold'>
              {' '}
              {` ${distances.kilometers.toFixed(0)} km `}
            </span>{' '}
            {`(${distances.miles.toFixed(0)} mi)`}{' '}
            {countryName.charAt(countryName.length - 1) === 's'
              ? `from ${countryName}' center!`
              : `from ${countryName}'s center!`}
          </p>
        ) : (
          <p>
            Please enable your <span className='font-semibold'>location</span>{' '}
            to see how far away you are from {countryName}.
          </p>
        )}
      </span>
    </div>
  );
}

export default DistanceCalculator;
