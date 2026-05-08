const GenderInterests = ({ register, watch }) => {
  const selected = watch('genderInterests') || [];
  const isActive = value => selected.includes(value);

  return (
    <div className='flex flex-col w-full gap-2 mt-5'>
      <label className='font-bold text-white'>Мене цікавлять</label>
      <div className='flex flex-wrap gap-3'>
        {['Чоловіки', 'Жінки', 'Поза бінарністю'].map(item => (
          <label
            key={item}
            className={`px-4 py-2 rounded-full cursor-pointer border-2 font-bold transition-all select-none text-white hover:bg-black/30 ${
              isActive(item) ? 'border-[#F73149]' : 'border-gray-500'
            }`}
          >
            <input
              type='checkbox'
              {...register('genderInterests')}
              value={item}
              className='hidden'
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderInterests;
