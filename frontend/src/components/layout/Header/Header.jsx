import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { AuthContext } from '../../../context/AuthContext';
import useBlockScroll from '../../../hooks/useBlockScroll';
import { lenis } from '../../../lenisInstance';
import Logo from '../../common/Logo';
import HeaderNavigation from './HeaderNavigation';
import HeaderSignIn from './HeaderSignIn';

const Header = () => {
  const location = useLocation();
  const { isOpenSignUp } = useContext(AuthContext);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [signInModal, setSignInModal] = useState(false);

  useBlockScroll(signInModal, lenis);

  useEffect(() => {
    setIsBurgerOpen(false);
  }, [location.pathname]);

  return (
    <header className='fixed top-0 left-0 z-50 flex justify-between items-center w-full bg-gradient-to-r from-[#F73149] via-[#ff5c7a] to-[#F73149] h-16 pr-3 md:px-6 border-b border-white/20'>
      <div className='flex items-center gap-3'>
        <Logo />{' '}
        <Link to='/' className='text-3xl md:text-4xl font-bold text-white tracking-tight hover:text-white/90 transition-colors duration-300'>
          loomi
        </Link>
      </div>
      <button
        className='md:hidden focus:outline-none'
        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
      >
        {isBurgerOpen ? (
          <X color='#ffffff' size={28} />
        ) : (
          <Menu color='#ffffff' size={28} />
        )}
      </button>
      {isBurgerOpen && (
        <AnimatePresence>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='absolute top-14 left-0 w-full flex flex-col items-center gap-6 p-4 z-40 md:hidden bg-gradient-to-r from-[#F73149] via-[#ff5c7a] to-[#F73149] border-b border-white/20'
          >
            <ul className='flex flex-col items-center justify-center gap-5 md:flex-row md:gap-16'>
              <HeaderNavigation />
            </ul>
          </motion.nav>
        </AnimatePresence>
      )}
      <nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className='hidden md:flex md:flex-row '
      >
        <ul className='flex items-center justify-center gap-16'>
          <HeaderNavigation />
        </ul>
      </nav>
      <div className='hidden md:flex'>
        <HeaderSignIn
          setSignInModal={setSignInModal}
          signInModal={signInModal}
          isOpenSignUp={isOpenSignUp}
        />
      </div>
    </header>
  );
};

export default Header;
