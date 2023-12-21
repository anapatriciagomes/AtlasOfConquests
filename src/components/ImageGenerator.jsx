import { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGenerator = ({ countryCode }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${countryCode}`,
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
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
            className='object-cover object-center bg-no-repeat h-[91vh] w-full opacity-40'
            src={photos[0].src.large2x}
            alt={`Background for ${countryCode}`}
          />
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
