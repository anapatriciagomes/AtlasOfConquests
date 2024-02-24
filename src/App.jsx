import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
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
import AboutUs from './pages/AboutUs';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContext } from './context/auth.context';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPageActive, setLoginPageActive] = useState(false);
  const [loggedUserDetails, setLoggedUserDetails] = useState(null);

  const { loggedIn } = useContext(AuthContext);

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
    const storedUserDetails = localStorage.getItem('loggedUserDetails');
    const storedEmail = localStorage.getItem('email');

    try {
      if (storedUserDetails) {
        setLoggedUserDetails(JSON.parse(storedUserDetails));
      } else {
        console.error('User details not found in localStorage.');
      }

      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        console.error('Email not found in localStorage.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
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
        setLoggedUserDetails={setLoggedUserDetails}
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
              setLoggedUserDetails={setLoggedUserDetails}
            />
          }
        />
        <Route
          path="/country/:countryCode/:countryName"
          element={
            <CountryPage
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/map-visited-wishlist"
          element={
            <MapVisitedWishList
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/visited"
          element={
            <Visited
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
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
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/user-account"
          element={
            <UserAccountPage
              password={password}
              setPassword={setPassword}
              loggedUserDetails={loggedUserDetails}
            />
          }
        />
        <Route
          path="/list"
          element={
            <CountriesList
              loggedUserDetails={loggedUserDetails}
              setLoggedUserDetails={setLoggedUserDetails}
            />
          }
        />
        <Route path="/about" element={<AboutUs darkMode={darkMode} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
