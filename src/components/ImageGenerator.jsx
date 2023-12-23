import { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGenerator = ({ countryName, attractions }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('attractions:', attractions);

        if (attractions.length > 0) {
          const randomIndex = Math.floor(Math.random() * attractions.length);
          console.log(`randomIndex: ${randomIndex}`);
          const randomAttraction = attractions[randomIndex];
          console.log(`randomAttraction: ${randomAttraction}`);

          const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${randomAttraction}`,
            {
              headers: {
                Authorization: import.meta.env.VITE_API_KEY,
              },
            }
          );

          setPhotos(response.data.photos);
        } else {
          console.warn('No attractions found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchImages();
  }, [attractions]);

  return (
    <div>
      <div>
        {photos.length > 0 && (
          <img
            className='object-cover object-center bg-no-repeat h-[91vh] w-full opacity-40'
            src={photos[0].src.large2x}
            alt={`Background for ${countryName}`}
          />
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
