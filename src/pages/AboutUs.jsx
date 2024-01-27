import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Patricia from '../assets/Patrícia.png';
import Ruben from '../assets/Ruben.png';

function AboutUs() {
  return (
    <div className='mt-[120px]'>
      <h1 className='text-xl text-center my-[30px]'>About Us</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center'>
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
          <p className='mt-[30px]'>
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
          </p>
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
          <p className='mt-[30px]'>
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
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
