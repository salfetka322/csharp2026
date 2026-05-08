import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import ProfileCard from '../../components/Profile/ProfileCard';
import ProfileController from '../../components/Profile/ProfileController';
import { getRecommendations } from '../../services/matchesService';
import { likeProfile } from '../../services/profileService';

const FindProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setLoading(true);

    getRecommendations(10)
      .then(data => {
        setProfiles(data || []);
        setError(false);
      })
      .catch(err => {
        console.error('Error loading recommendations:', err);
        setError(true);
        setProfiles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className='relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'>
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
          <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
          <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
        </div>
        <div className='relative z-10'>
          <GridLoader color='#F73149' size={20} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='relative flex items-center justify-center min-h-screen px-3 md:px-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'>

        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
          <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
          <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
        </div>
        <div className='relative z-10'>
          <span className='text-2xl font-bold text-center text-white'>
            Виникла помилка завантаження профілю
          </span>
        </div>
      </div>
    );
  }

  const current = profiles[0];

  const handleLike = () => {
    if (!current) return;
    
    setHistory([current, ...history]);

    likeProfile(current.id)
      .then(() => {
        setProfiles(prev => prev.slice(1));
      })
      .catch(error => {
        console.error('Не вдалося лайкнути профіль:', error);
        setHistory(prevHistory => prevHistory.slice(1));
      });
  };

  const handleSkip = () => {
    setHistory([current, ...history]);
    setProfiles(prev => prev.slice(1));
  };

  const handleUndo = () => {
    if (!history.length) {
      return;
    }
    const last = history[0];

    setProfiles(prev => [last, ...prev]);
    setHistory(prev => prev.slice(1));
  };

  if (!current && !loading && !error) {
    return (
      <div className='relative flex items-center justify-center min-h-screen px-3 md:px-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'>
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
          <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
          <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
        </div>
        <div className='relative z-10'>
          <span className='text-2xl font-bold text-center text-white'>
            Немає доступних профілів
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className='relative flex flex-col items-center justify-center min-h-screen pt-20 pb-24 px-4 md:px-6 bg-gradient-to-br from-[#050505] via-[#0a0a0a] via-[#0f0f0f] to-[#050505]'>
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-950/20 via-gray-900/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-gray-900/20 via-gray-800/12 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gray-950/15 via-gray-900/10 to-transparent rounded-full blur-3xl' />
        <div className='absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-900/18 via-transparent to-transparent rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 w-full max-w-2xl'>
        <AnimatePresence>
          {current && (
            <ProfileCard
              key={current.id}
              profile={current}
              onLike={handleLike}
              onSkip={handleSkip}
            />
          )}
        </AnimatePresence>
        
        <div className='mt-8 md:mt-10 w-full flex justify-center'>
          <ProfileController 
            onLike={handleLike} 
            onSkip={handleSkip} 
            onUndo={handleUndo} 
          />
        </div>
      </div>
    </section>
  );
};

export default FindProfilePage;
