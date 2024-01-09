import { NavLink } from 'react-router-dom';
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
        <NavLink
          to="/"
          className="flex items-center"
          onClick={() => setLoginPageActive(false)}
        >
          <img src={worldImage} alt="world" className="w-10 h-10 mr-3" />
          <h1 className="text-2xl max-[610px]:text-xl text-center">
            Atlas Of Conquests
          </h1>
        </NavLink>
        <div className="flex items-center text-sm text-center font-medium">
          <NavLink
            to="/list"
            className="mr-[30px]"
            style={({ isActive }) => {
              return isActive ? { color: '#dd7031' } : {};
            }}
            onClick={() => setLoginPageActive(false)}
          >
            Countries List
          </NavLink>
          {loggedIn ? (
            <NavLink
              to="/map-visited-wishlist"
              className="mr-[30px]"
              style={({ isActive }) => {
                return isActive ? { color: '#dd7031' } : {};
              }}
              onClick={() => setLoginPageActive(false)}
            >
              Visited & Wishlist Map
            </NavLink>
          ) : (
            ''
          )}
          {loggedIn ? (
            <NavLink
              to="/visited"
              className="mr-[30px]"
              style={({ isActive }) => {
                return isActive ? { color: '#dd7031' } : {};
              }}
              onClick={() => setLoginPageActive(false)}
            >
              Visited
            </NavLink>
          ) : (
            ''
          )}
          {loggedIn ? (
            <NavLink
              to="/wishlist"
              className="mr-[30px]"
              style={({ isActive }) => {
                return isActive ? { color: '#dd7031' } : {};
              }}
              onClick={() => setLoginPageActive(false)}
            >
              Wishlist
            </NavLink>
          ) : (
            ''
          )}
          {loginPageActive ? (
            ''
          ) : (
            <NavLink
              to="/login"
              className="text-sm"
              onClick={() => {
                if (loggedIn) {
                  setLoggedIn(false);
                  localStorage.removeItem('loggedIn');
                  localStorage.removeItem('loggedUserDetails');
                  localStorage.removeItem('userId');
                  localStorage.removeItem('email');
                  setLoggedUserDetails(null);
                  setUserId(0);
                }
              }}
            >
              {loggedIn ? 'Log out' : 'Log in'}
            </NavLink>
          )}
          {loggedIn ? (
            <NavLink
              to="/user-account"
              style={({ isActive }) => {
                return isActive ? { color: '#dd7031' } : {};
              }}
              onClick={() => setLoginPageActive(false)}
            >
              <AccountCircleIcon className="ml-[20px] text-center" />
            </NavLink>
          ) : (
            ''
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
