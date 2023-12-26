import { useState } from 'react';
import { lightGreen } from '@mui/material/colors';

function AddRemoveVisited() {
  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: lightGreen[300],
    width: '500px',
    height: '56px',
    margin: 8,

    '&:hover': {
      backgroundColor: lightGreen[500],
      width: '500px',
      height: '56px',
      margin: 8,
    },
  }));

  return <GreenButton onClick={handleButtonClick}>Log in</GreenButton>;
}

export default AddRemoveVisited;
