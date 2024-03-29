import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCodeConverter from '../components/CountryCodeConverter';
import AddRemoveVisited from '../components/AddRemoveVisited';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/auth.context';

function Visited({ loggedUserDetails, setLoggedUserDetails }) {
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [showVisited, setShowVisited] = useState([]);
  const [countriesFlags, setCountriesFlags] = useState(null);

  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedUserDetails && loggedUserDetails.visited) {
      setVisitedCountries(
        loggedUserDetails.visited.sort((a, b) =>
          a.country.localeCompare(b.country)
        )
      );
      setShowVisited(
        loggedUserDetails.visited.sort((a, b) =>
          a.country.localeCompare(b.country)
        )
      );
    }
  }, [loggedUserDetails]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
      .then(response => {
        setCountriesFlags(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const searchedCountries = query => {
    const filteredCountries = loggedUserDetails.visited.filter(visited => {
      return visited.country.toLowerCase().includes(query.toLowerCase());
    });
    setShowVisited(
      filteredCountries.sort((a, b) => a.country.localeCompare(b.country))
    );
  };

  return (
    <div>
      {loggedIn && (
        <div className="mt-[120px] mx-auto text-center w-[650px] max-[700px]:w-[95%]">
          <h1 className="mb-[40px] text-xl text-center">Visited Countries</h1>
          {visitedCountries.length > 0 ? (
            <h2 className="mb-[20px] text-xl text-center leading-10">
              You have visited{' '}
              <b className="text-[#6fbc16] text-2xl">
                {visitedCountries.length}
              </b>{' '}
              out of 202 countries! <br />
              {202 - visitedCountries.length} countries left to conquer the
              World!
            </h2>
          ) : (
            ''
          )}
          {visitedCountries.length > 0 ? (
            <SearchBar searchedCountries={searchedCountries} />
          ) : (
            ''
          )}
          {visitedCountries.length > 0 ? (
            showVisited.map(visited => (
              <div
                key={visited._id}
                className="flex justify-center items-center mb-[20px]"
              >
                <Link
                  className={`flex justify-start items-center w-[50%] text-[${`#ef914e`}] font-semibold hover:text-[#F53]`}
                  to={`/country/${CountryCodeConverter({
                    countryName: visited.country,
                  })}/${visited.country.replaceAll(' ', '-')}`}
                >
                  {countriesFlags
                    ? countriesFlags
                        .filter(
                          flag =>
                            flag.cca2.toLowerCase() ===
                            CountryCodeConverter({
                              countryName: visited.country,
                            })
                        )
                        .map((flag, index) => (
                          <img
                            src={flag.flags.png}
                            key={index}
                            className="max-w-[40px] mr-[10px]"
                          />
                        ))
                    : ''}

                  <p className="text-left">{visited.country}</p>
                </Link>
                <div className="ml-[10px]">
                  <AddRemoveVisited
                    loggedIn={loggedIn}
                    loggedUserDetails={loggedUserDetails}
                    setLoggedUserDetails={setLoggedUserDetails}
                    loggedUserId={loggedUserDetails._id}
                    countryName={visited.country}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>
              Your list is still empty, click on the{' '}
              <Link to="/map-visited-wishlist" className="text-[#ff6b00]">
                map
              </Link>{' '}
              to add countries.
            </h1>
          )}
        </div>
      )}
      {loggedIn === false && (
        <h1 className="mt-[120px] text-center text-xl">
          Please log in to visit this page
        </h1>
      )}
    </div>
  );
}

export default Visited;
