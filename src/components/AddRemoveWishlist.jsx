import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

function AddRemoveWishlist({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  loggedUserId,
  countryName,
  showSmallButton,
}) {
  const [wishlist, setWishlist] = useState(false);
  const [country, setCountry] = useState('');
  const [countryId, setCountryId] = useState(0);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (countryName) {
      setCountry(
        countryName.includes('-')
          ? countryName.replaceAll('-', ' ')
          : countryName
      );
    }
    if (loggedUserId > 0) {
      setUserId(loggedUserId);
      localStorage.setItem('userId', loggedUserId.toString());
    }
    if (loggedUserDetails && loggedUserDetails.wishlist) {
      const filteredCountry = loggedUserDetails.wishlist.filter(
        wishlist => wishlist.country === countryName.replaceAll('-', ' ')
      );

      if (filteredCountry.length > 0) {
        setWishlist(true);
        setCountryId(filteredCountry[0].id);
      } else {
        setWishlist(false);
      }
    }
  }, [countryName, loggedUserDetails, loggedUserId]);

  const handleAddCountry = async () => {
    try {
      if (loggedUserId === 0) {
        setUserId(+parseInt(localStorage.getItem('userId')));
      }
      const countryDetails = { country, userId };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist`,
        countryDetails
      );
      setWishlist(true);
      const updatedWishlist = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}?_embed=wishlist`
      );
      setCountryId(updatedWishlist.data.wishlist.slice(-1)[0].id);
      const updatedUserDetails = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/${userId}?_embed=visited&_embed=wishlist`
      );
      setLoggedUserDetails(updatedUserDetails.data);
      localStorage.setItem(
        'loggedUserDetails',
        JSON.stringify(updatedUserDetails.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCountry = async () => {
    try {
      if (loggedUserId === 0) {
        setUserId(+parseInt(localStorage.getItem('userId')));
      }
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/${countryId}`
      );
      setWishlist(false);
      const updatedUserDetails = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/${userId}?_embed=visited&_embed=wishlist`
      );
      setLoggedUserDetails(updatedUserDetails.data);
      localStorage.setItem(
        'loggedUserDetails',
        JSON.stringify(updatedUserDetails.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    if (wishlist) {
      handleRemoveCountry();
    } else {
      handleAddCountry();
    }
  };

  const handleSmallButtonClick = () => {
    if (wishlist) {
      handleRemoveCountry();
    } else {
      handleAddCountry();
    }
  };

  const PurpleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[300],
    width: '170px',
    height: '56px',

    '&:hover': {
      backgroundColor: deepPurple[500],
      width: '170px',
      height: '56px',
    },
  }));

  const SmallPurpleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[300],
    width: '150px',
    height: '36px',

    '&:hover': {
      backgroundColor: deepPurple[500],
      width: '150px',
      height: '36px',
    },
  }));

  return (
    <div>
      {loggedIn ? (
        <div>
          {showSmallButton ? (
            <SmallPurpleButton onClick={handleSmallButtonClick}>
              {wishlist ? (
                <span style={{ fontSize: '12px', padding: '0px' }}>
                  Remove from Wishlist
                </span>
              ) : (
                <span style={{ fontSize: '12px' }}>Add to Wishlist</span>
              )}
            </SmallPurpleButton>
          ) : (
            <PurpleButton onClick={handleButtonClick}>
              {wishlist
                ? 'Remove Country from Visited List'
                : 'Add Country to Visited List'}
            </PurpleButton>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default AddRemoveWishlist;
