import { useState, useEffect, useContext } from 'react';
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
import { changePassword, deleteAccount } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';

function UserAccountPage({ password, setPassword, loggedUserDetails }) {
  const [showPassword, setShowPassword] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { logoutUser } = useContext(AuthContext);

  const validatePassword = () => {
    if (password.trim() === '') {
      setIsValidPassword(false);
    }
  };

  const isStrongPassword = password => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      if (password.trim() === '') {
        alert('Password cannot be empty');
        return;
      }

      if (!isStrongPassword(password)) {
        setIsValidPassword(false);
        alert(
          'Password is not strong enough. Please follow the password requirements.'
        );
        return;
      }

      const { email, _id } = loggedUserDetails;

      const user = { email, password, _id };

      await changePassword(user);
      alert('Your password has been successfuly updated.');
      setPassword('');
    } catch (error) {
      console.log('Error updating password', error);
      alert(error.response.data.message);
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
      await deleteAccount(loggedUserDetails._id);
      logoutUser();
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('loggedUserDetails');
      localStorage.removeItem('email');
      localStorage.removeItem('countryId');
      navigate('/');
    } catch (error) {
      console.log('Error deleting user account', error);
      alert(error.response.data.message);
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
    width: width < 600 ? `${width * 0.95}px` : '572px',
    height: '56px',
    marginTop: 20,
    marginLeft: 0,
    marginRight: 0,

    '&:hover': {
      backgroundColor: red[400],
      width: width < 600 ? `${width * 0.95}px` : '572px',
      height: '56px',
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
    },
  }));

  return (
    <div className="w-[580px] mt-[150px] mx-auto max-[600px]:w-[95%]">
      <List>
        <ListItem sx={{ height: '68px', padding: 0 }}>
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
        <ListItem sx={{ padding: 0 }}>
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
              onBlur={validatePassword}
              error={!isValidPassword}
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
        <ListItem
          sx={{
            paddingLeft: '8px',
            paddingRight: width < 600 ? '8px' : '28px',
          }}
        >
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
