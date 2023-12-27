import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCodeConverter from '../components/CountryCodeConverter';

function Visited({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  userId,
}) {
  const [visitedCountries, setVisitedCountries] = useState(null);
  const [countriesFlags, setCountriesFlags] = useState(null);

  useEffect(() => {
    if (loggedUserDetails && loggedUserDetails.visited) {
      setVisitedCountries(loggedUserDetails.visited);
      console.log(loggedUserDetails.visited);
    }
  }, [loggedUserDetails]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
      .then(response => {
        setCountriesFlags(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {loggedIn && (
        <div className="mt-[120px] ml-[80px]">
          <h1 className="mb-[40px] text-xl text-center">Visited Countries</h1>
          {visitedCountries ? (
            visitedCountries.map(visited => (
              <div key={visited.id} className="flex items-center mb-[20px]">
                <Link
                  className={`flex text-[${`#ef914e`}] font-semibold hover:text-[#F53]`}
                  to={`/country/${CountryCodeConverter({
                    countryName: visited.country,
                  })}/${visited.country.replaceAll(' ', '-')}`}
                >
                  {countriesFlags
                    ? countriesFlags
                        .filter(
                          flag =>
                            flag.cca2 ===
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
              </div>
            ))
          ) : (
            <h1>
              Your list is still empty, click on the map below to add countries.
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Visited;
