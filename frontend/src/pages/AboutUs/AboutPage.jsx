import { useEffect } from 'react';
import WhoWeAre from '../../components/AboutUs/WhoWeAre';
import WhyUs from '../../components/AboutUs/WhyUs';
import Newsletter from '../../components/Newsletter/Newsletter';
import Banner from '../../components/UI/Banner';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'Про нас';
  }, []);

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'>
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
      </div>
      <div className='relative z-10'>
        <WhyUs />
        <div className='px-4 md:px-5 lg:px-23 text-white pt-6 md:pt-10'>
          <Banner
            title={'Твої історії починаються тут'}
            text={
              'Ми віримо, що студентські знайомства — це більше, ніж свайпи. Це історії, які залишаються з тобою на все життя.'
            }
          />
        </div>
        <WhoWeAre />
        <div className='px-4 md:px-5 pt-6 md:pt-10'>
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
