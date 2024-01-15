import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { red } from '@mui/material/colors';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function UserAccountPage({
  email,
  password,
  setPassword,
  loggedUserDetails,
  userId,
  setLoggedIn,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleChangePasswordButton = async () => {
    try {
      const requestDetails = { email, password };
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        requestDetails
      );
      alert('Your password has been successfuly updated.');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      setOpen(false);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`);
      setLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

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

  const RedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[200],
    width: '572px',
    height: '56px',
    marginTop: 20,
    marginLeft: 12,
    marginRight: 8,

    '&:hover': {
      backgroundColor: red[400],
      width: '572px',
      height: '56px',
      marginTop: 20,
      marginLeft: 12,
      marginRight: 8,
    },
  }));

  return (
    <div className="w-[580px] mt-[150px] mx-auto">
      <List>
        <ListItem sx={{ height: '68px' }}>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            sx={
              ({
                '& > :not(style)': { m: 1 },
              },
              { marginLeft: '20px' })
            }
            primary={
              loggedUserDetails ? `Email: ${loggedUserDetails.email}` : 'Email'
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <LockIcon />
          </ListItemIcon>
          <FormControl
            sx={{
              m: 1,
              width: '300px',
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      marginRight: -1,
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <GreyButton onClick={handleChangePasswordButton}>
            Change Password
          </GreyButton>
        </ListItem>
        <ListItem>
          <React.Fragment>
            <RedButton onClick={handleClickOpen}>Delete Account</RedButton>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {'Are you sure you want to delete your account?'}
              </DialogTitle>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteAccount} autoFocus>
                  Delete Account
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </ListItem>
      </List>
    </div>
  );
}

export default UserAccountPage;
