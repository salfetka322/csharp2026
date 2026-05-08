import { useContext, useState } from 'react';

import bgHero from '../../assets/backrounds/bgHero.jpg';
import { AuthContext } from '../../context/AuthContext';
import useBlockScroll from '../../hooks/useBlockScroll';
import { lenis } from '../../lenisInstance';
import SignUpForm from '../SigningForm/SignUpForm';
import Btn from '../UI/Btn';
import HeaderSignIn from '../layout/Header/HeaderSignIn';

const HeroSection = () => {
  const { isOpenSignUp, setIsOpenSignUp } = useContext(AuthContext);
  const [signInModal, setSignInModal] = useState(false);

  useBlockScroll(isOpenSignUp, lenis);
  useBlockScroll(signInModal, lenis);

  const handleSignUp = () => {
    setIsOpenSignUp(!isOpenSignUp);
  };

  return (
    <section
      className='min-h-screen'
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex flex-col items-center justify-center w-full min-h-screen text-black bg-gradient-to-b from-black/40 via-black/30 to-black/40'>
        <h1 className='text-3xl md:text-5xl lg:text-7xl font-bold text-white text-center px-4 tracking-tight drop-shadow-2xl'>
          Нові знайомства — <span className='text-[#F73149] animate-pulse'>нові емоції</span>
        </h1>
        <div className='mt-8 md:mt-10 w-65'>
          <Btn
            onClick={handleSignUp}
            className={`${isOpenSignUp ? 'opacity-0' : 'opacity-100'}`}
          >
            Створи обліковий запис
          </Btn>

          {isOpenSignUp && (
            <SignUpForm
              handleSignUp={handleSignUp}
              isOpenSignUp={isOpenSignUp}
            />
          )}
          <div className='flex justify-center mt-5 md:hidden'>
            <HeaderSignIn
              setSignInModal={setSignInModal}
              signInModal={signInModal}
              isOpenSignUp={isOpenSignUp}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
