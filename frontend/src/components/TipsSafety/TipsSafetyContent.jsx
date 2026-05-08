import { Link } from 'react-router';

import SafetyPeople from '../../assets/images/safetyPeople.png';
import tipsContent from '../../data/TipsCardContent';
import TipsCard from './TipsCard';

const TipsSafetyContent = () => {
  return (
    <div className='w-full mb-10 md:max-w-6xl'>
      <div className='flex flex-col items-center md:flex-row'>
        <div className='w-full'>
          <h2 className='mb-5 text-2xl font-bold text-center text-white md:text-5xl md:text-left'>
            Твоя безпека — наш пріоритет
          </h2>
          <p className='text-base text-center text-white/80 md:text-left md:text-lg'>
            Знайомства — це круто. Але завжди варто пам'ятати про свою безпеку.
          </p>
        </div>
        <div className='w-70 h-70 md:w-100 md:h-100'>
          <img
            src={SafetyPeople}
            alt='safetyIcon'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
      <div className='grid items-center w-full grid-cols-1 gap-3 mb-10 md:grid-cols-2 lg:grid-cols-3 place-items-center md:gap-5 lg:gap-10'>
        {tipsContent.map(({ icon, tip }) => (
          <TipsCard key={tip} icon={icon} tip={tip} />
        ))}
      </div>
      <div className='w-full bg-[#F73149] rounded-lg p-5 text-center h-62 md:h-58'>
        <h3 className='mb-3 text-xl font-bold text-white'>
          Що робити у випадку проблеми
        </h3>
        <ol className='mx-auto text-base text-left text-white list-decimal w-70'>
          <li>Повідомити модераторам</li>
          <li>Подзвонити друзям або поліції</li>
          <li>Зберегти скріни</li>
        </ol>
        <Link
          to='/problem'
          className='block p-4 mx-auto mt-5 text-black bg-white rounded-2xl w-70 hover:border hover:border-black'
        >
          Повідомити про проблему
        </Link>
      </div>
    </div>
  );
};

export default TipsSafetyContent;
