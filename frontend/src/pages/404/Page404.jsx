import Logo from '../../assets/icons/Logo.svg';
import FuzzyText from '../../components/UI/FuzzyText';

const Page404 = () => {
  return (
    <section className='relative min-h-screen flex justify-center bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'>
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
      </div>
      <div className='relative z-10'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <div className='w-30 h-30'>
          <img src={Logo} alt='logo' className='w-full h-full' />
        </div>
        <div className='flex flex-col items-center gap-5'>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            color='#F73149'
            fontSize='7rem'
          >
            404
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            color='#F73149'
            fontSize='7rem'
          >
            not found
          </FuzzyText>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Page404;
