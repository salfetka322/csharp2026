import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { useState } from 'react';

import Socials from '../common/Socials';
import Notification from '../UI/Notification';
import ContactForm from './ContactForm';

const ContactContent = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className='w-full max-w-5xl'>
      <div className='mb-8 md:mb-12'>
        <h1 className='mb-3 text-3xl font-bold text-center text-white md:text-4xl lg:text-5xl'>
          Зв'яжись з нами
        </h1>
        <p className='text-base text-center md:text-lg text-white/80'>
          Ми завжди на зв'язку, щоб допомогти тобі
        </p>
      </div>
      <div className='flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between'>
        <div className='w-full md:w-[48%]'>
          <ContactForm setSuccess={setSuccess} setError={setError} />
        </div>
        <div className='flex flex-col items-center w-full md:w-[48%] gap-4 md:items-start'>
          <div className='flex items-center gap-2'>
            <MapPin color='#F73149' />
            <span className='text-base text-white md:text-lg'>
              Київ, Україна
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <PhoneCall color='#F73149' />
            <span className='text-base text-white md:text-lg'>
              +38(067)555-12-34
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Mail color='#F73149' />
            <span className='text-base text-white md:text-lg'>
              loomisupport@gmail.com
            </span>
          </div>
          <Socials
            contact={true}
            className='justify-center text-white md:justify-start'
          />
        </div>
      </div>
      {success && (
        <Notification
          type='success'
          message='Ваше повідомлення успішно відправлено'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
      {error && (
        <Notification
          type='info'
          message='Сталась помилка при відправленні вашого повідомлення'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
    </div>
  );
};

export default ContactContent;
