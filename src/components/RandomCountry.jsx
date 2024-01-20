import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import attractions from '../assets/attractions.json';
import CountryCodeConverter from './CountryCodeConverter';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

function RandomCountry() {
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

  const handleRandomCountry = () => {
    const randomIndex = Math.floor(
      Math.random() * Object.keys(attractions).length
    );
    const randomCountry = Object.keys(attractions)[randomIndex];
    console.log(randomCountry);
    const randomCountryCode = CountryCodeConverter({
      countryName: randomCountry,
    });

    navigate(
      `/country/${randomCountryCode}/${randomCountry.replaceAll(' ', '-')}`
    );
  };

  return (
    <OrangeButton onClick={handleRandomCountry}>Random Country</OrangeButton>
  );
}

export default RandomCountry;
