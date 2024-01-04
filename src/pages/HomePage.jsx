import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap from '../components/WorldMap';
import MapVisitedWishList from './MapVisitedWishList';

function HomePage({ loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(`/map-visited-wishlist`);
    }
  }, [loggedIn]);

  return (
    <div>
      {loggedIn ? (
        <div className="mx-6 mt-[60px]">
          <MapVisitedWishList />
        </div>
      ) : (
        <div className="mx-6 mt-[60px]">
          <WorldMap />
        </div>
      )}
    </div>
  );
}

export default HomePage;
