import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { orange } from '@mui/material/colors';

function LoginPage({
  email,
  setEmail,
  password,
  setPassword,
  setLoginPageActive,
  setLoggedIn,
  setLoggedUserDetails,
  setUserId,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [users, setUsers] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

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

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/?_embed=visited&_embed=wishlist`
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [email]);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  useEffect(() => {
    return setLoginPageActive(true);
  }, []);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
    localStorage.setItem('email', event.target.value);
    console.log(localStorage.getItem('email'));
    setIsValidEmail(true);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (!isValidEmail) {
      alert('Invalid email format');
      return;
    }

    if (password.trim() === '') {
      alert('Password cannot be empty');
      return;
    }

    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      setLoggedUserDetails(user);
      localStorage.setItem('loggedUserDetails', JSON.stringify(user));
      setUserId(user.id);
      localStorage.setItem('userId', user.id.toString());
      setLoggedIn(true);
      localStorage.setItem('loggedIn', true);
      setLoginPageActive(false);
      setPassword('');
      navigate('/map-visited-wishlist');
    } else if (users.find(user => user.email === email) === undefined) {
      alert('Email does not exist, try registering.');
    } else {
      alert('Wrong Password');
    }
  };

  const handleRegister = async () => {
    try {
      if (!isValidEmail) {
        alert('Invalid email format');
        return;
      }

      if (password.trim() === '') {
        alert('Password cannot be empty');
        return;
      }

      if (users.find(user => user.email === email) === undefined) {
        const userDetails = { email, password };
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users`,
          userDetails
        );
        alert('Your registration was successful, please log in.');
        setEmail('');
        setPassword('');
      } else {
        alert('This email already exists, please log in.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GreyButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    width: width < 550 ? `${width * 0.95}px` : '500px',
    height: '56px',
    margin: width < 550 ? '8px 0' : 8,

    '&:hover': {
      backgroundColor: grey[600],
      width: width < 550 ? `${width * 0.95}px` : '500px',
      height: '56px',
      margin: width < 550 ? '8px 0' : 8,
    },
  }));

  const OrangeButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[300],
    width: width < 550 ? `${width * 0.95}px` : '500px',
    height: '56px',
    margin: width < 550 ? '8px 0' : 8,

    '&:hover': {
      backgroundColor: orange[500],
      width: width < 550 ? `${width * 0.95}px` : '500px',
      height: '56px',
      margin: width < 550 ? '8px 0' : 8,
    },
  }));

  return (
    <div className="w-5/6 mt-[150px] mx-auto max-[550px]:w-[95%]">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FormControl
          sx={{
            m: width < 550 ? '8px 0px' : '8px',
            width: width < 550 ? `${width * 0.95}px` : '500px',
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            error={!isValidEmail}
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            }
            label="Email"
          />
          {!isValidEmail && (
            <FormHelperText error>Invalid Email</FormHelperText>
          )}
        </FormControl>

        <FormControl
          sx={{
            m: width < 550 ? '8px 0px' : '8px',
            width: width < 550 ? `${width * 0.95}px` : '500px',
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
        <GreyButton onClick={handleLogin}>Log in</GreyButton>
        <OrangeButton onClick={handleRegister}>Register</OrangeButton>
      </Box>
    </div>
  );
}

export default LoginPage;
