import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import useBlockScroll from '../../hooks/useBlockScroll';
import { lenis } from '../../lenisInstance';

const PurposeRelationshipsSelect = ({ register, setValue, watch }) => {
  const [open, setOpen] = useState(false);
  const selectedValue = watch('purposeRelationships') || '';
  useBlockScroll(open, lenis);

  const options = [
    '💖 Довготривалі стосунки',
    '😍 Серйозні стосунки',
    '🥂 Несерйозні стосунки',
    '🎉 Короткотривалий роман',
    '👋 Нових друзів',
    '🤔 Ще точно не знаю',
  ];

  const handleChange = value =>
    setValue('purposeRelationships', value, { shouldValidate: true });
  const handleSave = () => setOpen(false);

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <label className='font-bold text-white'>Я шукаю</label>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='p-2 text-white border border-gray-500 rounded-full cursor-pointer w-70 hover:bg-black/30'
      >
        {selectedValue || (
          <span className='flex items-center justify-center gap-2'>
            <Plus size={20} /> Додати мету стосунків
          </span>
        )}
      </button>
      <input type='hidden' {...register('purposeRelationships')} />

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className='fixed inset-0 z-40 bg-black/50'
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
                <div className='relative flex flex-col w-full max-w-md gap-4 p-6 rounded-lg bg-neutral-900'>
                  <button
                    className='absolute text-2xl text-white cursor-pointer top-4 right-4 transition-colors duration-300 hover:text-[#F73149]'
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </button>

                  <h2 className='text-2xl font-bold text-white text-center mt-6 mb-1.5'>
                    Що ти шукаєш
                  </h2>
                  <p className='text-lg text-[#B9BFC8] text-center'>
                    Не проблема, якщо цілі з часом зміняться.
                  </p>

                  <div className='flex flex-col gap-3 mt-6'>
                    {options.map(option => (
                      <label
                        key={option}
                        className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedValue === option
                            ? 'border-[#F73149] '
                            : 'border-gray-600 hover:border-white hover:bg-[#272727]'
                        } text-white`}
                      >
                        <span>{option}</span>
                        <input
                          type='radio'
                          checked={selectedValue === option}
                          onChange={() => handleChange(option)}
                          className='hidden'
                        />
                      </label>
                    ))}
                  </div>

                  <button
                    type='button'
                    onClick={handleSave}
                    disabled={selectedValue === ''}
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

export default PurposeRelationshipsSelect;
