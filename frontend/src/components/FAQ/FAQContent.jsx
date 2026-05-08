import { Link } from 'react-router';

import faqContent from '../../data/FAQCardContent';
import FAQCard from './FAQCard';
const FAQContent = () => {
  return (
    <>
      <div className='flex flex-col items-center gap-4 mb-5'>
        <h1 className='text-2xl font-bold text-center text-white md:text-5xl md:text-left'>
          Маєш питання? Ми маємо відповіді 👇
        </h1>
        <p className='text-base text-center md:text-lg md:text-left text-white/80'>
          Тут зібрали найчастіші питання від студентів про знайомства безпеку та
          наш застосунок
        </p>
      </div>
      <div className='flex flex-col w-full gap-3 mx-auto mt-0 md:max-w-5xl md:mt-10 lg:mt-20'>
        {faqContent.map(faq => (
          <FAQCard
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
      <Link
        to='/support'
        className='w-full max-w-3xl h-16 md:h-12 rounded-2xl mx-auto block bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] text-center py-2.5 px-2 text-white mt-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20'
      >
        Не знайшлось найти відповідь? Напиши нам 📩
      </Link>
    </>
  );
};

export default FAQContent;
