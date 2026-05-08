import { Link } from 'react-router';

import TermsContent from './TermsContent';

const TermsSection = () => {
  return (
    <section className='relative min-h-screen w-full py-16 px-6 text-center bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'>
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
      </div>
      <div className='relative z-10'>
      <h1 className='text-4xl font-extrabold text-[#F73149] mb-8'>
        Умови користування
      </h1>
      <p className='max-w-4xl mx-auto mb-12 text-xl text-white'>
        Ласкаво просимо на наш сервіс! Використовуючи цей сайт ви погоджуєтесь
        із наступними умовами:
      </p>
      <div className='max-w-4xl mx-auto mb-16 text-left'>
        <TermsContent
          title={'1. Використання сервісу'}
          content={[
            'Сервіс призначений для студентів та молоді, щоб знайомитися та спілкуватися.',
            'Ви погоджуєтесь використовувати платформу лише для законних та етичних цілей.',
            'Заборонено розповсюджувати спам, шкідливе програмне забезпечення або будь-який контент, що порушує права інших користувачів.',
          ]}
        />
        <TermsContent
          title={'2. Реєстрація та акаунт'}
          content={[
            'Для користування сервісом необхідно зареєструвати акаунт.',
            'Ви відповідаєте за безпеку свого логіну та пароля.',
            'Ваш акаунт не можна передавати третім особам без нашої згоди.',
          ]}
        />
        <TermsContent
          title={'3. Контент користувачів'}
          content={[
            'Ви несете відповідальність за інформацію та матеріали, які розміщуєте.',
            'Ми залишаємо за собою право видаляти контент, який порушує правила або закони.',
          ]}
        />
        <TermsContent
          title={'4. Конфіденційність'}
          content={[
            'Ваші дані обробляються відповідно до нашої Політики конфіденційності.',
          ]}
        />
        <TermsContent
          title={'5. Обмеження відповідальності'}
          content={[
            'Ми не несемо відповідальності за дії користувачів або наслідки їх взаємодії на платформі.',
            'Сервіс надається «як є», і ми не гарантуємо безперебійну роботу або відсутність помилок.',
          ]}
        />
        <TermsContent
          title={'6. Зміни умов'}
          content={[
            'Ми можемо оновлювати ці умови. Важливі зміни будуть повідомлені користувачам, а оновлена версія завжди доступна на сайті.',
          ]}
        />
        <TermsContent
          title={'Контакти'}
          subtitle={
            "Якщо у вас є будь-які питання щодо цієї Політики конфіденційності або ви бажаєте скористатися своїми правами, зв'яжіться з нами."
          }
          content={
            <Link
              to='/contact'
              className='text-white/80 underline hover:text-[#F73149] text-lg -mt-29'
            >
              Зв'яжіться з нами
            </Link>
          }
        />
      </div>
      <div className='text-lg text-white'>
        Останнє оновлення: грудень 2025 року
      </div>
      </div>
    </section>
  );
};

export default TermsSection;
