import Lenis from 'lenis';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import HeaderInfo from './HeaderInfo';
import ProfileGallery from './ProfileGallery';
import ProfileInfo from './ProfileInfo';

const swipeConfidenceThreshold = 8000;

const ProfileCard = ({ profile, onLike, onSkip }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      wheelEventsTarget: wrapperRef.current,
      smooth: true,
      duration: 1.5,
      lerp: 0.08,
    });

    const raf = time => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const checkScrollable = () => {
      if (contentRef.current && wrapperRef.current) {
        setIsScrollable(
          contentRef.current.scrollHeight > wrapperRef.current.clientHeight
        );
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', checkScrollable);
    };
  }, [profile]);

  if (!profile) return null;

  const handleDragEnd = (_event, info) => {
    if (!onLike || !onSkip) return;
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;

    if (swipePower > swipeConfidenceThreshold) return onLike();
    if (swipePower < -swipeConfidenceThreshold) return onSkip();
  };

  return (
    <motion.div
      className='relative w-full max-w-xl mx-auto overflow-hidden shadow-2xl bg-gradient-to-b from-[#1a1a1a] to-[#272727] rounded-3xl border border-white/20 shadow-[#F73149]/10'
      style={{ x, rotate }}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3 }}
    >
      <div className='relative'>
        <ProfileGallery photos={profile.photos} />

        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10' />

        <div className='absolute z-20 text-white bottom-6 left-6 right-6 drop-shadow-2xl'>
          <HeaderInfo
            name={profile.name}
            age={profile.age}
            location={profile.location}
          />
        </div>
      </div>

      <div
        ref={wrapperRef}
        className='max-h-[280px] md:max-h-[320px] overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]'
      >
        <div ref={contentRef} className='p-5 md:p-6'>
          <ProfileInfo
            education={profile.education}
            location={profile.location}
            genderInterests={profile.genderInterests}
            relationships={profile.relationships}
            interests={profile.interests}
          />
        </div>
      </div>

      {isScrollable && (
        <div className='absolute right-3 top-[45%] h-24 w-1 bg-gradient-to-b from-transparent via-white/30 to-transparent rounded-full' />
      )}
    </motion.div>
  );
};

export default ProfileCard;
