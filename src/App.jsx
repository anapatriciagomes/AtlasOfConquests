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

function App() {
  const [loginPageActive, setLoginPageActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUserDetails, setLoggedUserDetails] = useState(null);
  const [userId, setUserId] = useState(0);

  return (
    <div className="App">
      <Navbar
        loginPageActive={loginPageActive}
        setLoginPageActive={setLoginPageActive}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setLoginPageActive={setLoginPageActive}
              setLoggedIn={setLoggedIn}
              setLoggedUserDetails={setLoggedUserDetails}
              loggedUserDetails={loggedUserDetails}
              setUserId={setUserId}
            />
          }
        />
        <Route path="/country/:countryName" element={<CountryPage />} />
        <Route path="/map-visited-wishlist" element={<MapVisitedWishList />} />
        <Route path="/visited-countries" element={<VisitedCountries />} />
        <Route path="/wishList" element={<WishList />} />
        <Route
          path="/user-account"
          element={
            <UserAccountPage
              loggedUserDetails={loggedUserDetails}
              userId={userId}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
