import { useState } from 'react';

import Notification from '../UI/Notification';
import ReportProblemForm from './ReportProblemForm';

const ReportProblemSection = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <section className='relative w-full px-3 md:px-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505] text-center pt-16'>
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
      </div>
      <div className='relative z-10'>
      <h1 className='w-full text-4xl font-extrabold text-[#F73149] mb-8'>
        Повідомити про проблему
      </h1>
      <p className='max-w-4xl mx-auto mb-12 text-xl text-white'>
        Будь ласка, повідомте нам про проблему, з якою ви зіткнулись. Ми
        розглянемо вашу заявку і повернемось до вас з відповіддю.
      </p>
      <ReportProblemForm setSuccess={setSuccess} setError={setError} />
      {success && (
        <Notification
          type='success'
          message='Дякуємо, Ваш звіт про проблему успішно надіслано.'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
      {error && (
        <Notification
          type='error'
          message='Сталася помилка! Повідомлення не вдалося надіслати.'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
      </div>
    </section>
  );
};

export default ReportProblemSection;
