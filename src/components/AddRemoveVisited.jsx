import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

function AddRemoveVisited({ loggedUserDetails }) {
  const handleButtonClick = () => {
    console.log(loggedUserDetails);
  };

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[300],
    width: '180px',
    height: '56px',
    margin: 18,

    '&:hover': {
      backgroundColor: lightGreen[500],
      width: '180px',
      height: '56px',
      margin: 18,
    },
  }));

  return (
    <GreenButton onClick={handleButtonClick}>
      Add Country to Visited List
    </GreenButton>
  );
}

export default AddRemoveVisited;
