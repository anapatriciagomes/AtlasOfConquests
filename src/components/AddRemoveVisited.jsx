import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

function AddRemoveVisited({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  loggedUserId,
  countryName,
}) {
  const [visited, setVisited] = useState(false);
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
    if (loggedUserDetails && loggedUserDetails.visited) {
      const filteredCountry = loggedUserDetails.visited.filter(
        visited => visited.country === countryName.replaceAll('-', ' ')
      );

      if (filteredCountry.length > 0) {
        setVisited(true);
        setCountryId(filteredCountry[0].id);
      } else {
        setVisited(false);
      }
    }
  }, []);

  const handleAddCountry = async () => {
    try {
      const countryDetails = { country, userId };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/visited`,
        countryDetails
      );
      setVisited(true);
      const updatedVisited = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}?_embed=visited`
      );
      setCountryId(updatedVisited.data.visited.slice(-1)[0].id);
      const updatedUserDetails = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/${userId}?_embed=visited&_embed=wishlist`
      );
      setLoggedUserDetails(updatedUserDetails.data);
      console.log(updatedUserDetails.data);
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
      const updatedUserDetails = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/${userId}?_embed=visited&_embed=wishlist`
      );
      setLoggedUserDetails(updatedUserDetails.data);
      console.log(updatedUserDetails.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    if (visited) {
      handleRemoveCountry();
    } else {
      handleAddCountry();
    }
  };

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[300],
    width: '180px',
    height: '56px',
    margin: '20px 10px 10px 40px',

    '&:hover': {
      backgroundColor: lightGreen[500],
      width: '180px',
      height: '56px',
      margin: '20px 10px 10px 40px',
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
