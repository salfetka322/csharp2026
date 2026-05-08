import { Link } from 'react-router';

import PrivacyContent from './PrivacyContent';

const PrivacySection = () => {
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
        Політика конфіденційності
      </h1>
      <p className='max-w-4xl mx-auto mb-12 text-xl text-white'>
        Ми цінуємо вашу приватність і прагнемо захищати ваші персональні дані.
        Нижче ми розповідаємо, як ми збираємо, використовуємо та зберігаємо вашу
        інформацію.
      </p>
      <div className='max-w-4xl mx-auto mb-16 text-left'>
        <PrivacyContent
          title={'1. Збір даних'}
          subtitle={'Ми можемо збирати такі дані:'}
          content={[
            'Інформацію, яку ви надаєте при реєстрації (ім’я, електронна пошта, дата народження).',
            'Дані про активність на сайті (лайки, повідомлення, перегляди профілів).',
            'Технічні дані, як IP-адреса, тип пристрою та браузера, що допомагає нам покращувати сервіс.',
          ]}
        />
        <PrivacyContent
          title={'2. Використання даних'}
          subtitle={'Ми використовуємо ваші дані для:'}
          content={[
            'Надання послуг сайту та покращення його роботи.',
            'Надсилання важливих сповіщень та оновлень сервісу.',
            'Підтримки безпеки та запобігання шахрайству.',
          ]}
        />
        <PrivacyContent
          title={'3. Захист даних'}
          content={
            'Ми застосовуємо сучасні технології захисту, щоб ваші дані залишалися конфіденційними та безпечними.'
          }
        />
        <PrivacyContent
          title={'4. Передача даних третім особам'}
          content={
            'Ми не продаємо ваші персональні дані стороннім компаніям. Ваші дані можуть бути надані третім особам лише для надання сервісу або якщо цього вимагає закон.'
          }
        />
        <PrivacyContent
          title={'5. Ваші права'}
          subtitle={'Ви можете в будь-який момент:'}
          content={[
            'Оновити або видалити ваші дані.',
            'Відмовитися від розсилок та повідомлень.',
            'Звернутися до нас з питаннями щодо конфіденційності.',
          ]}
        />
        <PrivacyContent
          title={'6. Зміни політики'}
          content={
            'Ми можемо оновлювати цю політику. Усі зміни будуть опубліковані на цій сторінці, а важливі оновлення ми надішлемо користувачам.'
          }
        />
        <PrivacyContent
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

export default PrivacySection;
