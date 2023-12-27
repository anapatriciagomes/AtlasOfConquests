import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import worldImage from '../assets/world_atlas_favicon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({
  loginPageActive,
  setLoginPageActive,
  loggedIn,
  setLoggedIn,
  setLoggedUserDetails,
  setUserId,
}) {
  const OrangeButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[100]),
    backgroundColor: orange[100],
    '&:hover': {
      backgroundColor: orange[500],
    },
  }));

  return (
    <nav className=" z-10 py-4 px-6 fixed top-0 left-0 w-full bg-[#ededed]">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setLoginPageActive(false)}
        >
          <img src={worldImage} alt="world" className="w-10 h-10 mr-3" />
          <h1 className="text-4xl max-[610px]:text-2xl text-center">
            Atlas Of Conquests
          </h1>
        </Link>
        <div className="flex items-center">
          {loginPageActive ? (
            ''
          ) : (
            <div>
              <Link to="/login">
                <OrangeButton
                  onClick={() => {
                    if (loggedIn) {
                      setLoggedIn(false);
                      setLoggedUserDetails(null);
                      setUserId(0);
                    }
                  }}
                >
                  {loggedIn ? 'Log out' : 'Log in'}
                </OrangeButton>
              </Link>
            </div>
          )}
          {loggedIn ? (
            <Link to="/user-account">
              <AccountCircleIcon className="ml-4" />
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
