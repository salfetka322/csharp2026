import { Link } from 'react-router';

import LogoIcon from '../../assets/icons/Logo.svg';
import LogoPhone from '../../assets/icons/LogoPhone.svg';

const Logo = () => {
  return (
    <>
      <Link to='/' className='items-center hidden md:flex'>
        <img src={LogoIcon} alt='loomi' className='w-full h-full' />
      </Link>
      <Link to='/' className='flex items-center md:hidden'>
        <img src={LogoPhone} alt='loomi' className='w-full h-full' />
      </Link>
    </>
  );
};

export default Logo;
