import LoaderImg from '../../assets/icons/Logo.svg';

const Loader = () => {
  return (
    <section className='w-full min-h-screen bg-[#F73149] flex items-center justify-center'>
      <div className='flex items-center justify-center w-30 h-30 animate-bounce'>
        <img src={LoaderImg} alt='Loader' className='w-full h-full' />
      </div>
    </section>
  );
};

export default Loader;
