import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import attractions from '../assets/attractions.json';
import Clock from '../components/Clock';
import ImageGenerator from '../components/ImageGenerator';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Borders from '../components/Borders';
import PopulationConverter from '../components/PopulationConverter';
import Weather from '../components/Weather';

/* import CountryMap from '../components/CountryMap'; */

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

      {countries &&
        countries.map((country, index) => (
          <div key={index} className='mt-[70px]'>
            <ImageGenerator
              countryName={country.name.common}
              attractions={attractions[country.name.common]?.attractions}
            />

            <div className='absolute top-0 left-10 right-0 bottom-0 flex flex-col text-justify justify-center '>
              <h1 className='text-center text-xl mb-10'>
                {country.name.common} {country.flag}
              </h1>
              <div className='text-justify ml-5 max-w-[45vw] bg-white bg-opacity-60 p-4 rounded-md '>
                <p className='pb-3 '>
                  <span className='font-semibold'>Capital: </span>
                  {country.capital.join(', ')}
                </p>
                <Weather capital={country.capital} />
                <div className='pb-3'>
                  <Clock
                    countryCode={country.cca2}
                    capital={country.capital.join(', ')}
                  />
                </div>
                <p className='pb-3'>
                  <span className='font-semibold'>Population:</span>{' '}
                  <PopulationConverter number={country.population} />
                </p>
                <p className='pb-3'>
                  <span className='font-semibold'>Area:</span> {country.area}m
                  <sup>2</sup>
                </p>
                <Borders borders={country.borders} />
                <ul className='pt-3 pb-3'>
                  {Object.entries(country.currencies).map(
                    ([currencyCode, currencyInfo]) => (
                      <li key={currencyCode}>
                        <span className='font-semibold'>Currency:</span>{' '}
                        {currencyInfo.name} ({currencyInfo.symbol})
                      </li>
                    )
                  )}
                </ul>
                <p className='pb-3'>
                  <span className='font-semibold'>Continent:</span>{' '}
                  {country.region}
                </p>
                {attractions[country.name.common]?.attractions && (
                  <div className='pb-3'>
                    <span className='font-semibold'>Points of Interest:</span>
                    <ul>
                      <li className='flex flex-col'>
                        {attractions[country.name.common].attractions.join(
                          ', '
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      {/* <CountryMap /> */}
    </div>
  );
}

export default CountryPage;
