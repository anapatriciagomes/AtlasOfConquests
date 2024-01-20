import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CountryCodeConverter from './CountryCodeConverter';

function DistanceCalculator({ lat, lng }) {
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

    var lon1 = coords1.lon;
    var lat1 = coords1.lat;

    var lon2 = coords2.lon;
    var lat2 = coords2.lat;

    var R = 6371; // Earth radius in kilometers
    var MILES_CONVERSION = 0.621371;

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distanceInKilometers = R * c;
    var distanceInMiles = distanceInKilometers * MILES_CONVERSION;

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

  return (
    <>
      <span>
        {position.latitude && position.longitude ? (
          <p>
            You are in{' '}
            <Link
              className={`text-[#ef914e] font-semibold hover:text-[#F53]`}
              to={`/country/${CountryCodeConverter({
                countryName: country,
              })}/${country.replaceAll(' ', '-')}`}
            >
              {country}
            </Link>{' '}
            <span className='font-semibold'>
              {' '}
              - {` ${distances.kilometers.toFixed(1)} km `}
            </span>{' '}
            {`(${distances.miles.toFixed(
              1
            )} mi) away from this country's center!`}
          </p>
        ) : (
          <p>
            Please enable your location to know how far away you are from this
            country.
          </p>
        )}
      </span>
    </>
  );
}

export default DistanceCalculator;
