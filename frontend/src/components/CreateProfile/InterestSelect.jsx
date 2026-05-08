import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import useBlockScroll from '../../hooks/useBlockScroll';
import { lenis } from '../../lenisInstance';

const ALL_INTERESTS = [
  'Фільми',
  'Аніме',
  'Спорт',
  'Мультики',
  'Футбол',
  'Баскетбол',
  'Біг',
  'Взуття',
  'Їжа',
  'Театр',
  'Одяг',
  'Подорожі',
  'Домашні вечірки',
  'Серіали драми',
  'Прямі ефіри',
  'Тренування',
  'Соцмережі',
  'Догляд за шкірою',
];

export default function InterestsSelect({ watch, setValue }) {
  const [open, setOpen] = useState(false);
  const selected = watch('interests') || [];
  useBlockScroll(open, lenis);

  const toggle = item => {
    const exists = selected.includes(item);
    const updated = exists
      ? selected.filter(i => i !== item)
      : [...selected, item];

    if (updated.length <= 3)
      setValue('interests', updated, { shouldValidate: true });
  };

  return (
    <>
      <button
        type='button'
        className='w-full p-2 text-white border border-gray-500 rounded-full cursor-pointer hover:bg-black/30'
        onClick={() => setOpen(true)}
      >
        Обрати інтереси ({selected.length}/3)
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key='backdrop'
                className='fixed inset-0 bg-black/50'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />

              <motion.div
                key='modal'
                className='fixed inset-0 z-50 flex items-center justify-center p-6'
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
              >
                <div
                  className='relative w-full max-w-lg p-6 bg-neutral-900 rounded-2xl overflow-y-auto max-h-[90dvh] sm:max-h-[70dvh]'
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className='absolute text-2xl text-white cursor-pointer top-4 right-4 transition-colors duration-300 hover:text-[#F73149]'
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </button>

                  <h2 className='text-xl font-bold text-center text-white'>
                    Що тебе цікавить?
                  </h2>

                  <p className='mt-1 text-sm text-center text-[#B9BFC8]'>
                    Ти маєш власні вподобання. Розкажи про них іншим.
                  </p>

                  <div className='grid grid-cols-2 gap-2 mt-5 sm:grid-cols-3'>
                    {ALL_INTERESTS.map(item => (
                      <div
                        key={item}
                        onClick={() => toggle(item)}
                        className={`px-3 py-2 rounded-full text-sm cursor-pointer border-2 transition text-center ${
                          selected.includes(item)
                            ? 'border-[#F73149] text-white'
                            : 'border-neutral-600 text-neutral-300 hover:bg-[#272727]'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    className='w-full px-4 py-2 mt-4 text-lg font-bold text-black bg-white border-2 cursor-pointer rounded-xl hover:border-white hover:bg-black hover:text-white'
                    onClick={() => setOpen(false)}
                  >
                    Зберегти ({selected.length}/3)
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
}
