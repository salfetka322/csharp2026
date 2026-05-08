import { Outlet, useLocation } from 'react-router';
import ScrollToTop from '../../../helpers/ScrollToTop';
import Sidebar from '../Sidebar/Sidebar';

const PrivateLayout = () => {
  const { pathname } = useLocation();

  const noLayoutPages = ['/create'];

  const hideLayout = noLayoutPages.includes(pathname);

  if (hideLayout) {
    return (
      <main className='relative min-h-screen'>
        <Outlet />
      </main>
    );
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <ScrollToTop />
      <Sidebar />
      <main className='relative min-h-screen w-full bg-[#272727]'>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
