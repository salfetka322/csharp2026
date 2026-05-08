import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const NameEditor = ({ name, setName }) => {
  const [open, setOpen] = useState(false);
  const [tempName, setTempName] = useState(name);

  useEffect(() => {
    setTempName(name);
  }, [name]);

  const handleSave = () => {
    if (tempName && tempName.trim()) {
      setName(tempName.trim());
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setTempName(name);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setTempName(name);
          setOpen(true);
        }}
        className='flex items-center justify-between w-full min-h-12 px-3 py-2 border-1 rounded-xl bg-[#272727] hover:cursor-pointer transition-colors duration-300 hover:border-[#F73149] text-sm sm:text-base'
      >
        <span className='text-sm text-white md:text-base'>Ім'я</span>
        <span className='max-w-[50%] text-right text-white'>{name || 'Не вказано'}</span>
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
                onClick={handleCancel}
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
                    className='absolute top-4 right-4 text-2xl text-white cursor-pointer transition-colors duration-300 hover:text-[#F73149]'
                    onClick={handleCancel}
                  >
                    <X />
                  </button>
                  <h2 className='mt-2 mb-4 text-xl font-bold text-center text-white sm:text-left'>
                    Змінити ім'я
                  </h2>
                  <input
                    type='text'
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSave();
                    }}
                    placeholder="Введіть ім'я"
                    className='w-full px-3 py-2 text-white border-1 border-gray-300 rounded-lg outline-none focus:border-[#F73149] placeholder:text-gray-400 transition-colors duration-300 bg-[#272727]'
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    className='w-full px-4 py-2 mt-4 font-bold text-black transition-colors duration-300 bg-white border-2 rounded-xl hover:bg-black hover:text-white'
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

export default NameEditor;

