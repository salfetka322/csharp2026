const MissionCard = ({ icon, title, description }) => {
  return (
    <div className='md:w-80 md:h-80 w-70 h-70 rounded-lg flex flex-col gap-3 items-center justify-center shadow-lg bg-black/20 transition-all duration-300 border border-[#272727] hover:border-[#F73149] hover:translate-y-4]'>
      {icon}
      <h2 className='text-lg text-center text-white'>{title}</h2>
      <p className='px-5 text-base text-center text-white'>{description}</p>
    </div>
  );
};

export default MissionCard;
