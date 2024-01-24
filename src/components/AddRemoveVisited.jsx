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
  showSmallButton,
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
      localStorage.setItem('userId', loggedUserId.toString());
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
  }, [countryName, loggedUserDetails, loggedUserId]);

  const handleAddCountry = async () => {
    try {
      if (loggedUserId === 0) {
        setUserId(+parseInt(localStorage.getItem('userId')));
      }
      const countryDetails = { country, userId };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/visited`,
        countryDetails
      );
      setVisited(true);
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
        `${import.meta.env.VITE_BACKEND_URL}/visited/${countryId}`
      );
      setVisited(false);
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
    if (visited) {
      handleRemoveCountry();
    } else {
      handleAddCountry();
    }
  };

  const handleSmallButtonClick = () => {
    if (visited) {
      handleRemoveCountry();
    } else {
      handleAddCountry();
    }
  };

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[300],
    width: '170px',
    height: '56px',

    '&:hover': {
      backgroundColor: lightGreen[500],
      width: '170px',
      height: '56px',
    },
  }));

  const SmallGreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[300],
    width: '150px',
    height: '36px',

    '&:hover': {
      backgroundColor: lightGreen[500],
      width: '150px',
      height: '36px',
    },
  }));

  return (
    <div>
      {loggedIn ? (
        <div>
          {showSmallButton ? (
            <SmallGreenButton onClick={handleSmallButtonClick}>
              {visited ? (
                <span style={{ fontSize: '12px' }}>
                  Remove from Visited List
                </span>
              ) : (
                <span style={{ fontSize: '12px' }}>Add to Visited List</span>
              )}
            </SmallGreenButton>
          ) : (
            <GreenButton onClick={handleButtonClick}>
              {visited ? 'Remove from Visited List' : 'Add to Visited List'}
            </GreenButton>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
export default AddRemoveVisited;
