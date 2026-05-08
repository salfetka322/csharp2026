const TeamMemberCard = ({
  photoMember,
  fullname,
  position,
  description,
  socials,
}) => {
  return (
    <div className='w-60 h-105 rounded-t-2xl rounded-b-lg flex flex-col gap-3 items-center shadow-md bg-black/20 transition-all duration-300 border border-[#272727]  hover:border-[#F73149] hover:translate-y-4'>
      <div className='w-full rounded-t-2xl h-60'>
        <img
          src={photoMember}
          alt={fullname}
          className='object-cover w-full h-full rounded-t-2xl'
        />
      </div>
      <div className='flex flex-col items-center gap-1'>
        <h3 className='text-lg font-medium text-center text-white'>
          {fullname}
        </h3>
        <span className='text-sm text-center text-white/80'>{position}</span>
        <p className='px-2 text-base text-center text-white'>{description}</p>
      </div>
      <div className='flex items-center gap-3'>
        {socials.map(social => (
          <a
            key={social.link}
            href={social.link}
            target='_blank '
            className='text-white transition-colors duration-300 hover:text-[#F73149]'
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamMemberCard;
