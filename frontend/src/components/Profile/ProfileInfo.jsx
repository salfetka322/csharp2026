import {
  Contact,
  GraduationCap,
  MapPin,
  MessageSquareHeart,
  PersonStanding,
  Search,
  Shapes,
} from 'lucide-react';

const ProfileInfo = ({
  education,
  location,
  genderInterests,
  relationships,
  interests,
}) => {
  return (
    <div className='flex flex-col w-full gap-4'>
      {relationships && (
        <div className='w-full p-6 bg-gradient-to-br from-[#1f1f1f] to-[#151515] border-2 border-white/15 rounded-2xl shadow-xl'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2.5 bg-gradient-to-br from-[#F73149]/30 to-[#F73149]/10 rounded-xl border border-[#F73149]/30'>
              <Search size={20} className='text-[#F73149]' strokeWidth={2.5} />
            </div>
            <span className='font-bold text-white text-xl tracking-tight'>Я шукаю</span>
          </div>
          <span className='text-xl font-bold text-white block pl-14'>
            {relationships}
          </span>
        </div>
      )}

      <div className='w-full p-6 bg-gradient-to-br from-[#1f1f1f] to-[#151515] border-2 border-white/15 rounded-2xl shadow-xl'>
        <div className='flex items-center gap-3 mb-5'>
          <div className='p-2.5 bg-gradient-to-br from-white/20 to-white/5 rounded-xl border border-white/20'>
            <Contact size={20} className='text-white' strokeWidth={2.5} />
          </div>
          <span className='font-bold text-white text-xl tracking-tight'>Головне</span>
        </div>

        <div className='space-y-4 pl-14'>
          {location && (
            <div className='flex items-center gap-3.5 text-white/95'>
              <MapPin size={20} className='text-white/50 flex-shrink-0' strokeWidth={2.5} />
              <span className='font-semibold text-lg'>{location}</span>
            </div>
          )}
          
          {education && (
            <>
              {location && <div className='h-px bg-white/15 my-4 -ml-14' />}
              <div className='flex items-center gap-3.5 text-white/95'>
                <GraduationCap size={20} className='text-white/50 flex-shrink-0' strokeWidth={2.5} />
                <span className='font-semibold text-lg'>{education}</span>
              </div>
            </>
          )}
          
          {genderInterests && Array.isArray(genderInterests) && genderInterests.length > 0 && (
            <>
              {(location || education) && <div className='h-px bg-white/15 my-4 -ml-14' />}
              <div className='flex items-center gap-3.5 text-white/95'>
                <MessageSquareHeart size={20} className='text-white/50 flex-shrink-0' strokeWidth={2.5} />
                <span className='font-semibold text-lg'>{genderInterests.join(', ')}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {interests && Array.isArray(interests) && interests.length > 0 && (
        <div className='w-full p-6 bg-gradient-to-br from-[#1f1f1f] to-[#151515] border-2 border-white/15 rounded-2xl shadow-xl'>
          <div className='flex items-center gap-3 mb-5'>
            <div className='p-2.5 bg-gradient-to-br from-white/20 to-white/5 rounded-xl border border-white/20'>
              <Shapes size={20} className='text-white' strokeWidth={2.5} />
            </div>
            <span className='font-bold text-white text-xl tracking-tight'>Інтереси</span>
          </div>
          <div className='flex flex-wrap gap-3'>
            {interests.map((i, index) => (
              <div
                key={index}
                className='px-5 py-2.5 text-base font-semibold text-center transition-all duration-300 bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-full text-white hover:bg-gradient-to-br hover:from-[#F73149]/30 hover:to-[#F73149]/10 hover:border-[#F73149]/50 hover:text-white cursor-pointer'
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
