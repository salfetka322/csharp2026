import { useState } from 'react';
import { Link } from 'react-router';

import supportPeople from '../../assets/images/supportPeople.png';
import supportContent from '../../data/SupportCardContent';
import Notification from '../UI/Notification';
import SupportCard from './SupportCard';
import SupportForm from './SupportForm';

const SupportContent = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className='w-full mb-10 md:max-w-6xl'>
      <div className='flex flex-col items-center mb-0 md:flex-row md:mb-10 lg:mb-20'>
        <div className='w-full'>
          <h2 className='mb-5 text-2xl font-bold text-center text-white md:text-5xl md:text-left'>
            Підтримка студентів 24/7
          </h2>
          <p className='mb-5 text-base text-center text-white/80 md:text-left md:text-lg'>
            Ми тут, щоб допомогти вирішити будь-яке питання.
          </p>
          <Link
            to='https://t.me/r1nozaki'
            target='_blank'
            className='text-white bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] py-3 px-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 text-center block md:inline'
          >
            Написати в підтримку
          </Link>
        </div>
        <div className='w-70 h-70 md:w-100 md:h-100'>
          <img
            src={supportPeople}
            alt='support'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
      <div className='w-full mb-10 lg:mb-20'>
        <h3 className='mb-5 text-xl font-semibold text-center text-white md:text-4xl md:text-left'>
          Як ми можемо допомогти?
        </h3>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          {supportContent.map(({ icon, title, link, btnText, target }) => (
            <SupportCard
              key={title}
              icon={icon}
              title={title}
              link={link}
              btnText={btnText}
              target={target}
            />
          ))}
        </div>
      </div>
      <div className='w-full mb-10'>
        <SupportForm setSuccess={setSuccess} setError={setError} />
      </div>
      <div className='w-full bg-[#F73149] rounded-lg p-5 text-center h-62'>
        <h3 className='mb-3 text-xl font-bold text-white'>
          Термінова ситуація?
        </h3>
        <ol className='mx-auto text-base text-left text-white list-decimal w-80 '>
          <li>Подзвони на 102 (поліція)</li>
          <li>Подзвонити друзям чи родичам</li>
          <li>Повідом про користувача модераторам</li>
        </ol>
        <Link
          to='https://t.me/r1nozaki'
          target='_blank'
          className='block p-4 mx-auto mt-5 text-black bg-white rounded-2xl w-70 hover:border hover:border-black'
        >
          Зв'язатися з нами
        </Link>
      </div>
      {success && (
        <Notification
          type='success'
          message='Наша команда підтримки вже отримала ваше повідомлення.'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
      {error && (
        <Notification
          type='error'
          message='Ваш запит у підтримку не вдалося надіслати. Спробуйте ще раз.'
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
    </div>
  );
};

export default SupportContent;
