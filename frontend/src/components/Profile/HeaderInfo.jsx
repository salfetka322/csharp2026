import { MapPin } from 'lucide-react';

const HeaderInfo = ({ name, age, location }) => {
  return (
    <div className='space-y-3'>
      <div className='flex items-baseline gap-3'>
        <h2 className='text-4xl md:text-5xl font-bold text-white drop-shadow-2xl tracking-tight'>{name}</h2>
        {age && (
          <span className='text-2xl md:text-3xl font-bold text-white/95'>{age}</span>
        )}
      </div>
      {location && (
        <div className='flex items-center gap-2.5 text-white/95'>
          <MapPin size={20} className='text-white/70' strokeWidth={2.5} />
          <span className='text-lg md:text-xl font-semibold'>{location}</span>
        </div>
      )}
    </div>
  );
};

export default HeaderInfo;
