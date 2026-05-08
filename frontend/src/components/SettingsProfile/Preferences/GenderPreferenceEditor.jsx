import { useEffect, useState } from 'react';

const GenderPreferenceEditor = ({ genderInterests, setGenderInterests }) => {
  const options = ['Чоловіки', 'Жінки', 'Поза бінарністю'];
  const [selected, setSelected] = useState(genderInterests);

  useEffect(() => {
    setSelected(genderInterests);
  }, [genderInterests]);

  const toggleGender = g => {
    let updated;

    if (selected.includes(g)) {
      updated = selected.filter(item => item !== g);
    } else {
      updated = [...selected, g];
    }

    setSelected(updated);
    setGenderInterests(updated);
  };

  return (
    <div className='flex flex-col w-full gap-1'>
      <label className='font-medium text-white'>Мене цікавлять</label>
      <div className='flex flex-wrap gap-3'>
        {options.map(option => (
          <button
            key={option}
            type='button'
            onClick={() => toggleGender(option)}
            className={`px-3 py-1 rounded-full border-2 font-semibold transition-all select-none text-white hover:cursor-pointer hover:bg-[#272727] ${
              selected.includes(option) ? 'border-[#F73149]' : 'border-gray-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderPreferenceEditor;
