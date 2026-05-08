import { useState } from 'react';

import Notification from '../UI/Notification';
import NewsletterForm from './NewsletterForm';
const NewsletterContent = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <div className='w-full text-white mb-5 md:mb-0 md:w-[45%] lg:w-[40%] xl:w-[35%]'>
        <h3 className='w-full mb-2 text-2xl font-semibold'>
          Підпишись на нашу розсилку
        </h3>
        <p className='text-base'>
          Будь в курсі найцікавіших знайомств та студентських історій! Отримуй
          ексклюзивний контент та свіжі новини прямо на пошту.
        </p>
      </div>
      <NewsletterForm setSuccess={setSuccess} setError={setError} />
      {success && (
        <Notification
          type='success'
          message='Дякую, що підписались на нашу розсилку!'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
      {error && (
        <Notification
          type='error'
          message='Сталась помилка! Спробуйте ще раз'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
    </>
  );
};

export default NewsletterContent;
