import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCodeConverter from '../components/CountryCodeConverter';
import AddRemoveWishlist from '../components/AddRemoveWishlist';
import SearchBar from '../components/SearchBar';
import RandomCountry from '../components/RandomCountry';
import { AuthContext } from '../context/auth.context';

function Wishlist({ loggedUserDetails, setLoggedUserDetails, darkMode }) {
  const [wishlistCountries, setWishlistCountries] = useState([]);
  const [showWishlist, setShowWishlist] = useState([]);
  const [countriesFlags, setCountriesFlags] = useState(null);

  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedUserDetails && loggedUserDetails.wishlist) {
      setWishlistCountries(
        loggedUserDetails.wishlist.sort((a, b) =>
          a.country.localeCompare(b.country)
        )
      );
      setShowWishlist(
        loggedUserDetails.wishlist.sort((a, b) =>
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
    const filteredCountries = loggedUserDetails.wishlist.filter(wishlist => {
      return wishlist.country.toLowerCase().includes(query.toLowerCase());
    });
    setShowWishlist(
      filteredCountries.sort((a, b) => a.country.localeCompare(b.country))
    );
  };

  return (
    <div>
      {loggedIn && (
        <div className="mt-[120px] mx-auto text-center w-[650px] max-[700px]:w-[95%]">
          <h1 className="mb-[40px] text-xl text-center">Wishlist Countries</h1>
          {wishlistCountries.length > 0 ? (
            <h2 className="mb-[40px] text-xl text-center leading-10">
              You have{' '}
              <b
                className={`${
                  darkMode ? 'text-[#9e76e3]' : 'text-[#673ab7]'
                } text-2xl`}
              >
                {wishlistCountries.length}
              </b>{' '}
              countries on your Wishlist!
            </h2>
          ) : (
            ''
          )}
          {wishlistCountries.length > 0 ? (
            <SearchBar searchedCountries={searchedCountries} />
          ) : (
            ''
          )}
          {wishlistCountries.length > 0 ? (
            showWishlist.map(wishlist => (
              <div
                key={wishlist._id}
                className="flex justify-center items-center mb-[20px]"
              >
                <Link
                  className={`flex justify-start items-center w-[50%] text-[${`#ef914e`}] font-semibold hover:text-[#F53]`}
                  to={`/country/${CountryCodeConverter({
                    countryName: wishlist.country,
                  })}/${wishlist.country.replaceAll(' ', '-')}`}
                >
                  {countriesFlags
                    ? countriesFlags
                        .filter(
                          flag =>
                            flag.cca2.toLowerCase() ===
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

                  <p className="text-left">{wishlist.country}</p>
                </Link>
                <div>
                  <AddRemoveWishlist
                    loggedIn={loggedIn}
                    loggedUserDetails={loggedUserDetails}
                    setLoggedUserDetails={setLoggedUserDetails}
                    loggedUserId={loggedUserDetails._id}
                    countryName={wishlist.country}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>
              Your list is still empty, go to a random country or click on the{' '}
              <Link to="/map-visited-wishlist" className="text-[#ff6b00]">
                map
              </Link>{' '}
              to add countries.
            </h1>
          )}
          <div className="text-center mt-[20px] mb-[50px]">
            <RandomCountry />
          </div>
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

export default Wishlist;
