import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountryCodeConverter from '../components/CountryCodeConverter';

function Visited({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  userId,
}) {
  const [visitedCountries, setVisitedCountries] = useState(null);

  useEffect(() => {
    if (loggedUserDetails && loggedUserDetails.visited) {
      setVisitedCountries(loggedUserDetails.visited);
      console.log(loggedUserDetails.visited);
    }
  }, [loggedUserDetails]);

  return (
    <div>
      {loggedIn && (
        <div className="mt-[120px] ml-[80px]">
          {visitedCountries ? (
            visitedCountries.map(visited => (
              <Link
                key={visited.id}
                className={`mb-[20px] flex flex-col text-[${`#ef914e`}] font-semibold hover:text-[#F53]`}
                to={`/country/${CountryCodeConverter({
                  countryName: visited.country,
                })}/${visited.country.replaceAll(' ', '-')}`}
              >
                {visited.country}
              </Link>
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
