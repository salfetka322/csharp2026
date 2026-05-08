import Lenis from 'lenis';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTelegramPlane } from 'react-icons/fa';
import ProfileInfo from '../Profile/ProfileInfo';

const MatchModal = ({ isOpen, onClose, match }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPhotoIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      wheelEventsTarget: wrapperRef.current,
      smooth: true,
      duration: 1.2,
      lerp: 0.1,
    });

    const raf = time => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isOpen, match]);

  if (!isOpen || !match) return null;

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (photo.startsWith('http://') || photo.startsWith('https://')) {
      return photo;
    }
    if (photo.startsWith('/uploads/')) {
      return `http://localhost:8080${photo}`;
    }
    return photo;
  };

  const normalizedPhotos = Array.isArray(match.photos) ? match.photos.filter(Boolean) : [];
  const currentPhoto = normalizedPhotos.length > 0 
    ? getPhotoUrl(normalizedPhotos[photoIndex] || normalizedPhotos[0]) 
    : null;

  const nextPhoto = () => {
    if (normalizedPhotos.length > 0) {
      setPhotoIndex(prev => (prev + 1) % normalizedPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (normalizedPhotos.length > 0) {
      setPhotoIndex(prev => (prev - 1 + normalizedPhotos.length) % normalizedPhotos.length);
    }
  };

  return createPortal(
    <AnimatePresence mode='wait'>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            onClick={e => e.stopPropagation()}
          >
            <div className='relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#272727] border-2 border-white/20 shadow-2xl'>
              <button
                onClick={onClose}
                className='absolute top-5 right-5 z-50 p-3 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 border-2 border-white/20 shadow-xl'
                aria-label='Close'
              >
                <X size={26} strokeWidth={2.5} />
              </button>

              <div 
                ref={wrapperRef}
                className='overflow-hidden max-h-[90vh]'
                style={{ height: '90vh', position: 'relative' }}
              >
                <div ref={contentRef}>
                <div className='relative w-full h-[500px] md:h-[600px] overflow-hidden flex-shrink-0'>
                  {currentPhoto ? (
                    <img
                      src={currentPhoto}
                      alt={match.name}
                      className='object-cover w-full h-full'
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x600/272727/ffffff?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-[#1f1f1f] to-[#0a0a0a] flex items-center justify-center border-b border-white/10'>
                      <div className='text-white/30 text-2xl font-medium'>Немає фото</div>
                    </div>
                  )}

                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10' />

                  {normalizedPhotos.length > 1 && (
                    <>
                      <div className='absolute flex w-3/4 gap-2 -translate-x-1/2 top-6 left-1/2 z-20'>
                        {normalizedPhotos.map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                              i === photoIndex ? 'bg-white shadow-xl' : 'bg-white/25'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={prevPhoto}
                        className='absolute p-3.5 text-white transition-all duration-300 -translate-y-1/2 rounded-full cursor-pointer left-6 top-1/2 bg-black/70 backdrop-blur-md hover:bg-black/90 hover:scale-110 z-20 shadow-2xl border-2 border-white/20'
                        aria-label='Previous photo'
                      >
                        <ChevronLeft size={30} strokeWidth={2.5} />
                      </button>

                      <button
                        onClick={nextPhoto}
                        className='absolute p-3.5 text-white transition-all duration-300 -translate-y-1/2 rounded-full cursor-pointer right-6 top-1/2 bg-black/70 backdrop-blur-md hover:bg-black/90 hover:scale-110 z-20 shadow-2xl border-2 border-white/20'
                        aria-label='Next photo'
                      >
                        <ChevronRight size={30} strokeWidth={2.5} />
                      </button>
                    </>
                  )}

                  <div className='absolute bottom-8 left-8 right-8 z-20'>
                    <div className='flex items-baseline gap-3 md:gap-4 text-white drop-shadow-2xl'>
                      <span className='text-5xl md:text-6xl font-bold tracking-tight'>{match.name}</span>
                      {match.age && <span className='text-4xl md:text-5xl font-bold opacity-95'>{match.age}</span>}
                    </div>
                  </div>
                </div>

                <div className='p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]'>
                  {match.bio && (
                    <div className='w-full p-6 bg-gradient-to-br from-[#1f1f1f] to-[#151515] border-2 border-white/15 rounded-2xl shadow-xl'>
                      <p className='text-white/95 text-xl leading-relaxed font-medium'>{match.bio}</p>
                    </div>
                  )}

                  <ProfileInfo
                    education={match.education}
                    location={match.location}
                    genderInterests={match.genderInterests}
                    relationships={match.relationships}
                    interests={match.interests}
                  />

                  {match.telegram && (
                    <a
                      href={`https://t.me/${match.telegram}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block w-full bg-gradient-to-r from-[#328fec] via-[#2C80D4] to-[#328fec] h-18 md:h-20 text-white flex items-center justify-center gap-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#328fec]/40 hover:scale-[1.02] group/telegram border-2 border-white/20'
                    >
                      <FaTelegramPlane 
                        size={32} 
                        className='transition-transform duration-300 group-hover/telegram:scale-110 group-hover/telegram:rotate-12' 
                      />
                      <span className='text-xl md:text-2xl font-bold'>Написати в Telegram</span>
                    </a>
                  )}
                </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MatchModal;

