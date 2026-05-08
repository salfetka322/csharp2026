const HowWeWorkCard = ({ icon, title }) => {
  return (
    <div className='w-60 h-60 rounded-lg flex flex-col gap-3 items-center justify-center shadow-lg bg-black/20 transition-all duration-300 border border-[#272727] hover:border-[#F73149] hover:translate-y-4'>
      {icon}
      <h2 className='text-lg text-center text-white'>{title}</h2>
    </div>
  );
};

export default HowWeWorkCard;
