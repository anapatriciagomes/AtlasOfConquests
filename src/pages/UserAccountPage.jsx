import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function UserAccountPage({ loggedUserDetails, userId }) {
  const GreyButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    width: '170px',
    height: '56px',
    margin: 8,

    '&:hover': {
      backgroundColor: grey[600],
      width: '170px',
      height: '56px',
    },
  }));

  return (
    <div className="w-5/6 mt-[150px] mx-auto">
      <List className="w-[700px]">
        <ListItem className="h-[68px] mb-4">
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            primary={
              loggedUserDetails ? `Email: ${loggedUserDetails.email}` : 'Email'
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <Box
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Change password"
              variant="outlined"
            />
            <GreyButton>Change Password</GreyButton>
          </Box>
        </ListItem>
      </List>
    </div>
  );
}

export default UserAccountPage;
