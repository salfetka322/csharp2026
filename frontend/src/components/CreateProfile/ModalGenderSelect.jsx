import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import useBlockScroll from '../../hooks/useBlockScroll';
import { lenis } from '../../lenisInstance';

const ModalGenderSelect = ({ register, setValue, watch }) => {
  const [open, setOpen] = useState(false);
  const [tempGender, setTempGender] = useState(watch('gender') || '');
  const selectedGender = watch('gender');
  useBlockScroll(open, lenis);

  const handleChange = (value, checked) => {
    setTempGender(checked ? value : '');
  };
  const handleSave = () => {
    setValue('gender', tempGender, { shouldValidate: true });
    setOpen(false);
  };
  const options = ['Чоловік', 'Жінка', 'Поза бінарністю'];

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <label className='font-bold text-white'>Стать</label>

      <button
        type='button'
        onClick={() => setOpen(true)}
        className='p-2 text-white border border-gray-500 rounded-full cursor-pointer w-45 hover:bg-black/30'
      >
        {selectedGender || (
          <span className='flex items-center justify-center gap-2'>
            <Plus size={20} /> Додати гендер
          </span>
        )}
      </button>
      <input type='hidden' {...register('gender')} />

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className='fixed inset-0 bg-black/50'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.div
                className='fixed inset-0 z-50 flex items-center justify-center p-6'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key='modal'
              >
                <div className='relative flex flex-col w-full max-w-md gap-4 p-6 rounded-lg bg-neutral-900 sm:max-w-lg'>
                  <button
                    className='absolute text-2xl text-white cursor-pointer top-4 right-4 transition-colors duration-300 hover:text-[#F73149]'
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </button>

                  <h2 className='text-2xl font-bold text-white mt-6 mb-1.5'>
                    Вкажи свій гендер
                  </h2>
                  <p className='text-lg text-[#B9BFC8]'>
                    Вибери всі характеристики, які тебе описують.
                  </p>

                  <div className='flex flex-col gap-3 mt-4'>
                    {options.map(option => (
                      <label
                        key={option}
                        className={`flex items-center justify-between p-3 border-2 rounded cursor-pointer text-white ${
                          tempGender === option
                            ? 'border-[#F73149]'
                            : 'border-gray-600'
                        }`}
                      >
                        <span>{option}</span>
                        <input
                          type='checkbox'
                          checked={tempGender === option}
                          onChange={e => handleChange(option, e.target.checked)}
                          className='hidden'
                        />
                        {tempGender === option && (
                          <Check size={20} color='#F73149' />
                        )}
                      </label>
                    ))}
                  </div>

                  <button
                    type='button'
                    onClick={handleSave}
                    className='w-full px-4 py-2 mt-4 text-lg font-bold text-black bg-white border-2 cursor-pointer rounded-xl hover:border-white hover:bg-black hover:text-white'
                  >
                    Зберегти
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default ModalGenderSelect;
