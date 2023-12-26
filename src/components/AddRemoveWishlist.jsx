import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

function AddRemoveWishlist(loggedIn, loggedUserDetails, countryName) {
  const [wishlist, setWishlist] = useState(false);
  const [country, setCountry] = useState('');
  const [userId, setUserId] = useState(0);
  const [countryId, setCountryId] = useState(0);

  useEffect(() => {
    if (loggedUserDetails) {
      setCountry(
        countryName.includes('-')
          ? countryName.replaceAll('-', ' ')
          : countryName
      );
      setUserId(loggedUserDetails.id);
      const filteredCountry = loggedUserDetails.wishlist.filter(
        wishlist => wishlist.country === countryName
      );
      console.log(filteredCountry);
      if (filteredCountry.length > 0) {
        setWishlist(true);
        setCountryId(filteredCountry[0].id);
        console.log(filteredCountry[0].id);
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
      const updatedwishlist = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/userId?_embed=wishlist`
      );
      const currentCountry = updatedwishlist.wishlist.filter(
        country => country === countryName
      );
      setCountryId(currentCountry.id);
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
    wishlist ? handleRemoveCountry() : handleAddCountry();
  };

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[300],
    width: '180px',
    height: '56px',
    margin: 40,

    '&:hover': {
      backgroundColor: deepPurple[500],
      width: '180px',
      height: '56px',
      margin: 40,
    },
  }));

  return (
    <div>
      {loggedIn ? (
        <GreenButton onClick={handleButtonClick}>
          {wishlist
            ? 'Remove Country from Wishlist List'
            : 'Add Country to Wishlist List'}
        </GreenButton>
      ) : (
        ''
      )}
    </div>
  );
}

export default AddRemoveWishlist;
