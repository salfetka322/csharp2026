import teamContent from '../../data/TeamCardContent';
import TeamMemberCard from './TeamMemberCard';

const TeamContent = () => {
  return (
    <div className='w-full mb-10 md:max-w-6xl'>
      <h1 className='mb-5 text-2xl font-bold text-center text-white md:text-5xl'>
        Наша команда
      </h1>
      <p className='mb-5 text-base text-center md:text-lg text-white/80 md:mb-10 lg:mb-20'>
        Ми - команда студентів об'єднаних спільною метою створити простір для
        знайомств, розвитку та взаємної підтримки
      </p>
      <div className='grid grid-cols-1 gap-5 mb-5 md:grid-cols-2 lg:grid-cols-4 md:mb-10 lg:mb-20 place-items-center'>
        {teamContent.map(social => (
          <TeamMemberCard
            key={social.position}
            photoMember={social.photoMember}
            fullname={social.fullname}
            position={social.position}
            description={social.description}
            socials={social.socials}
          />
        ))}
      </div>
      <div className=''>
        <h2 className='mb-5 text-xl font-bold text-center text-white md:text-4xl '>
          За кулісами
        </h2>
        <p className='text-base text-center md:text-lg text-white/80'>
          Ми — не просто команда, ми друзі, яких об’єднала спільна мета. Кожен
          із нас має свій характер, стиль і підхід, але саме це створює
          гармонію. Ми разом шукаємо ідеї, ділимося натхненням і підтримуємо
          одне одного в кожному рядку коду, кожній деталі дизайну. За кожною
          кнопкою, кольором і анімацією стоять наші обговорення, жарти й кава о
          третій ночі. Ми віримо, що щирість і взаємоповага — це фундамент, на
          якому народжуються справжні проєкти.
        </p>
      </div>
    </div>
  );
};

export default TeamContent;
