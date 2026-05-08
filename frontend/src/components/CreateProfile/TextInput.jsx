const TextInput = ({ label, id, register, placeholder, error }) => {
  return (
    <div className='flex flex-col w-full gap-1 mt-1'>
      <label htmlFor={id} className='text-base font-bold text-white'>
        {label}
      </label>
      <input
        id={id}
        {...register(id)}
        className='w-full h-10 px-3 text-white transition-colors duration-300 bg-black border border-gray-300 rounded-md outline-none placeholder:text-gray-400 focus:border-blue-500'
        placeholder={placeholder || label}
      />
      {error && (
        <p className='text-sm font-bold text-red-500'>{error.message}</p>
      )}
    </div>
  );
};

export default TextInput;
