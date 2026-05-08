const DateInput = ({ register, errors }) => (
  <div className='flex flex-col w-full gap-1 mt-4'>
    <label className='text-base font-bold text-white'>Дата народження</label>
    <div className='flex flex-wrap w-full gap-3 sm:flex-nowrap'>
      {['day', 'month', 'year'].map((field, i) => {
        const placeholders = ['ДД', 'ММ', 'РРРР'];
        const widths = ['w-20', 'w-20', 'w-24'];
        return (
          <div className='flex flex-col' key={field}>
            <label htmlFor={field} className='text-base font-bold text-white'>
              {['День', 'Місяць', 'Рік'][i]}
            </label>
            <input
              id={field}
              {...register(field)}
              maxLength={field === 'year' ? 4 : 2}
              placeholder={placeholders[i]}
              className={`${widths[i]} h-12 px-5 text-center text-white bg-black border border-gray-300 rounded-md outline-none placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300`}
            />
            {errors[field] && (
              <p className='text-sm font-bold text-red-500'>
                {errors[field].message}
              </p>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default DateInput;
