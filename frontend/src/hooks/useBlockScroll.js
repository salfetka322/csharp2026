import { useEffect } from 'react';

const useBlockScroll = (state, lenis) => {
  useEffect(() => {
    if (state) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [state, lenis]);
};

export default useBlockScroll;
