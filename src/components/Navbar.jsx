import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <nav className="my-4 px-6 fixed top-0 left-0 w-full">
      <div className="flex justify-between">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/login">
          <Button>Log in</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
