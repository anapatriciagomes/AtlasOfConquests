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
      className='w-[100vw] h-[100vh] pt-[160px] sm: pb-[750px]'
    >
      <div
        className={` ${
          darkMode ? 'bg-[#222222]' : 'bg-white'
        } w-[90%] mx-auto bg-opacity-70 p-4 rounded-md `}
      >
        <h1 className={`text-xl text-center mb-[30px] mt-[0px] `}>About Us</h1>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center `}
        >
          <div className='sm:mr-4 mb-4 sm:mb-0'>
            <h2 className='text-lg font-medium'>Ana Patrícia Gomes</h2>
            <img
              src={Patricia}
              alt='Patrícia'
              className='mx-auto max-w-[100px] mt-[35px]'
            />
            <div className='mt-[30px]'>
              <LocationOnIcon />
              <a
                href='https://maps.app.goo.gl/p21MQCrtdEj5Ws8s6'
                target='_blank'
                rel='noopener noreferrer'
              >
                &nbsp; Lisbon, Portugal
              </a>
            </div>
            <div className='mt-[30px]'>
              <a
                href='https://github.com/anapatriciagomes'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHubIcon
                  style={{ width: '42px', height: '42px', marginRight: '70px' }}
                />
              </a>
              <a
                href='https://www.linkedin.com/in/anapatriciagomes/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInIcon style={{ width: '42px', height: '42px' }} />
              </a>
            </div>
          </div>

          <div className='text-center sm:text-left '>
            <h2 className='text-lg font-medium text-center'>Ruben Abreu</h2>
            <img
              src={Ruben}
              alt='Ruben'
              className='mx-auto max-w-[100px] mt-[35px]'
            />
            <div className='mt-[30px]'>
              <LocationOnIcon />
              <a
                href='https://maps.app.goo.gl/p21MQCrtdEj5Ws8s6'
                target='_blank'
                rel='noopener noreferrer'
              >
                &nbsp; Lisbon, Portugal
              </a>
            </div>
            <div className='mt-[30px]'>
              <a
                href='https://github.com/ruben-abreu'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHubIcon
                  style={{ width: '42px', height: '42px', marginRight: '70px' }}
                />
              </a>
              <a
                href='https://www.linkedin.com/in/ruben-abreu1/'
                target='_blank'
                rel='noopener noreferrer'
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
