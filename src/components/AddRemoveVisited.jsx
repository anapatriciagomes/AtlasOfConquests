import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

function AddRemoveVisited({ loggedIn, loggedUserDetails, countryName }) {
  const [visited, setVisited] = useState(false);
  const [country, setCountry] = useState('');
  const [userId, setUserId] = useState(0);
  const [countryId, setCountryId] = useState(0);

  useEffect(() => {
    if (loggedUserDetails && countryName) {
      setCountry(
        countryName.includes('-')
          ? countryName.replaceAll('-', ' ')
          : countryName
      );
      setUserId(loggedUserDetails.id);
      const filteredCountry = loggedUserDetails.visited.filter(
        visited => visited.country === countryName
      );
      console.log(filteredCountry);
      if (filteredCountry.length > 0) {
        setVisited(true);
        setCountryId(filteredCountry[0].id);
        console.log(filteredCountry[0].id);
      } else {
        setVisited(false);
      }
    }
  }, [loggedUserDetails, countryName]);

  const handleAddCountry = async () => {
    try {
      const countryDetails = { country, userId };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/visited`,
        countryDetails
      );
      setVisited(true);
      const updatedVisited = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/userId?_embed=visited`
      );
      const currentCountry = updatedVisited.visited.filter(
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
        `${import.meta.env.VITE_BACKEND_URL}/visited/${countryId}`
      );
      setVisited(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    visited ? handleRemoveCountry() : handleAddCountry();
  };

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[300],
    width: '180px',
    height: '56px',
    margin: '20px 40px 10px',

    '&:hover': {
      backgroundColor: lightGreen[500],
      width: '180px',
      height: '56px',
      margin: '20px 40px 10px',
    },
  }));

  return (
    <div>
      {loggedIn ? (
        <GreenButton onClick={handleButtonClick}>
          {visited
            ? 'Remove Country from Visited List'
            : 'Add Country to Visited List'}
        </GreenButton>
      ) : (
        ''
      )}
    </div>
  );
}

export default AddRemoveVisited;
