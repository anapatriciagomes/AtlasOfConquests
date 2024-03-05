import { useState, useEffect, useContext } from 'react';
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
import { login, signup, getUserDetails, forgotPassword } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import CircularProgress from '@mui/material/CircularProgress';

function LoginPage({
  email,
  setEmail,
  password,
  setPassword,
  setLoginPageActive,
  setLoggedUserDetails,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const { storeToken, authenticateUser } = useContext(AuthContext);

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

  useEffect(() => {
    return setLoginPageActive(true);
  }, []);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setIsValidPassword(false);
    }
  };

  const handleEmailChange = event => {
    setEmail(event.target.value.trim());
    localStorage.setItem('email', event.target.value.trim());
    console.log(localStorage.getItem('email'));
    setIsValidEmail(true);
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

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    setIsValidPassword(true);
  };

  const handleLogin = async () => {
    if (!isValidEmail) {
      alert('Invalid email format');
      return;
    }

    if (password.trim() === '') {
      alert('Password cannot be empty');
      return;
    }

    const user = { email, password };

    setIsLoading(true);

    try {
      const response = await login(user);
      const userDetails = await getUserDetails(response.data.userId);

      setIsLoading(false);
      storeToken(response.data.authToken);
      authenticateUser();
      const { _id, email, visited, wishlist } = userDetails.data;
      const userData = { _id, email, visited, wishlist };

      setLoggedUserDetails(userData);
      localStorage.setItem('loggedUserDetails', JSON.stringify(userData));
      setLoginPageActive(false);
      setPassword('');
      navigate('/map-visited-wishlist');
    } catch (error) {
      setIsLoading(false);
      console.log('Error logging in', error);
      alert(error.response.data.message);
    }
  };

  const handleRegister = async () => {
    if (!isValidEmail) {
      alert('Invalid email format');
      return;
    }

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

    const user = { email, password };

    setIsLoading(true);

    try {
      await signup(user);

      setIsLoading(false);
      alert('Your registration was successful, please log in.');
      setEmail('');
      setPassword('');
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsLoading(false);
      setForgotPasswordClicked(false);
      alert(
        'Please check your email inbox and spam, you will receive a reset link in the next few minutes'
      );
    } catch (error) {
      console.log('Error on password reset', error);
      alert(error.response.data.message);
    }
  };

  const GreyButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    width: width < 610 ? `${width * 0.95}px` : '500px',
    height: '56px',
    margin: width < 610 ? '8px 0' : 8,

    '&:hover': {
      backgroundColor: grey[600],
      width: width < 610 ? `${width * 0.95}px` : '500px',
      height: '56px',
      margin: width < 610 ? '8px 0' : 8,
    },
  }));

  const OrangeButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[300],
    width: width < 610 ? `${width * 0.95}px` : '500px',
    height: '56px',
    margin: width < 610 ? '8px 0' : 8,

    '&:hover': {
      backgroundColor: orange[500],
      width: width < 610 ? `${width * 0.95}px` : '500px',
      height: '56px',
      margin: width < 610 ? '8px 0' : 8,
    },
  }));

  return (
    <div className="w-5/6 mt-[150px] mx-auto max-[610px]:w-[95%]">
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
            m: width < 610 ? '8px 0px' : '8px',
            width: width < 610 ? `${width * 0.95}px` : '500px',
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
              <InputAdornment position="end" sx={{ width: '40px' }}>
                <AccountCircle sx={{ marginLeft: '16px' }} />
              </InputAdornment>
            }
            label="Email"
          />
          {!isValidEmail && (
            <FormHelperText error>Invalid Email</FormHelperText>
          )}
        </FormControl>

        {!forgotPasswordClicked && (
          <FormControl
            sx={{
              m: width < 610 ? '8px 0px' : '8px',
              width: width < 610 ? `${width * 0.95}px` : '500px',
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
                      marginLeft: '8px',
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {!isValidPassword && (
              <FormHelperText error>
                Password should be at least 8 characters long and include
                uppercase, lowercase, and digits.
              </FormHelperText>
            )}
          </FormControl>
        )}

        <GreyButton
          onClick={!forgotPasswordClicked ? handleLogin : handleForgotPassword}
        >
          {!forgotPasswordClicked ? 'Log in' : 'Reset password'}
        </GreyButton>
        {!forgotPasswordClicked && (
          <OrangeButton onClick={handleRegister}>Register</OrangeButton>
        )}
        {!forgotPasswordClicked && (
          <button
            onClick={() => setForgotPasswordClicked(true)}
            className="mt-[10px]"
          >
            Forgot password?
          </button>
        )}
        <div className="my-[6px]">{isLoading && <CircularProgress />}</div>
      </Box>
    </div>
  );
}

export default LoginPage;
