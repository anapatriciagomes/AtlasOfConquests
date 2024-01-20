import { NavLink } from 'react-router-dom';
import worldImage from '../assets/world_atlas_favicon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
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
  const largeScreen = useMediaQuery('(min-width:1010px)');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {largeScreen ? (
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
      ) : (
        <React.Fragment>
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    {open ? <MenuOpenIcon /> : <MenuIcon />}
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <NavLink
                    to="/list"
                    style={({ isActive }) => {
                      return isActive ? { color: '#dd7031' } : {};
                    }}
                    onClick={() => setLoginPageActive(false)}
                  >
                    <MenuItem onClick={handleClose}>Countries List</MenuItem>
                  </NavLink>

                  {loggedIn ? (
                    <NavLink
                      to="/map-visited-wishlist"
                      style={({ isActive }) => {
                        return isActive ? { color: '#dd7031' } : {};
                      }}
                      onClick={() => setLoginPageActive(false)}
                    >
                      <MenuItem onClick={handleClose}>
                        Visited & Wishlist Map
                      </MenuItem>
                    </NavLink>
                  ) : (
                    ''
                  )}
                  {loggedIn ? (
                    <NavLink
                      to="/visited"
                      style={({ isActive }) => {
                        return isActive ? { color: '#dd7031' } : {};
                      }}
                      onClick={() => setLoginPageActive(false)}
                    >
                      <MenuItem onClick={handleClose}>Visited</MenuItem>
                    </NavLink>
                  ) : (
                    ''
                  )}
                  {loggedIn ? (
                    <NavLink
                      to="/wishlist"
                      style={({ isActive }) => {
                        return isActive ? { color: '#dd7031' } : {};
                      }}
                      onClick={() => setLoginPageActive(false)}
                    >
                      <MenuItem onClick={handleClose}>Wishlist</MenuItem>
                    </NavLink>
                  ) : (
                    ''
                  )}

                  <Divider />
                  <button
                    onClick={() => {
                      localStorage.setItem('darkMode', !darkMode);
                      setDarkMode(!darkMode);
                      console.log(`!darkMode : ${!darkMode}`);
                    }}
                    className="flex items-center w-[100%]"
                  >
                    <MenuItem onClick={handleClose} sx={{ width: '100%' }}>
                      <ListItemIcon>
                        {darkMode ? (
                          <LightModeIcon className="text-center" />
                        ) : (
                          <DarkModeIcon className="text-center" />
                        )}
                      </ListItemIcon>
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </MenuItem>
                  </button>
                  {loggedIn ? (
                    <NavLink
                      to="/user-account"
                      style={
                        (({ isActive }) => {
                          return isActive ? { color: '#dd7031' } : {};
                        },
                        {
                          display: 'flex',
                          alignItems: 'center',
                        })
                      }
                      onClick={() => setLoginPageActive(false)}
                    >
                      <MenuItem onClick={handleClose} sx={{ width: '100%' }}>
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        Account Details
                      </MenuItem>
                    </NavLink>
                  ) : (
                    ''
                  )}

                  {loginPageActive ? (
                    ''
                  ) : (
                    <NavLink
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      to="/login"
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
                      <MenuItem onClick={handleClose} sx={{ width: '100%' }}>
                        <ListItemIcon>
                          {loggedIn ? (
                            <Logout fontSize="small" />
                          ) : (
                            <LoginIcon fontSize="small" />
                          )}
                        </ListItemIcon>
                        {loggedIn ? 'Logout' : 'Login'}
                      </MenuItem>
                    </NavLink>
                  )}
                </Menu>
              </div>
            </div>
          </nav>
        </React.Fragment>
      )}
    </div>
  );
}

export default Navbar;
