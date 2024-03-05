import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { resetPassword } from '../api/auth.api';
import CircularProgress from '@mui/material/CircularProgress';

function ResetPassword({ password, setPassword }) {
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);

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

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    setIsValidPassword(true);
  };

  const handleUpdatePassword = async () => {
    if (password.trim() === '') {
      alert('Password cannot be empty');
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        'Password must have at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
      );
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, password);

      setIsLoading(false);
      alert('Your password was successfully updated. Please log in.');

      setPassword('');

      navigate('/login');
    } catch (error) {
      setIsLoading(false);
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
        <GreyButton onClick={handleUpdatePassword}>Change Password</GreyButton>

        <div className="my-[6px]">{isLoading && <CircularProgress />}</div>
      </Box>
    </div>
  );
}

export default ResetPassword;
