const Banner = ({ title, text }) => {
  return (
    <section className='relative w-full px-5 py-12 text-center rounded-md md:px-10 md:py-16 lg:py-20 bg-black/10 backdrop-blur-sm border border-white/10'>
      <h2 className='w-full font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-6xl lg:leading-[3.5rem] xl:leading-[4.25rem] mb-3 md:mb-4 last:mb-0'>
        {title}
      </h2>
      <p className='sm:max-w-[500px] sm:m-auto text-base'>{text}</p>
    </section>
  );
};

export default Banner;
