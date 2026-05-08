import { Plus, X } from 'lucide-react';
import { useRef } from 'react';

const UploadProfilePhotos = ({ watch, setValue, errors }) => {
  const photos = watch('photos') || [];
  const inputRefs = useRef([]);

  const handleAddPhoto = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updated = [...photos];
    updated[index] = { file, url };
    setValue('photos', updated, { shouldValidate: true });
  };

  const handleRemove = index => {
    const updated = [...photos];
    updated[index] = null;
    setValue('photos', updated, { shouldValidate: true });
  };

  return (
    <div>
      <h3 className='mb-3 text-lg text-white'>Фотографії профілю</h3>
      <div className='grid max-w-2xl grid-cols-3 gap-4'>
        {[...Array(6).keys()].map(index => {
          const photo = photos[index];
          return (
            <div
              key={index}
              className='relative w-full aspect-[3/4] border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-neutral-900 overflow-hidden cursor-pointer'
              onClick={() => inputRefs.current[index].click()}
            >
              <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={el => (inputRefs.current[index] = el)}
                onChange={e => handleAddPhoto(index, e)}
              />
              {photo ? (
                <>
                  <img
                    src={photo.url}
                    alt='uploaded'
                    className='object-cover w-full h-full'
                  />
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
                </>
              ) : (
                <button
                  type='button'
                  onClick={e => {
                    e.stopPropagation();
                    inputRefs.current[index].click();
                  }}
                  className='bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] hover:scale-110 rounded-full flex items-center justify-center w-10 h-10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 cursor-pointer'
                >
                  <Plus className='text-white' size={22} strokeWidth={3} />
                </button>
              )}
            </div>
          );
        })}
      </div>
      {errors?.photos && (
        <p className='mt-2 text-sm font-bold text-red-500'>
          {errors.photos.message}
        </p>
      )}
      <p className='text-base text-center mt-5 text-[#B9BFC8]'>
        Для початку додай 2 фото. А щоб профіль виділявся серед інших, додай 4
        чи більше.
      </p>
    </div>
  );
};

export default UploadProfilePhotos;
