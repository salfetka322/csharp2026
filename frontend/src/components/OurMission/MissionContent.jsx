import { Link } from 'react-router';

import MissionPeoples from '../../assets/images/MissionPeoples.png';
import MissionPeople from '../../assets/images/missionPeople.png';
import { missionContent, missionContent2 } from '../../data/MissionCardContent';
import HowWeWorkCard from './HowWeWorkCard';
import MissionCard from './MissionCard';

const MissionContent = () => {
  return (
    <div className='w-full max-w-6xl mb-10'>
      <div className='relative flex flex-col items-center mb-0 md:flex-row md:mb-10 lg:mb-20'>
        <div className='w-full'>
          <h1 className='mb-5 text-2xl font-bold text-center text-white md:text-5xl md:text-left'>
            Ми створюємо простір, де студенти знаходять натхнення та підтримку
          </h1>
          <p className='mb-5 text-base text-center md:text-lg text-white/80 md:text-left'>
            Наша місія - об'єднати молодь, допомогти знайти друзів, розвиток, і
            можливості для майбутнього.
          </p>
        </div>
        <div className='mt-5 w-70 h-70 md:w-140 md:h-140 md:mt-0'>
          <img
            src={MissionPeoples}
            alt='Peoples'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3 place-items-center md:mt-0'>
        {missionContent.map(({ icon, title, description }) => (
          <MissionCard
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </div>
      <h2 className='mt-5 text-xl font-medium text-center text-white md:text-3xl md:mt-10 lg:mt-20'>
        Як ми працюємо
      </h2>
      <div className='grid grid-cols-1 gap-3 mt-5 md:grid-cols-2 lg:grid-cols-4 md:mt-10 place-items-center'>
        {missionContent2.map(({ icon, title }) => (
          <HowWeWorkCard key={title} icon={icon} title={title} />
        ))}
      </div>
      <p className='mt-5 text-base text-center md:text-lg text-white/80 md:mt-10'>
        Місія - не просто допомогти студентам знайти одне одного. Ми допомагаємо
        знайти себе.
      </p>
      <div className='flex justify-between pt-10'>
        <div className='flex flex-col gap-10 mt-5 md:mt-10 lg:mt-20'>
          <h3 className='text-xl text-center text-white md:text-2xl'>
            Приєднуйся до нашої спільноти вже сьогодні
          </h3>
          <Link
            to='/'
            className='text-white bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] w-50 h-12 py-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 text-center block mx-auto md:mx-0'
          >
            Розпочати
          </Link>
        </div>
        <div className='hidden md:block w-60 h-60'>
          <img
            src={MissionPeople}
            alt='People'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
    </div>
  );
};

export default MissionContent;
