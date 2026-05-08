import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const TelegramEditor = ({ telegram, setTelegram }) => {
  const [open, setOpen] = useState(false);
  const [tempTelegram, setTempTelegram] = useState(telegram);

  const handleSave = () => {
    setTelegram(tempTelegram);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setTempTelegram(telegram);
          setOpen(true);
        }}
        className='flex items-center justify-between w-full min-h-12 px-3 border-1 rounded-xl bg-[#272727] hover:cursor-pointer transition-colors duration-300 hover:border-[#F73149]'
      >
        <span className='text-sm text-white md:text-base'>Телеграм</span>
        <span className='max-w-[50%] text-right text-white'>{telegram}</span>
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
                className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
              >
                <div
                  className='relative w-full max-w-md p-4 sm:p-6 rounded-xl bg-neutral-900'
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className='absolute text-2xl text-white cursor-pointer top-4 right-4 transition-colors duration-300 hover:text-[#F73149]'
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </button>

                  <h2 className='mt-2 mb-4 text-xl font-bold text-center text-white sm:text-left'>
                    Змінити імʼя користувача
                  </h2>

                  <input
                    type='text'
                    value={tempTelegram}
                    onChange={e => setTempTelegram(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSave();
                      }
                    }}
                    className='w-full px-3 py-2 transition-colors duration-300 border-gray-300 rounded-lg outline-none text-white border-1 focus:border-[#F73149] placeholder:text-gray-400'
                    placeholder='Введіть нове імʼя користувача'
                  />

                  <button
                    onClick={handleSave}
                    className='w-full px-4 py-2 mt-4 font-bold text-black bg-white border-2 cursor-pointer rounded-xl hover:bg-black hover:text-white'
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

export default TelegramEditor;
