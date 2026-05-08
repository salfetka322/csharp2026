import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const RelationshipsPreferenceEditor = ({ relationships, setRelationships }) => {
  const options = [
    '💖 Довготривалі стосунки',
    '😍 Серйозні стосунки',
    '🥂 Несерйозні стосунки',
    '🎉 Короткотривалий роман',
    '👋 Нових друзів',
    '🤔 Ще точно не знаю',
  ];
  const [open, setOpen] = useState(false);
  const [tempRelationships, setTempRelationships] = useState(relationships);

  const handleSave = () => {
    setRelationships(tempRelationships);
    setOpen(false);
  };

  return (
    <>
      <div className='font-medium text-white'>Я шукаю</div>
      <button
        onClick={() => {
          setOpen(true);
          setTempRelationships(relationships);
        }}
        className=' text-center w-full text-white min-h-12 px-3 border-1 rounded-xl border-[#272727]
         bg-[#272727] hover:cursor-pointer transition-colors duration-300 hover:border-[#F73149]'
      >
        {relationships}
      </button>

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

                  <span className='mt-2 mb-4 text-xl font-bold text-white'>
                    Не проблема, якщо цілі з часом змінились.
                  </span>

                  <div className='flex flex-col gap-3 mt-6'>
                    {options.map(option => (
                      <label
                        key={option}
                        className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          tempRelationships === option
                            ? 'border-[#F73149]'
                            : 'border-gray-600  hover:border-white hover:cursor-pointer hover:bg-[#272727]'
                        } text-white`}
                      >
                        <span>{option}</span>
                        <input
                          type='radio'
                          checked={tempRelationships === option}
                          onChange={() => setTempRelationships(option)}
                          className='hidden'
                        />
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
    </>
  );
};

export default RelationshipsPreferenceEditor;
