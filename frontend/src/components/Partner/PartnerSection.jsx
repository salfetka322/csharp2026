import bgPartner from '../../assets/backrounds/bgPartner.png';
import PartnerContent from './PartnerContent';

const PartnerSection = () => {
  return (
    <section
      className='relative flex justify-center w-full min-h-screen px-5 md:px-23 bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'
      style={{
        backgroundImage: `url(${bgPartner})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
      </div>
      <div className='relative z-10 flex items-center justify-center min-h-screen w-full'>
        <PartnerContent />
      </div>
    </section>
  );
};

export default PartnerSection;
