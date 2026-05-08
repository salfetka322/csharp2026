import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import GoogleIcon from '../../assets/icons/googleIcon.svg';
import { AuthContext } from '../../context/AuthContext';
import { googleAuth, login } from '../../services/authService';
import { getProfile } from '../../services/profileService';
import Logo from '../common/Logo';

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Поле ' Електронна адреса ' є обов'язковим")
    .email('Введіть коректну електронну адресу'),
  password: yup
    .string()
    .required("Поле ' Пароль ' є обов'язковим")
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .max(20, 'Пароль має бути не довший за 20 символів'),
});

const SignInForm = ({ handleSignInModal }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { setIsAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const signIn = async data => {
    try {
      const res = await login(data.email, data.password);
      const responseData = res?.data;

      if (!responseData?.accessToken) {
        alert('Помилка: токен не отримано');
        return;
      }

      localStorage.setItem('token', responseData.accessToken);
      setIsAuth(true);
      if (responseData.user) {
        setUser(responseData.user);
      }

      reset();
      handleSignInModal();
      
      setTimeout(async () => {
        try {
          await getProfile();
          navigate('/finding', { replace: true });
        } catch (error) {
          navigate('/create', { replace: true });
        }
      }, 300);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Помилка входу';
      alert(errorMessage);
    }
  };

  const passwordValue = watch('password');

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId.trim() === '') {
      console.warn('Google Client ID не налаштовано. Додайте VITE_GOOGLE_CLIENT_ID в .env файл');
      return;
    }

    const initializeGoogle = () => {
      if (window.google && window.google.accounts && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleSignIn,
        });

        try {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: 'filled_blue',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            locale: 'uk',
          });
        } catch (error) {
          console.error('Error rendering Google button:', error);
        }
      } else {
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, []);

  const handleGoogleSignIn = async (response) => {
    try {
      const credential = response.credential || response;
      
      if (!credential) {
        alert('Помилка: не вдалося отримати токен від Google');
        return;
      }

      const res = await googleAuth(credential);
      const responseData = res?.data;

      if (!responseData?.accessToken) {
        alert('Помилка: токен не отримано');
        return;
      }

      localStorage.setItem('token', responseData.accessToken);
      setIsAuth(true);
      if (responseData.user) {
        setUser(responseData.user);
      }

      reset();
      handleSignInModal();

      setTimeout(async () => {
        try {
          await getProfile();
          navigate('/finding', { replace: true });
        } catch (error) {
          navigate('/create', { replace: true });
        }
      }, 300);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Помилка входу через Google';
      alert(errorMessage);
    }
  };


  return (
    <AnimatePresence>
      <motion.div
        key='backdrop'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='fixed inset-0 z-40 bg-black hover:cursor-pointer'
        onClick={handleSignInModal}
      />

      <motion.form
        key='signin-form'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit(signIn)}
        className='fixed top-[50%] left-[50%] z-50 -translate-x-[50%] -translate-y-[50%] md:w-[500px] md:h-auto md:px-12 w-[90%] max-w-md h-auto py-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-white/20 shadow-2xl flex flex-col items-center px-6'
      >
        <X
          className='absolute top-5 right-6 hover:cursor-pointer'
          onClick={handleSignInModal}
        />
        <div className='flex flex-col items-center justify-center mb-6'>
          <Logo />
          <h2 className='text-xl md:text-2xl font-bold text-white tracking-tight mt-3'>Почати</h2>
        </div>

        <div className='flex flex-col w-full gap-4'>
          <div className='flex flex-col gap-2'>
            <input
              {...register('email')}
              className={`border-2 w-full md:h-14.5 h-12 px-4 rounded-2xl bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-[#F73149] focus:bg-white/15 transition-all duration-300 ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder='Введіть електронну адресу'
            />
            {errors.email && (
              <p className='text-sm font-bold text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <div className='relative flex items-center'>
              <input
                {...register('password')}
                className={`border-2 w-full md:h-14.5 h-12 px-4 rounded-2xl bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-[#F73149] focus:bg-white/15 transition-all duration-300 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder='Введіть пароль'
                type={isShowPassword ? 'text' : 'password'}
              />
              {passwordValue &&
                passwordValue.length > 0 &&
                (isShowPassword ? (
                  <EyeOff
                    className='absolute right-4 hover:cursor-pointer text-white/70 hover:text-white transition-colors'
                    size={20}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                ) : (
                  <Eye
                    className='absolute right-4 hover:cursor-pointer text-white/70 hover:text-white transition-colors'
                    size={20}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                ))}
            </div>
            {errors.password && (
              <p className='text-sm font-bold text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='w-full py-3 md:py-4 bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] rounded-2xl text-lg md:text-xl font-bold text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 hover:cursor-pointer border-2 border-white/20'
          >
            Вхід
          </button>
        </div>

        <div className='flex gap-3.5 items-center w-full my-4'>
          <hr className='border-t border-white/30 flex-grow' />
          <span className='text-white/70 font-semibold'>АБО</span>
          <hr className='border-t border-white/30 flex-grow' />
        </div>
        <div className='relative w-full'>
          <div
            ref={googleButtonRef}
            className='absolute opacity-0 pointer-events-none w-full h-full z-0'
            style={{ height: '48px' }}
          />
          <button
            type='button'
            onClick={() => {
              if (googleButtonRef.current) {
                const googleButton = googleButtonRef.current.querySelector('div[role="button"]');
                if (googleButton) {
                  googleButton.click();
                } else {
                  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
                  if (window.google && window.google.accounts && clientId) {
                    window.google.accounts.id.prompt();
                  }
                }
              }
            }}
            className='w-full flex items-center justify-center gap-3 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] hover:from-[#1a1a1a] hover:via-[#2a2a2a] hover:to-[#1a1a1a] rounded-2xl text-lg md:text-xl font-bold text-white py-3 md:py-4 transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-black/50 z-10 border-2 border-white/30'
          >
            <span className='flex items-center justify-center w-8 h-8 bg-gradient-to-br from-white to-gray-100 rounded-full'>
              <img src={GoogleIcon} alt='Google icon' className='w-5 h-5' />
            </span>
            <span className='text-lg md:text-xl'>
              Продовжити з Google
            </span>
          </button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
};

export default SignInForm;
