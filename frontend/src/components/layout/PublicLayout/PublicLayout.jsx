import { Outlet } from 'react-router';

import ScrollToTop from '../../../helpers/ScrollToTop';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      {<Header />}
      {
        <main className='relative min-h-screen pt-15'>
          <Outlet />
        </main>
      }
      {<Footer />}
    </>
  );
};

export default PublicLayout;
