import { IoSettingsOutline } from 'react-icons/io5';
import { RiHeartsLine } from 'react-icons/ri';
import { TbHeartSearch } from 'react-icons/tb';
import { NavLink } from 'react-router';
import LogoIcon from '../../../assets/icons/Logo.svg';
import LogoPhone from '../../../assets/icons/LogoPhone.svg';

const SidebarNavigation = () => {
  const navItems = [
    {
      path: '/finding',
      icon: <TbHeartSearch size={30} />,
    },
    {
      path: '/matches',
      icon: <RiHeartsLine size={30} />,
    },
    {
      path: '/settings',
      icon: <IoSettingsOutline size={30} />,
    },
  ];

  return (
    <nav className='flex flex-row md:flex-col gap-4 pt-10 md:pt-5'>
      <div className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-10'>
        <img 
          src={LogoIcon} 
          alt='loomi' 
          className='hidden md:block w-full h-full object-contain'
        />
        <img 
          src={LogoPhone} 
          alt='loomi' 
          className='block md:hidden w-full h-full object-contain'
        />
      </div>
      {navItems.map(({ path, icon }) => (
        <NavLink key={path} to={path}>
          {({ isActive }) => (
            <div
              className={`w-9 h-9 md:w-11 md:h-11 flex justify-center items-center transition-colors duration-300 rounded-full hover:bg-white hover:text-black  ${
                isActive ? 'bg-white' : 'text-white'
              }`}
            >
              {icon}
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default SidebarNavigation;
