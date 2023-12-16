import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const SimpleWorldMap = () => {
  return (
    <ComposableMap>
      <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
  );
};

export default SimpleWorldMap;
