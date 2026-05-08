import { Link } from 'react-router';

import StudentTeam from '../../assets/images/studentTeam.png';
import Btn from '../UI/Btn';

const WhoWeAre = () => {
  return (
    <section className='w-full px-5 md:px-23 min-h-screen relative grid grid-cols-1 md:grid-cols-2 items-center md:gap-5 py-8 md:py-12'>
      <div className='w-full row-start-2 md:row-start-1'>
        <h2 className='w-full mb-2 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl sm:mb-3 lg:mb-4'>
          Хто ми?
        </h2>
        <p className='w-full mb-4 text-base text-white/80'>
          Ми — платформа знайомств, створена спеціально для студентів України.
          Тут ти знайдеш тих, хто живе твоїм ритмом: пари, сесії, гуртожитки,
          вечірки й мрії про майбутнє.
        </p>
        <h2 className='w-full mb-2 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl sm:mb-3 lg:mb-4'>
          Чому ми?
        </h2>
        <p className='w-full mb-4 text-base text-white/80'>
          Бо ми розуміємо, що студентське життя — це час нових друзів, пригод і
          почуттів. У нашій спільноті немає зайвого пафосу чи випадкових людей —
          тільки ті, хто близький тобі за віком, інтересами та цінностями.
        </p>
        <h2 className='w-full mb-2 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl sm:mb-3 lg:mb-4'>
          Наша мета
        </h2>
        <p className='w-full mb-4 text-base text-white/80'>
          Ми хочемо зробити знайомства простими, щирими й безпечними. Допомогти
          тобі знайти нових друзів, команду для навчання чи навіть перше
          справжнє кохання.
        </p>
        <h2 className='w-full mb-2 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl sm:mb-3 lg:mb-4'>
          Що нас відрізняє
        </h2>
        <ul className='pl-5 text-base list-disc text-white/80'>
          <li>Студентська атмосфера та зрозуміла аудиторія.</li>
          <li>
            Функції, що допомагають знайти саме тих, хто поруч — у твоєму місті
            чи навіть університеті.
          </li>
          <li>Простота, легкість і без зайвих ускладнень.</li>
        </ul>
      </div>
      <div className='relative w-full h-0 pb-[85%] rounded-lg overflow-hidden mb-5 mt-10 md:mt-0 md:mb-0'>
        <img
          src={StudentTeam}
          loading='lazy'
          alt='Student team'
          className='absolute top-0 right-0 object-cover object-center w-full h-full'
        />
      </div>
      <Link to='/' className='col-span-2 mx-auto mt-10 w-36 md:mt-0'>
        <Btn>Почати</Btn>
      </Link>
    </section>
  );
};

export default WhoWeAre;
