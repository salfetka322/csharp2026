import { FaHeart, FaUndo } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const ProfileController = ({ onLike, onSkip, onUndo }) => {
  return (
    <div className='flex items-center justify-center gap-5 md:gap-8'>
      <button
        onClick={onSkip}
        className='w-14 h-14 md:w-16 md:h-16 p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-md border-2 border-white/30 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white/50 active:scale-95'
        aria-label='Skip'
      >
        <FaXmark size={24} className='text-[#AD22CC] md:text-[#AD22CC]' />
      </button>
      
      <button
        onClick={onUndo}
        className='w-14 h-14 md:w-16 md:h-16 p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-md border-2 border-white/30 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white/50 active:scale-95'
        aria-label='Undo'
      >
        <FaUndo size={24} className='text-white' />
      </button>
      
      <button
        onClick={onLike}
        className='w-14 h-14 md:w-16 md:h-16 p-4 bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] border-2 border-[#F73149]/60 rounded-full shadow-2xl shadow-[#F73149]/30 transition-all duration-300 hover:scale-110 hover:shadow-[#F73149]/50 active:scale-95'
        aria-label='Like'
      >
        <FaHeart size={24} className='text-white' />
      </button>
    </div>
  );
};

export default ProfileController;
