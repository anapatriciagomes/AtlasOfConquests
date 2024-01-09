import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '45vw',
  height: '45vh',
};

const GoogleMaps = ({ lat, lng }) => {
  const center = {
    lat: lat,
    lng: lng,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APIKEY_GOOGLEMAPS,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={4} center={center}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;
