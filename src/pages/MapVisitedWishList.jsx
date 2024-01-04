import { useState, useEffect } from 'react';
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

import geoUrl from '../assets/features.json';

function MapVisitedWishList({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  userId,
}) {
  const [visitedCountries, setVisitedCountries] = useState(null);
  const [wishlistCountries, setWishlistCountries] = useState(null);
  const [tooltipContent, setTooltipContent] = useState('');

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
      const countryCode = await CountryCodeConverter({
        countryName: geo.properties.name,
      });
      const countryName = geo.properties.name;
      const lowercaseCountryCode = countryCode.toLowerCase();
      navigate(
        `/country/${lowercaseCountryCode}/${countryName.replaceAll(' ', '-')}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-4/5 mx-auto mt-[70px]">
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
                    if (
                      visitedCountries.filter(
                        visited => visited.country === geo.properties.name
                      ).length > 0
                    ) {
                      return (
                        <a key={geo.rsmKey} className="country-tooltip">
                          <Geography
                            geography={geo}
                            fill="#aed581"
                            onMouseEnter={() => {
                              setTooltipContent(geo.properties.name);
                            }}
                            onClick={() => handleClick(geo)}
                            className="cursor-pointer"
                            style={{
                              default: {
                                fill: '#aed581',
                                outline: 'none',
                              },
                              hover: {
                                fill: '#8bc34b',
                                outline: 'none',
                              },
                              pressed: {
                                fill: '#8bc34b',
                                outline: 'none',
                              },
                            }}
                          ></Geography>
                        </a>
                      );
                    } else if (
                      wishlistCountries.filter(
                        wishlist => wishlist.country === geo.properties.name
                      ).length > 0
                    ) {
                      return (
                        <a key={geo.rsmKey} className="country-tooltip">
                          <Geography
                            geography={geo}
                            fill="#9575cd"
                            onMouseEnter={() => {
                              setTooltipContent(geo.properties.name);
                            }}
                            onClick={() => handleClick(geo)}
                            className="cursor-pointer"
                            style={{
                              default: {
                                fill: '#9575cd',
                                outline: 'none',
                              },
                              hover: {
                                fill: '#673ab7',
                                outline: 'none',
                              },
                              pressed: {
                                fill: '#673ab7',
                                outline: 'none',
                              },
                            }}
                          ></Geography>
                        </a>
                      );
                    } else {
                      return (
                        <a key={geo.rsmKey} className="country-tooltip">
                          <Geography
                            geography={geo}
                            fill="#faaa70"
                            onMouseEnter={() => {
                              setTooltipContent(geo.properties.name);
                            }}
                            onClick={() => handleClick(geo)}
                            className="cursor-pointer"
                            style={{
                              default: {
                                fill: '#faaa70',
                                outline: 'none',
                              },
                              hover: {
                                fill: '#ff6b00',
                                outline: 'none',
                              },
                              pressed: {
                                fill: '#ff6b00',
                                outline: 'none',
                              },
                            }}
                          ></Geography>
                        </a>
                      );
                    }
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <Tooltip
            anchorSelect=".country-tooltip"
            place="top-start"
            className="text-center"
            clickable
            offset={-20}
          >
            {tooltipContent}
            <div className="flex mt-[10px]">
              <div className="mr-[10px]">
                <AddRemoveVisited
                  loggedIn={loggedIn}
                  loggedUserDetails={loggedUserDetails}
                  setLoggedUserDetails={setLoggedUserDetails}
                  loggedUserId={userId}
                  countryName={tooltipContent}
                />
              </div>
              <AddRemoveWishlist
                loggedIn={loggedIn}
                loggedUserDetails={loggedUserDetails}
                setLoggedUserDetails={setLoggedUserDetails}
                loggedUserId={userId}
                countryName={tooltipContent}
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
