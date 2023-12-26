import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

function AddRemoveVisited({ loggedIn, loggedUserDetails }) {
  const [visited, setVisited] = useState(false);

  const handleButtonClick = () => {
    if (loggedIn) {
      console.log(loggedUserDetails);
    }
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
    <div>
      {loggedIn ? (
        <GreenButton onClick={handleButtonClick}>
          {visited
            ? 'Remove Country to Visited List'
            : 'Add Country to Visited List'}
        </GreenButton>
      ) : (
        ''
      )}
    </div>
  );
}

export default AddRemoveVisited;
