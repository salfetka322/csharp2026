import { Plus, X } from 'lucide-react';
import { useRef, useEffect } from 'react';

const MAX_PHOTOS = 6;
const MIN_PHOTOS = 2;

const PhotosEditor = ({ photos, setPhotos }) => {
  const inputRefs = useRef([]);

  const normalizePhotosForDisplay = (photoList) => {
    if (!photoList || !Array.isArray(photoList)) {
      return [];
    }
    
    return photoList
      .filter(Boolean)
      .map(photo => {
        if (typeof photo === 'string') {
          const fullUrl = photo.startsWith('http://') || photo.startsWith('https://')
            ? photo
            : photo.startsWith('/uploads/')
            ? `http://localhost:8080${photo}`
            : photo;
          return { url: fullUrl, isExisting: true, originalUrl: photo };
        }
        if (photo && typeof photo === 'object') {
          if (photo.url && typeof photo.url === 'string' && photo.url.startsWith('/uploads/')) {
            return {
              ...photo,
              url: `http://localhost:8080${photo.url}`,
            };
          }
          return photo;
        }
        return null;
      })
      .filter(Boolean);
  };

  const normalizedPhotos = normalizePhotosForDisplay(photos);
  const filledPhotos = [...normalizedPhotos];
  while (filledPhotos.length < MAX_PHOTOS) filledPhotos.push(null);

  const handleAdd = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const updated = [...filledPhotos];
    
    updated[index] = { file, url, isExisting: false };
    
    const allPhotos = updated.filter(p => p !== null);
    
    setPhotos(allPhotos);
    
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = '';
    }
  };

  const handleRemove = index => {
    const count = filledPhotos.filter(Boolean).length;
    if (count <= MIN_PHOTOS) return;

    const updated = [...filledPhotos];
    updated[index] = null;
    setPhotos(updated.filter(p => p !== null));
  };


  const getPhotoSrc = (photo) => {
    if (!photo) return null;
    
    if (photo.url) {
      return photo.url;
    }
    
    if (typeof photo === 'string') {
      if (photo.startsWith('http://') || photo.startsWith('https://')) {
        return photo;
      }
      if (photo.startsWith('/uploads/')) {
        return `http://localhost:8080${photo}`;
      }
      return photo;
    }
    
    return null;
  };

  return (
    <div className=''>
      <div className='grid grid-cols-3 gap-4'>
        {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
          const photo = filledPhotos[index];

          return (
            <div
              key={index}
              className='relative w-full aspect-[3/4] border-2 border-dashed border-gray-600 rounded-xl
                         bg-neutral-900 flex items-center justify-center overflow-hidden hover:cursor-pointer'
              onClick={() => inputRefs.current[index]?.click()}
            >
              <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={el => (inputRefs.current[index] = el)}
                onChange={e => handleAdd(index, e)}
              />

              {photo ? (
                <>
                  <img
                    src={getPhotoSrc(photo)}
                    alt=''
                    className='object-cover w-full h-full'
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x300/272727/ffffff?text=No+Image';
                    }}
                  />

                  {filledPhotos.filter(Boolean).length > MIN_PHOTOS && (
                    <button
                      type='button'
                      onClick={e => {
                        e.stopPropagation();
                        handleRemove(index);
                      }}
                      className='absolute p-1 rounded-full cursor-pointer top-1 right-1 bg-black/60'
                    >
                      <X className='text-white' size={18} />
                    </button>
                  )}
                </>
              ) : (
                <button
                  type='button'
                  onClick={e => {
                    e.stopPropagation();
                    inputRefs.current[index]?.click();
                  }}
                  className='bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] hover:scale-110 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 flex items-center justify-center w-10 h-10 cursor-pointer'
                >
                  <Plus className='text-white' size={22} strokeWidth={3} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className='text-base text-center mt-5 text-[#B9BFC8]'>
        Мінімум 2 фото, максимум 6.
      </p>
    </div>
  );
};

export default PhotosEditor;
