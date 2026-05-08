const FooterBottom = () => {
  return (
    <div className='w-full py-7 px-15'>
      <div className='flex flex-col items-center justify-between gap-2 m-auto md:flex-row md:gap-0 max-w-screen-2xl'>
        <p className='text-sm text-white'>
          <span className=''>Design by loomi.</span>
          <span>
            {' '}
            Powered by{' '}
            <a
              href='https://github.com/andriydrob'
              alt='GitHub account'
              target='_blank'
              className='underline'
            >
              Andrii Drob
            </a>
          </span>
        </p>
        <p className='text-sm text-white'>
          © 2025 Loomi, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
