import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCodeConverter from '../components/CountryCodeConverter';

function Wishlist({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  userId,
}) {
  const [wishlistCountries, setWishlistCountries] = useState(null);
  const [countriesFlags, setCountriesFlags] = useState(null);

  useEffect(() => {
    if (loggedUserDetails && loggedUserDetails.wishlist) {
      setWishlistCountries(loggedUserDetails.wishlist);
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

  return (
    <div>
      {loggedIn && (
        <div className="mt-[120px] ml-[80px]">
          <h1 className="mb-[40px] text-xl text-center">Wishlist Countries</h1>
          {wishlistCountries ? (
            wishlistCountries.map(wishlist => (
              <div key={wishlist.id} className="flex items-center mb-[20px]">
                <Link
                  className={`flex text-[${`#ef914e`}] font-semibold hover:text-[#F53]`}
                  to={`/country/${CountryCodeConverter({
                    countryName: wishlist.country,
                  })}/${wishlist.country.replaceAll(' ', '-')}`}
                >
                  {countriesFlags
                    ? countriesFlags
                        .filter(
                          flag =>
                            flag.cca2 ===
                            CountryCodeConverter({
                              countryName: wishlist.country,
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

                  <p>{wishlist.country}</p>
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

export default Wishlist;
