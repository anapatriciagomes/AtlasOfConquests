import { useState, useEffect } from 'react';
import axios from 'axios';

const ImageSearch = ({ countryCode }) => {
  const [photos, setPhotos] = useState([]);

  const apiKey = '2KrWm9bNdivSmVLZKm3MvjIoKSDtoYKQGftFR6UINbM4iCK1FMSXrpdv';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${countryCode}`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        setPhotos(response.data.photos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchImages();
  }, [countryCode]);

  return (
    <div>
      <div>
        {photos.length > 0 && (
          <img
            src={photos[0].src.large2x}
            alt={`Background for ${countryCode}`}
          />
        )}
      </div>
    </div>
  );
};

export default ImageSearch;
