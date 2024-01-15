import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import CountryPage from './pages/CountryPage';
import MapVisitedWishList from './pages/MapVisitedWishList';
import Visited from './pages/Visited';
import WishList from './pages/Wishlist';
import UserAccountPage from './pages/UserAccountPage';
import CountriesList from './pages/CountriesList';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPageActive, setLoginPageActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUserDetails, setLoggedUserDetails] = useState(null);
  const [userId, setUserId] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      setLoggedIn(true);
      setLoggedUserDetails(
        JSON.parse(localStorage.getItem('loggedUserDetails'))
      );
      setUserId(+parseInt(localStorage.getItem('userId')));
      setEmail(localStorage.getItem('email'));
    }
    const isDarkMode =
      localStorage.getItem('darkMode') === 'true' ? true : false;
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = darkMode ? '#222' : '#dedede';
    body.style.color = darkMode ? '#fff' : '#222';

    return () => {
      body.style.backgroundColor = '';
      body.style.color = '';
    };
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        loginPageActive={loginPageActive}
        setLoginPageActive={setLoginPageActive}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setLoggedUserDetails={setLoggedUserDetails}
        setUserId={setUserId}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage loggedIn={loggedIn} darkMode={darkMode} />}
        />
        <Route
          path="/login"
          element={
            <LoginPage
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setLoginPageActive={setLoginPageActive}
              setLoggedIn={setLoggedIn}
              setLoggedUserDetails={setLoggedUserDetails}
              setUserId={setUserId}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/country/:countryCode/:countryName"
          element={
            <CountryPage
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
              userId={userId}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/map-visited-wishlist"
          element={
            <MapVisitedWishList
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
              userId={userId}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/visited"
          element={
            <Visited
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
              userId={userId}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishList
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
              userId={userId}
            />
          }
        />
        <Route
          path="/user-account"
          element={
            <UserAccountPage
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loggedUserDetails={loggedUserDetails}
              userId={userId}
              setLoggedIn={setLoggedIn}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/list"
          element={
            <CountriesList
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
              userId={userId}
              darkMode={darkMode}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
