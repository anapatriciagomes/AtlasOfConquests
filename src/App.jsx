import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import CountryPage from './pages/CountryPage';

function App() {
  const [loginPageActive, setLoginPageActive] = useState(false);

  return (
    <div className="App">
      <Navbar
        loginPageActive={loginPageActive}
        setLoginPageActive={setLoginPageActive}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage setLoginPageActive={setLoginPageActive} />}
        />
        <Route path="/country/:countryName" element={<CountryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
