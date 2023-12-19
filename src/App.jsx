import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import CountryPage from './pages/CountryPage';

function CountryRoute() {
  const { countryName } = useParams();
  const lowercaseCountryName = countryName.toLowerCase();

  return <CountryPage countryName={lowercaseCountryName} />;
}

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/country/:countryName' element={<CountryRoute />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
