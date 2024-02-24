import { useState, useEffect, useContext } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import CountryCodeConverter from '../components/CountryCodeConverter';
import AddRemoveVisited from '../components/AddRemoveVisited';
import AddRemoveWishlist from '../components/AddRemoveWishlist';
import RandomCountry from '../components/RandomCountry';
import geoUrl from '../assets/features.json';
import { AuthContext } from '../context/auth.context';

function MapVisitedWishList({
  loggedUserDetails,
  setLoggedUserDetails,
  darkMode,
}) {
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [wishlistCountries, setWishlistCountries] = useState([]);
  const [tooltipContent, setTooltipContent] = useState('');

  const { loggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      loggedUserDetails &&
      loggedUserDetails.visited &&
      loggedUserDetails.wishlist
    ) {
      setVisitedCountries(loggedUserDetails.visited);
      setWishlistCountries(loggedUserDetails.wishlist);
    }
  }, [loggedUserDetails]);

  const [position, setPosition] = useState({
    coordinates: [15, 0],
    zoom: 1,
  });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  async function handleClick(geo) {
    try {
      if (geo.properties.name === 'West Bank') {
        navigate(`/country/ps/Palestine`);
      } else {
        const countryCode = await CountryCodeConverter({
          countryName: geo.properties.name,
        });
        const countryName = geo.properties.name;
        const lowercaseCountryCode = countryCode.toLowerCase();
        navigate(
          `/country/${lowercaseCountryCode}/${countryName.replaceAll(' ', '-')}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleClickTooltip(country) {
    try {
      const countryCode = await CountryCodeConverter({
        countryName: country,
      });
      const countryName = country;
      const lowercaseCountryCode = countryCode.toLowerCase();
      navigate(
        `/country/${lowercaseCountryCode}/${countryName.replaceAll(' ', '-')}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  const gradientColors = ['rgba(149, 117, 205, 1)', 'rgba(174, 213, 129, 1)'];
  const gradientColorsHover = ['rgba(103,58,183,1)', 'rgba(139,195,75,1)'];

  return (
    <div className="w-4/5 mx-auto mt-[70px] max-[1010px]:w-[95%] max-[381px]:mt-[140px]">
      {loggedUserDetails && visitedCountries && wishlistCountries && (
        <div>
          <ComposableMap>
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const isVisited = visitedCountries.some(
                      visited => visited.country === geo.properties.name
                    );
                    const isWishlist = wishlistCountries.some(
                      wishlist => wishlist.country === geo.properties.name
                    );

                    let fillColor = '';
                    let hoverFillColor = '';
                    let pressedFillColor = '';
                    let style = {};

                    if (isVisited && !isWishlist) {
                      fillColor = '#aed581';
                      hoverFillColor = '#8bc34b';
                      pressedFillColor = '#8bc34b';
                    } else if (isWishlist && !isVisited) {
                      fillColor = '#9575cd';
                      hoverFillColor = '#673ab7';
                      pressedFillColor = '#673ab7';
                    } else if (isVisited && isWishlist) {
                      fillColor = `url(#gradient)`;
                      hoverFillColor = `url(#gradientHover)`;
                      pressedFillColor = `url(#gradientHover)`;
                    } else {
                      fillColor = darkMode ? '#f08b42' : '#faaa70';
                      hoverFillColor = '#ff6b00';
                      pressedFillColor = '#ff6b00';
                    }

                    return (
                      <a key={geo.rsmKey} className="country-tooltip">
                        <Geography
                          geography={geo}
                          fill={fillColor}
                          stroke="#d1d1d1"
                          onMouseEnter={() => {
                            geo.properties.name === 'West Bank'
                              ? setTooltipContent('Palestine')
                              : setTooltipContent(geo.properties.name);
                          }}
                          onClick={() => handleClick(geo)}
                          className="cursor-pointer"
                          style={{
                            default: {
                              outline: 'none',
                            },
                            hover: {
                              outline: 'none',
                              fill: hoverFillColor,
                            },
                            pressed: {
                              outline: 'none',
                              fill: pressedFillColor,
                            },
                            ...style,
                          }}
                        ></Geography>
                      </a>
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={gradientColors[0]} />
                <stop offset="100%" stopColor={gradientColors[1]} />
              </linearGradient>
              <linearGradient id="gradientHover" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={gradientColorsHover[0]} />
                <stop offset="100%" stopColor={gradientColorsHover[1]} />
              </linearGradient>
            </defs>
          </ComposableMap>
          <Tooltip
            anchorSelect=".country-tooltip"
            place="top-start"
            className="text-center"
            clickable
            offset={-10}
          >
            <a
              onClick={() => handleClickTooltip(tooltipContent)}
              className="text-white hover:text-[#ff9800] cursor-pointer px-[20px] py-[5px] bg-gray-700 rounded"
            >
              {tooltipContent}
            </a>

            <div className="flex mt-[10px]">
              <div className="mr-[10px]">
                <AddRemoveVisited
                  loggedIn={loggedIn}
                  loggedUserDetails={loggedUserDetails}
                  setLoggedUserDetails={setLoggedUserDetails}
                  loggedUserId={loggedUserDetails._id}
                  countryName={tooltipContent}
                  showSmallButton
                />
              </div>
              <AddRemoveWishlist
                loggedIn={loggedIn}
                loggedUserDetails={loggedUserDetails}
                setLoggedUserDetails={setLoggedUserDetails}
                loggedUserId={loggedUserDetails._id}
                countryName={tooltipContent}
                showSmallButton
              />
            </div>
          </Tooltip>
          <div className="controls text-center">
            <button onClick={handleZoomIn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button onClick={handleZoomOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
          <div className="text-center mt-[20px] mb-[50px]">
            <RandomCountry />
          </div>
        </div>
      )}
      {loggedIn === false && (
        <h1 className="mt-[120px] text-center text-xl">
          Please log in to visit this page
        </h1>
      )}
    </div>
  );
}

export default MapVisitedWishList;
