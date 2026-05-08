import { NavLink } from 'react-router';

const HeaderNavigation = () => {
  const navItems = [
    { path: '/about', label: 'Про нас' },
    { path: '/safety', label: 'Поради та безпека' },
    { path: '/support', label: 'Підтримка' },
  ];

  return (
    <>
      {navItems.map(({ path, label }) => (
        <NavLink key={label} to={path}>
          {({ isActive }) => (
            <span
              className={`text-base md:text-lg transition-all duration-300 rounded-2xl font-bold px-4 py-2 ${
                isActive 
                  ? 'bg-white text-[#F73149] shadow-lg' 
                  : 'text-white hover:bg-white/20 hover:text-white'
              }`}
            >
              {label}
            </span>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default HeaderNavigation;
