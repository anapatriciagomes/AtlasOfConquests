import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

function AddRemoveWishlist({
  loggedIn,
  loggedUserDetails,
  loggedUserId,
  countryName,
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
    }
    if (loggedUserDetails && loggedUserDetails.wishlist) {
      const filteredCountry = loggedUserDetails.wishlist.filter(
        wishlist => wishlist.country === countryName
      );
      console.log(filteredCountry);
      if (filteredCountry.length > 0) {
        setWishlist(true);
        setCountryId(filteredCountry.id);
        console.log(filteredCountry.id);
      } else {
        setWishlist(false);
      }
    }
  }, []);

  const handleAddCountry = async () => {
    try {
      const countryDetails = { country, userId };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist`,
        countryDetails
      );
      setWishlist(true);
      const updatedWishlist = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}?_embed=wishlist`
      );
      setCountryId(updatedWishlist.data.wishlist[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCountry = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/${countryId}`
      );
      setWishlist(false);
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

  const PurpleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[300],
    width: '180px',
    height: '56px',
    margin: '20px 0 10px 10px',

    '&:hover': {
      backgroundColor: deepPurple[500],
      width: '180px',
      height: '56px',
      margin: '20px 0 10px 10px',
    },
  }));

  return (
    <div>
      {loggedIn ? (
        <PurpleButton onClick={handleButtonClick}>
          {wishlist
            ? 'Remove Country from Wishlist List'
            : 'Add Country to Wishlist List'}
        </PurpleButton>
      ) : (
        ''
      )}
    </div>
  );
}

export default AddRemoveWishlist;
