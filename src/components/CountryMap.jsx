import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';

import geoUrl from '../assets/features.json';

function CountryMap() {
  const [tooltipContent, setTooltipContent] = useState('');

  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const desiredCountry = 'Portugal';
    setSelectedCountry(desiredCountry);
  }, []);

  return (
    <div className='w-4/5 mx-auto'>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter(geo => geo.properties.name === selectedCountry)
              .map(geo => (
                <a key={geo.rsmKey} className='country-tooltip'>
                  <Geography
                    geography={geo}
                    fill='#faaa70'
                    width='200px'
                    onMouseEnter={() => {
                      setTooltipContent(geo.properties.name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    className='cursor-pointer'
                    style={{
                      default: {
                        fill: '#faaa70',
                        outline: 'none',
                      },
                      hover: {
                        fill: '#F53',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#E42',
                        outline: 'none',
                      },
                    }}
                  ></Geography>
                </a>
              ))
          }
        </Geographies>
      </ComposableMap>
      <Tooltip anchorSelect='.country-tooltip' place='top'>
        {tooltipContent}
      </Tooltip>
    </div>
  );
}

export default CountryMap;
