import { useEffect, useState } from 'react';
import { RiHeartsFill } from 'react-icons/ri';
import { getMatches } from '../../services/matchesService';
import MatchModal from './MatchModal';
import MatchesCard from './MatchesCard';

const MatchesContent = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    getMatches()
      .then(data => {
        setMatches(data);
      })
      .catch(e => {
        console.error('Не вдалось отримати список пар', e);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <RiHeartsFill size={150} color='#F73149' className='animate-pulse' />
      </div>
    );
  }

  return (
    <div className='w-full px-4 md:px-6 py-8'>
      <h1 className='mb-8 md:mb-12 text-3xl md:text-4xl lg:text-6xl font-bold text-white text-center md:text-left tracking-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent'>
        Ваші пари
      </h1>
      {matches.length === 0 ? (
        <div className='text-2xl md:text-3xl lg:text-5xl font-bold text-white/60 text-center py-16 md:py-24'>
          У вас поки немає пари
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6'>
          {matches.map((matchProfile, index) => (
            <MatchesCard
              key={matchProfile.id || index}
              match={matchProfile}
              onClick={() => handleCardClick(matchProfile)}
            />
          ))}
        </div>
      )}

      <MatchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        match={selectedMatch}
      />
    </div>
  );
};

export default MatchesContent;
