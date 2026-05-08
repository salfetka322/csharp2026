import PartnerLogo from '../../assets/icons/PartnerLogo.png';

const PartnerContent = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20 md:items-center md:justify-center max-w-6xl w-full'>
      <div className='w-70 md:w-100 flex justify-center flex-shrink-0'>
        <img
          src={PartnerLogo}
          alt='DUIKT logo'
          className='object-cover w-full h-full '
        />
      </div>
      <div className='flex flex-col items-center text-center max-w-md'>
        <h1 className='mb-5 text-2xl font-bold text-center text-white md:text-5xl'>
          Підтримка університету
        </h1>
        <p className='mb-5 text-base text-center text-white md:text-lg'>
          Ми вдяні нашому університету - Державному університету
          інформаційно-комунікаційних технологій (ДУІКТ) - за підтримку,
          можливості розвитку та натхнення для створення цього проекту.
        </p>
        <a
          href='https://duikt.edu.ua/ua/'
          target='_blank'
          className='text-white bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] py-3 px-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 text-center block w-full md:w-auto'
        >
          Дізнатися більше про ДУІКТ
        </a>
      </div>
    </div>
  );
};

export default PartnerContent;
