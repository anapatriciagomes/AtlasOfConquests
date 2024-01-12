import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap from '../components/WorldMap';
import MapVisitedWishList from './MapVisitedWishList';

function HomePage({ loggedIn, darkMode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(`/map-visited-wishlist`);
    }
  }, [loggedIn]);

  return (
    <div>
      {loggedIn ? (
        <div className='mx-6 mt-[60px]'>
          <MapVisitedWishList />
        </div>
      ) : (
        <div className='mx-6 mt-[60px]'>
          <WorldMap darkMode={darkMode} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
