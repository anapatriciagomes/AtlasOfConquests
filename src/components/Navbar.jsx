import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

function Navbar() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[100]),
    backgroundColor: orange[100],
    '&:hover': {
      backgroundColor: orange[500],
    },
  }));

  return (
    <nav className="py-4 px-6 fixed top-0 left-0 w-full bg-white">
      <div className="flex justify-between">
        <Link to="/">
          <ColorButton>Home</ColorButton>
        </Link>
        <Link to="/login">
          <ColorButton>Log in</ColorButton>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
