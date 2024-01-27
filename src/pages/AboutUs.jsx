import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Patricia from '../assets/Patrícia.png';
import Ruben from '../assets/Ruben.png';

function AboutUs({ darkMode }) {
  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=2973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-[100vw] h-full min-h-[105vh] pt-[110px] max-[640px]:pt-[100px]"
    >
      <div
        className={` ${
          darkMode ? 'bg-[#222222]' : 'bg-white'
        } w-[90%] mx-auto bg-opacity-70 p-[30px] rounded-md max-[640px]:p-[20px]`}
      >
        <h1
          className={`text-xl text-center mb-[30px] mt-[0px] max-[640px]:mb-[20px]`}
        >
          About Us
        </h1>
        <div
          className={`flex justify-center max-[640px]:flex-col max-[640px]:items-center`}
        >
          <div className="text-center w-[50%] max-[640px]:mr-0 max-[640px]:mb-[15px] max-[640px]:w-[95%]">
            <h2 className="text-lg font-medium">Ana Patrícia Gomes</h2>
            <img
              src={Patricia}
              alt="Patrícia"
              className="mx-auto w-[100px] mt-[35px] max-[640px]:mt-[15px] max-[640px]:w-[80px]"
            />
            <div className="mt-[30px] max-[640px]:mt-[15px]">
              <LocationOnIcon />
              <a
                href="https://maps.app.goo.gl/p21MQCrtdEj5Ws8s6"
                target="_blank"
                rel="noopener noreferrer"
              >
                &nbsp; Lisbon, Portugal
              </a>
            </div>
            <div className="mt-[30px] max-[640px]:mt-[15px] ">
              <a
                href="https://github.com/anapatriciagomes"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-[70px] max-[250px]:mr-[20px]"
              >
                <GitHubIcon style={{ width: '42px', height: '42px' }} />
              </a>
              <a
                href="https://www.linkedin.com/in/anapatriciagomes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon style={{ width: '42px', height: '42px' }} />
              </a>
            </div>
          </div>

          <div className="text-center w-[50%] max-[640px]:ml-0 max-[640px]:mt-[15px] max-[640px]:w-[95%]">
            <h2 className="text-lg font-medium text-center">Ruben Abreu</h2>
            <img
              src={Ruben}
              alt="Ruben"
              className="mx-auto w-[100px] mt-[35px] max-[640px]:mt-[15px] max-[640px]:w-[80px]"
            />
            <div className="mt-[30px] max-[640px]:mt-[15px]">
              <LocationOnIcon />
              <a
                href="https://maps.app.goo.gl/p21MQCrtdEj5Ws8s6"
                target="_blank"
                rel="noopener noreferrer"
              >
                &nbsp; Lisbon, Portugal
              </a>
            </div>
            <div className="mt-[30px] max-[640px]:mt-[20px]">
              <a
                href="https://github.com/ruben-abreu"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-[70px] max-[250px]:mr-[20px]"
              >
                <GitHubIcon style={{ width: '42px', height: '42px' }} />
              </a>
              <a
                href="https://www.linkedin.com/in/ruben-abreu1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon style={{ width: '42px', height: '42px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
