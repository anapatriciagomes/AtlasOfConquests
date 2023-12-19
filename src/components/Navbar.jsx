import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import worldImage from '../assets/world_atlas_favicon.png';

function Navbar() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[100]),
    backgroundColor: orange[100],
    '&:hover': {
      backgroundColor: orange[500],
    },
  }));

  return (
    <nav className="py-4 px-6 fixed top-0 left-0 w-full bg-[#ededed]">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex">
          <img src={worldImage} alt="world" className="w-10 mr-3" />
          <h1 className="text-4xl text-center">Atlas Of Conquests</h1>
        </Link>
        <Link to="/login">
          <ColorButton>Log in</ColorButton>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
