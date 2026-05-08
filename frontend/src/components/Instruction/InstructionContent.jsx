import { TiInputChecked } from 'react-icons/ti';
import { Link } from 'react-router';

import instructionContent from '../../data/InstructionCardContent';
import InstructionCard from './InstructionCard';

const InstructionContent = () => {
  return (
    <div className='w-full mb-10 md:max-w-6xl'>
      <div className='flex flex-col items-center justify-center gap-3 mb-5 md:mb-10 lg:mb-20'>
        <h1 className='text-2xl font-bold text-center text-white md:text-5xl'>
          Як почати знайомства?
        </h1>
        <p className='text-base text-center md:text-lg text-white/80'>
          Пройди прості кроки - і почни знаходити нових друзів уже сьогодні!
        </p>
      </div>
      <div className='grid w-full grid-cols-1 gap-3 md:grid-cols-2'>
        {instructionContent.map(({ icon, title, description }) => (
          <InstructionCard
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </div>
      <div className='mt-5 mb-10 md:mt-10 lg:mt-20'>
        <h3 className='mb-3 text-xl font-semibold text-center text-white md:text-3xl'>
          Корисні поради
        </h3>
        <ul className='text-base text-white md:text-lg'>
          <li className='flex items-center gap-1 pl-3 mx-auto w-80 md:w-100 md:pl-10'>
            <TiInputChecked size={30} color='#F73149' />
            Поважай співрозмовника
          </li>
          <li className='flex items-center gap-1 pl-3 mx-auto w-80 md:w-100 md:pl-10'>
            <TiInputChecked size={30} color='#F73149' />
            Не розголошуй особисті дані одразу
          </li>
          <li className='flex items-center gap-1 pl-3 mx-auto w-80 md:w-100 md:pl-10'>
            <TiInputChecked size={30} color='#F73149' />
            Будь собою
          </li>
        </ul>
      </div>
      <Link
        to='/'
        className='text-white bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] md:w-120 h-10 py-2 mx-auto rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 text-center block'
      >
        Почати зараз
      </Link>
    </div>
  );
};

export default InstructionContent;
