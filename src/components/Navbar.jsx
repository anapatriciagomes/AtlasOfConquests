import { NavLink } from 'react-router-dom';
import worldImage from '../assets/world_atlas_favicon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function Navbar({
  loginPageActive,
  setLoginPageActive,
  loggedIn,
  setLoggedIn,
  setLoggedUserDetails,
  setUserId,
  darkMode,
  setDarkMode,
}) {
  return (
    <nav
      className={`z-10 py-4 px-6 fixed top-0 left-0 w-full ${
        !darkMode ? 'bg-[#ededed]' : 'bg-[#16161D]'
      }`}
    >
      <div className="flex justify-start items-center">
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
        <div className="ml-auto flex items-center text-sm text-center font-medium">
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
                  localStorage.removeItem('userId');
                  localStorage.removeItem('countryId');
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
        <button
          onClick={() => {
            localStorage.setItem('darkMode', !darkMode);
            setDarkMode(!darkMode);
            console.log(`!darkMode : ${!darkMode}`);
          }}
          className="ml-[20px] text-sm"
        >
          {darkMode ? (
            <LightModeIcon className="text-center" />
          ) : (
            <DarkModeIcon className="text-center" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
