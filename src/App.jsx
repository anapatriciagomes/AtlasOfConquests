import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import CountryPage from './pages/CountryPage';
import MapVisitedWishList from './pages/MapVisitedWishList';
import VisitedCountries from './pages/VisitedCountries';
import WishList from './pages/WishList';
import UserAccountPage from './pages/UserAccountPage';
import CountriesList from './pages/CountriesList';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPageActive, setLoginPageActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUserDetails, setLoggedUserDetails] = useState(null);
  const [userId, setUserId] = useState(0);

  return (
    <div className='App'>
      <Navbar
        loginPageActive={loginPageActive}
        setLoginPageActive={setLoginPageActive}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setLoggedUserDetails={setLoggedUserDetails}
        setUserId={setUserId}
      />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/login'
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
            />
          }
        />
        <Route
          path='/country/:countryCode/:countryName'
          element={
            <CountryPage
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              userId={userId}
            />
          }
        />
        <Route
          path='/map-visited-wishlist'
          element={
            <MapVisitedWishList
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              userId={userId}
            />
          }
        />
        <Route
          path='/visited-countries'
          element={
            <VisitedCountries
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              userId={userId}
            />
          }
        />
        <Route
          path='/wishList'
          element={
            <WishList
              loggedIn={loggedIn}
              loggedUserDetails={loggedUserDetails}
              userId={userId}
            />
          }
        />
        <Route
          path='/user-account'
          element={
            <UserAccountPage
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loggedUserDetails={loggedUserDetails}
              userId={userId}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route path='/list' element={<CountriesList />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
