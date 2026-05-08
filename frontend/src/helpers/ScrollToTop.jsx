import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { lenis } from '../lenisInstance';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    lenis.stop();
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const timeout = setTimeout(() => {
      lenis.start();
    }, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
