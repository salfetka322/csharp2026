const TipsCard = ({ icon, tip }) => {
  return (
    <div className='w-70 h-70 md:w-80 md:h-80 rounded-lg flex flex-col gap-3 justify-center items-center bg-black/20 shadow-lg  transition-all duration-300  border border-[#272727] hover:border-[#F73149] hover:translate-y-4'>
      {icon}
      <p className='p-2 text-base text-center text-white md:p-4'>{tip}</p>
    </div>
  );
};

export default TipsCard;
