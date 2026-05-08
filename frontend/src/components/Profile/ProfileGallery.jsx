import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProfileGallery = ({ photos }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [photos]);

  if (!photos || photos.length === 0) {
    return (
      <div className='relative w-full h-96 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] flex items-center justify-center'>
        <div className='text-white/40 text-lg'>Немає фото</div>
      </div>
    );
  }

  const nextPhoto = () => setIndex(prev => (prev + 1) % photos.length);

  const prevPhoto = () =>
    setIndex(prev => (prev - 1 + photos.length) % photos.length);

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

  const currentPhoto = getPhotoUrl(photos[index] || photos[0]);

  return (
    <div className='relative w-full h-[500px] md:h-[600px] overflow-hidden'>
      {currentPhoto ? (
        <img
          src={currentPhoto}
          alt='Profile'
          className='object-cover w-full h-full transition-opacity duration-300'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x600/272727/ffffff?text=No+Image';
          }}
        />
      ) : (
        <div className='w-full h-full bg-gradient-to-br from-[#1f1f1f] to-[#0a0a0a] flex items-center justify-center border-b border-white/10'>
          <div className='text-white/30 text-xl font-medium'>Немає фото</div>
        </div>
      )}

      {photos.length > 1 && (
        <div className='absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 w-3/4 z-20'>
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i === index ? 'bg-white shadow-xl' : 'bg-white/25'
              }`}
            />
          ))}
        </div>
      )}

      {photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className='absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-black/90 transition-all duration-300 z-20 shadow-2xl hover:scale-110'
            aria-label='Previous photo'
          >
            <ChevronLeft size={26} strokeWidth={2.5} />
          </button>

          <button
            onClick={nextPhoto}
            className='absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-black/90 transition-all duration-300 z-20 shadow-2xl hover:scale-110'
            aria-label='Next photo'
          >
            <ChevronRight size={26} strokeWidth={2.5} />
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileGallery;
