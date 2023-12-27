import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import attractions from '../assets/attractions.json';
import Clock from '../components/Clock';
import AddRemoveVisited from '../components/AddRemoveVisited';
import AddRemoveWishlist from '../components/AddRemoveWishlist';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Borders from '../components/Borders';
import PopulationConverter from '../components/PopulationConverter';
import Weather from '../components/Weather';

function CountryPage({ loggedIn, loggedUserDetails, userId }) {
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState(null);
  const [photos, setPhotos] = useState(null);

  const { countryCode } = useParams();
  const { countryName } = useParams();

  useEffect(() => {
    if (countryCode) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/${countryCode}`)
        .then(response => {
          setCountries(response.data);
          setFetching(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setFetching(false);
        });
    }
  }, [countryCode]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (
          attractions[
            countryName.includes('-')
              ? countryName.replaceAll('-', ' ')
              : countryName
          ]?.attractions.length > 0
        ) {
          const randomIndex = Math.floor(
            Math.random() *
              attractions[
                countryName.includes('-')
                  ? countryName.replaceAll('-', ' ')
                  : countryName
              ]?.attractions.length
          );

          const randomAttraction =
            attractions[
              countryName.includes('-')
                ? countryName.replaceAll('-', ' ')
                : countryName
            ]?.attractions[randomIndex];

          const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${randomAttraction}`,
            {
              headers: {
                Authorization: import.meta.env.VITE_API_KEY,
              },
            }
          );

          setPhotos(response.data.photos);
        } else {
          console.warn('No attractions found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchImages();
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
      {photos && photos.length > 0 && (
        <div
          style={{
            backgroundImage: `url(${photos[0].src.large2x})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className='mt-[72px]'
        >
          {countries &&
            countries.map((country, index) => (
              <div
                key={index}
                className="flex flex-col text-justify justify-center pb-[100px] min-[1024px]:pb-[300px] min-[1280px]:pb-[500px]"
              >
                <h1 className='text-center text-xl mb-10 mt-[40px] mx-[40px] bg-white bg-opacity-70 p-4 rounded-md'>
                  {country.name.common} {country.flag}
                </h1>
                <div className='ml-10 text-justify max-w-[65%] bg-white bg-opacity-70 p-4 rounded-md '>
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
                {loggedIn ? (
                  <div className='flex'>
                    <AddRemoveVisited
                      loggedIn={loggedIn}
                      loggedUserDetails={loggedUserDetails}
                      loggedUserId={userId}
                      countryName={countryName}
                      className='ml-[40px]'
                    />
                    <AddRemoveWishlist
                      loggedIn={loggedIn}
                      loggedUserDetails={loggedUserDetails}
                      loggedUserId={userId}
                      countryName={countryName}
                      className='ml-[40px]'
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="mt-[72px]">
          {countries &&
            countries.map((country, index) => (
              <div
                key={index}
                className="flex flex-col text-justify justify-center pb-40"
              >
                <h1 className="text-center text-xl mb-10 mt-[40px] mx-[40px] bg-white bg-opacity-60 p-4 rounded-md">
                  {country.name.common} {country.flag}
                </h1>
                <div className="ml-10 text-justify max-w-[65%] bg-white bg-opacity-60 p-4 rounded-md ">
                  <p className="pb-3 ">
                    <span className="font-semibold">Capital: </span>
                    {country.capital.join(', ')}
                  </p>
                  <Weather capital={country.capital} />
                  <div className="pb-3">
                    <Clock
                      countryCode={country.cca2}
                      capital={country.capital.join(', ')}
                    />
                  </div>
                  <p className="pb-3">
                    <span className="font-semibold">Population:</span>{' '}
                    <PopulationConverter number={country.population} />
                  </p>
                  <p className="pb-3">
                    <span className="font-semibold">Area:</span> {country.area}m
                    <sup>2</sup>
                  </p>
                  <Borders borders={country.borders} />
                  <ul className="pt-3 pb-3">
                    {Object.entries(country.currencies).map(
                      ([currencyCode, currencyInfo]) => (
                        <li key={currencyCode}>
                          <span className="font-semibold">Currency:</span>{' '}
                          {currencyInfo.name} ({currencyInfo.symbol})
                        </li>
                      )
                    )}
                  </ul>
                  <p className="pb-3">
                    <span className="font-semibold">Continent:</span>{' '}
                    {country.region}
                  </p>
                  {attractions[country.name.common]?.attractions && (
                    <div className="pb-3">
                      <span className="font-semibold">Points of Interest:</span>
                      <ul>
                        <li className="flex flex-col">
                          {attractions[country.name.common].attractions.join(
                            ', '
                          )}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <AddRemoveVisited
                    loggedIn={loggedIn}
                    loggedUserDetails={loggedUserDetails}
                    loggedUserId={userId}
                    countryName={countryName}
                    className="ml-[40px]"
                  />
                  <AddRemoveWishlist
                    loggedIn={loggedIn}
                    loggedUserDetails={loggedUserDetails}
                    loggedUserId={userId}
                    countryName={countryName}
                    className="ml-[40px]"
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CountryPage;
