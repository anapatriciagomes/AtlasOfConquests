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
import GoogleMaps from '../components/GoogleMaps';

function CountryPage({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  userId,
  darkMode,
}) {
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState(null);
  const [photoStyle, setPhotoStyle] = useState({});

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

  const fetchAPIImages = async () => {
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
          `https://api.pexels.com/v1/search?query=${randomAttraction}${' '}${countryName.replaceAll(
            '-',
            ' '
          )}&orientation=landscape&size=large`,
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
            },
          }
        );

        setPhotoStyle({
          backgroundImage: `url(${response.data.photos[0].src.large2x})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        });
      } else {
        console.warn('No attractions found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchImagesURL = async () => {
    try {
      const photosRandomIndex = Math.floor(
        Math.random() *
          attractions[
            countryName.includes('-')
              ? countryName.replaceAll('-', ' ')
              : countryName
          ].imageURLs.length
      );
      const randomPhoto =
        attractions[
          countryName.includes('-')
            ? countryName.replaceAll('-', ' ')
            : countryName
        ].imageURLs.length > 0
          ? attractions[
              countryName.includes('-')
                ? countryName.replaceAll('-', ' ')
                : countryName
            ].imageURLs[photosRandomIndex]
          : attractions[
              countryName.includes('-')
                ? countryName.replaceAll('-', ' ')
                : countryName
            ].imageURLs[0];

      setPhotoStyle({
        backgroundImage: `url(${randomPhoto})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (
      Object.keys(
        attractions[
          countryName.includes('-')
            ? countryName.replaceAll('-', ' ')
            : countryName
        ]
      ).includes('imageURLs')
    ) {
      fetchImagesURL();
    } else {
      fetchAPIImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName]);

  const formatArea = area => {
    let formattedNumber = area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedNumber;
  };

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

      <div style={photoStyle} className='mt-[72px]'>
        {countries &&
          countries.map((country, index) => (
            <div
              key={index}
              className='flex flex-col text-justify justify-center pb-[200px] min-[1024px]:pb-[300px] min-[1280px]:pb-[500px]'
            >
              <div
                className={`flex justify-center items-center mb-10 mt-[40px] mx-auto w-[1050px] ${
                  darkMode ? 'bg-[#222222]' : 'bg-white'
                } bg-opacity-70 p-4 rounded-md`}
              >
                <h1 className='text-center text-xl mr-[10px]'>
                  {country.name.common}
                </h1>
                <img src={country.flags.png} style={{ height: '15px' }} />
              </div>

              <div className='flex mx-auto items-center'>
                <div
                  className={`mr-[50px] text-justify w-[500px] ${
                    darkMode ? 'bg-[#222222]' : 'bg-white'
                  } bg-opacity-70 p-4 rounded-md`}
                >
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
                    <span className='font-semibold'>Area:</span>{' '}
                    {formatArea(country.area)} m<sup>2</sup>
                  </p>
                  <Borders borders={country.borders} />
                  <p className='pt-3  font-semibold'>
                    {Object.keys(country.languages).length === 1
                      ? 'Official Language: '
                      : 'Official Languages: '}
                    {Object.entries(country.languages).map(
                      ([languageCode, language], index) => (
                        <span key={languageCode} className='font-normal'>
                          {index > 0 && ', '}
                          {language}
                        </span>
                      )
                    )}
                  </p>
                  <ul className='pt-3 pb-3'>
                    <li>
                      <span className='font-semibold'>
                        {Object.entries(country.currencies).length === 1
                          ? 'Currency: '
                          : 'Currencies: '}
                      </span>
                      {Object.values(country.currencies)
                        .map(
                          currencyInfo =>
                            `${currencyInfo.name} (${currencyInfo.symbol})`
                        )
                        .join(', ')}
                    </li>
                  </ul>
                  <p className='pb-3  font-semibold'>
                    {Object.keys(country.continents).length === 1
                      ? 'Continent: '
                      : 'Continents: '}
                    {Object.entries(country.continents).map(
                      ([continentCode, continent], index) => (
                        <span key={continentCode} className='font-normal'>
                          {index > 0 && ' and '}
                          {continent}
                        </span>
                      )
                    )}
                  </p>
                  {attractions[countryName.replaceAll('-', ' ')]
                    ?.attractions && (
                    <div className='pb-3'>
                      <span className='font-semibold'>Points of Interest:</span>
                      <ul>
                        <li className='flex flex-col'>
                          {attractions[
                            countryName.replaceAll('-', ' ')
                          ].attractions.join(', ')}
                        </li>
                      </ul>
                    </div>
                  )}
                  {loggedIn ? (
                    <div className='flex justify-between mx-auto mt-[20px] w-[400px]'>
                      <AddRemoveVisited
                        loggedIn={loggedIn}
                        loggedUserDetails={loggedUserDetails}
                        setLoggedUserDetails={setLoggedUserDetails}
                        loggedUserId={userId}
                        countryName={countryName}
                      />
                      <AddRemoveWishlist
                        loggedIn={loggedIn}
                        loggedUserDetails={loggedUserDetails}
                        setLoggedUserDetails={setLoggedUserDetails}
                        loggedUserId={userId}
                        countryName={countryName}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <GoogleMaps
                  lat={country.latlng[0]}
                  lng={country.latlng[1]}
                  area={country.area}
                  darkMode={darkMode}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CountryPage;
