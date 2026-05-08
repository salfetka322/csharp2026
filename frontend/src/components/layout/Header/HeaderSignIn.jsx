import SignInForm from '../../SigningForm/SignInForm';

const HeaderSignIn = ({ setSignInModal, signInModal, isOpenSignUp = false }) => {
  const handleSignInModal = () => {
    if (isOpenSignUp) {
      return;
    }
    setSignInModal(!signInModal);
  };

  return (
    <>
      <button
        onClick={handleSignInModal}
        disabled={isOpenSignUp}
        className={`text-[#F73149] text-base md:text-lg md:w-28 h-10 bg-white rounded-2xl text-center font-bold transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-lg cursor-pointer w-20 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20 ${
          !signInModal && !isOpenSignUp ? 'visible' : 'invisible'
        }`}
        style={{ 
          visibility: (!signInModal && !isOpenSignUp) ? 'visible' : 'hidden',
          position: 'relative'
        }}
      >
        Вхід
      </button>

      {signInModal && !isOpenSignUp && <SignInForm handleSignInModal={handleSignInModal} />}
    </>
  );
};

export default HeaderSignIn;
