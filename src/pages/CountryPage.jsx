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
              countryCode={attractions[country.name.common]?.attraction}
            />

            <div className='absolute top-0 left-10 right-0 bottom-0 flex flex-col text-justify justify-center '>
              <h1 className='text-center text-xl mb-10'>
                {country.name.common} {country.flag}
              </h1>
              <div className='text-justify ml-5 w-[60vh] bg-white bg-opacity-60 p-4 rounded-md'>
                <p className='pb-3 '>
                  <span className='font-semibold'>Capital:</span>
                  {country.capital.join(', ')}
                </p>
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
                        {currencyInfo.symbol} {currencyInfo.name}
                      </li>
                    )
                  )}
                </ul>
                <p className='pb-3'>
                  <span className='font-semibold'>Continent:</span>{' '}
                  {country.region}
                </p>
                <div className='pb-3'>
                  <Clock
                    countryCode={country.cca2}
                    capital={country.capital.join(', ')}
                  />
                </div>
                <p className='pb-3'>
                  <span className='font-semibold'>Point of Interest:</span>
                  {attractions[country.name.common]?.attraction}
                </p>
              </div>
            </div>
          </div>
        ))}
      {/* <CountryMap /> */}
    </div>
  );
}

export default CountryPage;
