import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Patricia from '../assets/Patrícia.png';
import Ruben from '../assets/Ruben.png';

function AboutUs() {
  return (
    <div className='mt-[120px]'>
      <h1 className='text-xl text-center my-[30px]'>About Us</h1>
      <div className='grid grid-cols-2 justify-items-center'>
        <div>
          <h2 className='text-lg'>Ana Patrícia Gomes</h2>
          <img src={Patricia} alt='Patrícia' className='w-[100px]' />
          <LocationOnIcon />
          <a
            href='https://maps.app.goo.gl/p21MQCrtdEj5Ws8s6'
            target='_blank'
            rel='noopener noreferrer'
          >
            &nbsp; Lisbon, Portugal
          </a>
          <p>
            <a
              href='https://github.com/anapatriciagomes'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GitHubIcon style={{ width: '42px', height: '42px' }} />
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
        <div>
          <h2 className='text-lg'>Ruben Abreu</h2>
          <img src={Ruben} alt='Ruben' className='w-[100px]' />
          <LocationOnIcon />
          <a
            href='https://maps.app.goo.gl/p21MQCrtdEj5Ws8s6'
            target='_blank'
            rel='noopener noreferrer'
          >
            &nbsp; Lisbon, Portugal
          </a>
          <p>
            <a href='https://github.com/ruben-abreu'>
              <GitHubIcon style={{ width: '42px', height: '42px' }} />
            </a>
            <a href='https://www.linkedin.com/in/ruben-abreu1/'>
              <LinkedInIcon style={{ width: '42px', height: '42px' }} />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
