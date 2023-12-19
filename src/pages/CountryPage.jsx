// Import necessary libraries and components
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import attractions from '../assets/attractions.json';
import Clock from '../components/Clock';

function CountryPage() {
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState(null);
  const { countryName } = useParams();

  useEffect(() => {
    if (countryName) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/${countryName}`)
        .then(response => {
          setCountries(response.data);
          setFetching(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setFetching(false);
        });
    }
  }, [countryName]);

  return (
    <div>
      {fetching && <p className='mt-[80px] text-center'>Loading...</p>}
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
            <ul>
              {Object.entries(country.currencies).map(
                ([currencyCode, currencyInfo]) => (
                  <li key={currencyCode}>
                    Currency: {currencyInfo.symbol} {currencyInfo.name}
                  </li>
                )
              )}
            </ul>
            <p>Continent: {country.region}</p>
            <p>
              <p>
                <Clock countryCode={country.cca2} capital={country.capital} />
              </p>
              {}
            </p>
            <p>
              Point of Interest: {attractions[country.name.common]?.attraction}
            </p>
          </div>
        ))}
    </div>
  );
}

export default CountryPage;
