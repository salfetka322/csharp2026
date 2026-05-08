import { useState, useEffect } from 'react';

const MatchesCard = ({ match, onClick }) => {
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
  const firstPhoto = normalizedPhotos.length > 0 ? getPhotoUrl(normalizedPhotos[0]) : null;

  return (
    <div
      onClick={onClick}
      className='group relative overflow-hidden shadow-2xl rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#272727] border border-white/10 hover:border-[#F73149]/50 transition-all duration-300 hover:scale-105 hover:shadow-[#F73149]/30 cursor-pointer aspect-[3/4]'
    >
      {firstPhoto ? (
        <img
          src={firstPhoto}
          alt={match.name}
          className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-110'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400/272727/ffffff?text=No+Image';
          }}
        />
      ) : (
        <div className='w-full h-full bg-gradient-to-br from-[#1f1f1f] to-[#0a0a0a] flex items-center justify-center'>
          <div className='text-white/30 text-xl font-medium'>Немає фото</div>
        </div>
      )}

      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-10' />

      {normalizedPhotos.length > 1 && (
        <div className='absolute top-3 md:top-5 right-3 md:right-5 z-20 px-3 md:px-4 py-1.5 md:py-2 bg-black/70 backdrop-blur-md rounded-full border-2 border-white/30 shadow-xl'>
          <span className='text-white text-sm md:text-base font-bold'>
            {normalizedPhotos.length} фото
          </span>
        </div>
      )}

      <div className='absolute bottom-0 left-0 right-0 z-20 p-3 md:p-4 pb-4 md:pb-5 overflow-hidden'>
        <div className='flex items-baseline gap-2 md:gap-2.5 text-white drop-shadow-2xl min-w-0'>
          <span className='text-lg md:text-xl lg:text-2xl font-bold tracking-tight truncate flex-1 min-w-0'>{match.name}</span>
          {match.age && <span className='text-base md:text-lg lg:text-xl font-bold opacity-95 flex-shrink-0 whitespace-nowrap'>{match.age}</span>}
        </div>
        {match.location && (
          <div className='text-white/90 text-xs md:text-sm mt-1 md:mt-1.5 drop-shadow-xl font-semibold truncate'>
            {match.location}
          </div>
        )}
      </div>

      <div className='absolute inset-0 bg-[#F73149]/0 group-hover:bg-[#F73149]/5 transition-all duration-300 z-10 pointer-events-none' />
    </div>
  );
};

export default MatchesCard;
