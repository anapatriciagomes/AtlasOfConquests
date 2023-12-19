import { useState, useEffect } from 'react';
import axios from 'axios';
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

function LoginPage({ setLoginPageActive }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');

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
    setIsValidEmail(true);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (isValidEmail) {
      // Perform login logic
    } else {
      // Handle invalid email
      console.log('Invalid email format');
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    width: '500px',
    height: '56px',
    margin: 8,

    '&:hover': {
      backgroundColor: grey[700],
      width: '500px',
      height: '56px',
      margin: 8,
    },
  }));

  return (
    <div className="w-5/6 mt-[150px] mx-auto">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FormControl sx={{ m: 1, width: '500px' }} variant="outlined">
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

        <FormControl sx={{ m: 1, width: '500px' }} variant="outlined">
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
        <ColorButton onClick={handleLogin}>Log in</ColorButton>
      </Box>
    </div>
  );
}

export default LoginPage;
