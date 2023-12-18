//import.meta.env.VITE_API_URL;
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import attractions from '../assets/attractions.json';
import Clock from '../components/Clock';

function CountryPage() {
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/brazil`)
      .then(response => {
        setCountries(response.data);
        setFetching(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
      });
  }, []);

  return (
    <div>
      {fetching && <p>Loading ...</p>}
      {countries &&
        countries.map((country, index) => (
          <div key={index} className='mt-[80px]'>
            <h1 className='mt-[80px] text-center'>
              {country.name.common} {country.flag}
            </h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>
              Area: {country.area}m<sup>2</sup>
            </p>
            <p>Borders: {country.borders}</p>
            <p>
              {Object.entries(country.currencies).map(
                ([currencyCode, currencyInfo]) => (
                  <p key={currencyCode}>
                    Currency: {currencyInfo.symbol} {currencyInfo.name}
                  </p>
                )
              )}
            </p>
            <p>
              Timezones: {country.timezones}
              <Clock countryCode='{country.cca2}' />
            </p>
            <p>Continent: {country.region}</p>
            <p>
              Point of Interest:
              {attractions[country.name.common] &&
                attractions[country.name.common].attraction}
            </p>
          </div>
        ))}
    </div>
  );
}

export default CountryPage;
