import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '500px',
  height: '45vh',
  borderRadius: '0.375rem',
};

const GoogleMaps = ({ lat, lng, area }) => {
  const center = {
    lat: lat,
    lng: lng,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APIKEY_GOOGLEMAPS,
  });

  let customZoom = 0;

  if (area === 17098242) {
    customZoom = 2.3;
  } else if (area === 9984670) {
    customZoom = 2.8;
  } else if (area === 9706961) {
    customZoom = 3.5;
  } else if (area <= 9372610 && area > 3287590) {
    customZoom = 3.6;
  } else if (area <= 3287590 && area > 1285216) {
    customZoom = 4.5;
  } else if (area <= 1285216 && area > 181034) {
    customZoom = 5;
  } else if (area <= 181034 && area > 83871) {
    customZoom = 5.5;
  } else if (area <= 83871 && area > 78865) {
    customZoom = 6;
  } else if (area <= 78865 && area > 27750) {
    customZoom = 6.5;
  } else if (area <= 27750 && area > 2842) {
    customZoom = 7;
  } else if (area <= 2842 && area > 811) {
    customZoom = 9;
  } else if (area <= 811 && area >= 26) {
    customZoom = 10;
  } else customZoom = 13;

  /*  russia - 2.5 */
  /*  canada - 3 */
  /*  China 3.5 */
  /*  United states  3.6  */
  /*  india - 4.5 */
  /*  peru - 5 */
  /*  uruguay - 5.5 */
  /*  austria 6 */
  /*  Czechia - 6.5 */
  /*  haiti - 7 */
  /*  samoa - 9 */
  /*  kiribati - 10 */
  /*  Monaco - 13 */

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={customZoom}
        center={center}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};
export default GoogleMaps;
