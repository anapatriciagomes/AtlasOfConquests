import { Link } from 'react-router-dom';
import worldImage from '../assets/world_atlas_favicon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({
  loginPageActive,
  setLoginPageActive,
  loggedIn,
  setLoggedIn,
  setLoggedUserDetails,
  setUserId,
}) {
  return (
    <nav className="z-10 py-4 px-6 fixed top-0 left-0 w-full bg-[#ededed]">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setLoginPageActive(false)}
        >
          <img src={worldImage} alt="world" className="w-10 h-10 mr-3" />
          <h1 className="text-2xl max-[610px]:text-xl text-center">
            Atlas Of Conquests
          </h1>
        </Link>
        <div className="flex items-center text-sm text-center font-medium">
          <Link
            to="/list"
            className="mr-[30px]"
            onClick={() => setLoginPageActive(false)}
          >
            Countries List
          </Link>
          {loggedIn ? (
            <Link
              to="/map-visited-wishlist"
              className="mr-[30px]"
              onClick={() => setLoginPageActive(false)}
            >
              Visited & Wishlist Map
            </Link>
          ) : (
            ''
          )}
          {loggedIn ? (
            <Link
              to="/visited"
              className="mr-[30px]"
              onClick={() => setLoginPageActive(false)}
            >
              Visited
            </Link>
          ) : (
            ''
          )}
          {loggedIn ? (
            <Link
              to="/wishlist"
              className="mr-[30px]"
              onClick={() => setLoginPageActive(false)}
            >
              Wishlist
            </Link>
          ) : (
            ''
          )}
          {loginPageActive ? (
            ''
          ) : (
            <Link
              to="/login"
              className="text-sm"
              onClick={() => {
                if (loggedIn) {
                  setLoggedIn(false);
                  setLoggedUserDetails(null);
                  setUserId(0);
                }
              }}
            >
              {loggedIn ? 'Log out' : 'Log in'}
            </Link>
          )}
          {loggedIn ? (
            <Link to="/user-account" onClick={() => setLoginPageActive(false)}>
              <AccountCircleIcon className="ml-[20px] text-center" />
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
