const InstructionCard = ({ icon, title, description }) => {
  return (
    <div className='w-full max-w-3xl h-40 bg-black/20 flex items-center justify-center gap-5 p-5 rounded-xl transition-colors duration-300 border border-[#272727] hover:border-[#F73149]'>
      <div className='flex flex-col items-center justify-center gap-2 '>
        <div className='flex items-center gap-2'>
          {icon}
          <h2 className='text-lg font-medium text-center text-white'>
            {title}
          </h2>
        </div>
        <p className='text-base text-center text-white'>{description}</p>
      </div>
    </div>
  );
};

export default InstructionCard;
