import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCodeConverter from '../components/CountryCodeConverter';
import AddRemoveVisited from '../components/AddRemoveVisited';
import SearchBar from '../components/SearchBar';

function Visited({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  userId,
}) {
  const [visitedCountries, setVisitedCountries] = useState(null);
  const [showVisited, setShowVisited] = useState([]);
  const [countriesFlags, setCountriesFlags] = useState(null);

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
        <div className="mt-[120px] mx-auto text-center w-[650px]">
          <h1 className="mb-[40px] text-xl text-center">Visited Countries</h1>
          {visitedCountries ? (
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
          {visitedCountries ? (
            <SearchBar searchedCountries={searchedCountries} />
          ) : (
            ''
          )}
          {visitedCountries ? (
            showVisited.map(visited => (
              <div
                key={visited.id}
                className="flex justify-center items-center mb-[20px]"
              >
                <Link
                  className={`flex justify-start items-center flex-wrap w-[50%] text-[${`#ef914e`}] font-semibold hover:text-[#F53]`}
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

                  <p>{visited.country}</p>
                </Link>
                <div>
                  <AddRemoveVisited
                    loggedIn={loggedIn}
                    loggedUserDetails={loggedUserDetails}
                    setLoggedUserDetails={setLoggedUserDetails}
                    loggedUserId={userId}
                    countryName={visited.country}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>
              Your list is still empty, click on the map below to add countries.
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
