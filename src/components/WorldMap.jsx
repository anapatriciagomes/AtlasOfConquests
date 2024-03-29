import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import CountryCodeConverter from './CountryCodeConverter';
import RandomCountry from './RandomCountry';

import geoUrl from '../assets/features.json';

function WorldMap({ darkMode }) {
  const [tooltipContent, setTooltipContent] = useState('');

  const navigate = useNavigate();

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

  return (
    <div className="w-4/5 mx-auto max-[1010px]:w-[95%]">
      <ComposableMap>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <a key={geo.rsmKey} className="country-tooltip">
                  <Geography
                    geography={geo}
                    fill="#faaa70"
                    stroke="#d1d1d1"
                    onMouseEnter={() => {
                      setTooltipContent(geo.properties.name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    onClick={() => handleClick(geo)}
                    className="cursor-pointer"
                    style={{
                      default: {
                        fill: darkMode ? '#f08b42' : '#faaa70',
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
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip anchorSelect=".country-tooltip" place="top">
        {tooltipContent === 'West Bank' ? 'Palestine' : tooltipContent}
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
  );
}

export default WorldMap;
