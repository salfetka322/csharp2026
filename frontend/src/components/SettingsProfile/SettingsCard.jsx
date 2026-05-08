import Lenis from 'lenis';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';
import { getProfile, updateProfile } from '../../services/profileService';
import Notification from '../UI/Notification';
import EducationEditor from './Account/EducationEditor';
import EmailEditor from './Account/EmailEditor';
import LocationEditor from './Account/LocationEditor';
import NameEditor from './Account/NameEditor';
import PhotosEditor from './Account/PhotosEditor';
import TelegramEditor from './Account/TelegramEditor';
import GenderPreferenceEditor from './Preferences/GenderPreferenceEditor';
import InterestEditor from './Preferences/InterestEditor';
import RelationshipsPreferenceEditor from './Preferences/RelationshipsPreferenceEditor';

const SettingsCard = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const { setIsAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');
  const [telegram, setTelegram] = useState('');
  const [photos, setPhotos] = useState([]);
  const [genderInterests, setGenderInterests] = useState([]);
  const [relationships, setRelationships] = useState('');
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      wheelEventsTarget: wrapperRef.current,
      smooth: true,
      duration: 1.5,
    });

    const raf = time => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    setLoading(true);

    getProfile()
      .then(data => {
        setName(data.name || '');
        setEmail(data.email || '');
        setLocation(data.location || '');
        setEducation(data.education || '');
        setTelegram(data.telegram || '');
        setPhotos(Array.isArray(data.photos) ? data.photos : []);
        setGenderInterests(data.genderInterests || []);
        setRelationships(data.relationships || '');
        setInterests(data.interests || []);
      })
      .catch(err => console.error('Помилка завантаження профілю:', err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logOut = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setIsAuth(false);
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Помилка виходу:', err);
    }
  };

  const saveChanges = () => {
    const processedPhotos = photos
      .filter(Boolean)
      .map(photo => {
        if (typeof photo === 'string') {
          return photo;
        }
        if (photo && photo.isExisting && photo.originalUrl) {
          return photo.originalUrl;
        }
        return photo;
      });

    const payload = {
      name,
      email,
      location,
      education,
      telegram,
      photos: processedPhotos,
      genderInterests,
      relationships,
      interests,
    };

    updateProfile(payload)
      .then(() => {
        console.log('Профіль оновлено');
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <FaCog size={150} color='#F73149' className='animate-spin' />
      </div>
    );
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className='relative w-full h-full max-w-xl mx-auto p-4 overflow-hidden shadow-2xl sm:p-5 bg-neutral-900 md:max-h-170 md:rounded-3xl'
      >
        <div ref={contentRef} className='w-full h-full overflow-auto'>
          <h2 className='mb-5 text-2xl font-semibold text-center text-white md:text-4xl'>
            Налаштування
          </h2>

          <div className='flex flex-col gap-2'>
            <span className='text-base font-medium text-white md:text-lg'>
              Обліковий запис
            </span>
            <NameEditor name={name} setName={setName} />
            <EmailEditor email={email} setEmail={setEmail} />
            <LocationEditor location={location} setLocation={setLocation} />
            <EducationEditor
              education={education}
              setEducation={setEducation}
            />
            <TelegramEditor telegram={telegram} setTelegram={setTelegram} />
          </div>

          <div className='flex flex-col gap-2 mt-3'>
            <span className='text-base font-medium text-white md:text-lg'>
              Фото профілю
            </span>
            <PhotosEditor photos={photos} setPhotos={setPhotos} />
          </div>

          <div className='flex flex-col gap-2 mt-3'>
            <span className='text-base font-medium text-white md:text-lg'>
              Налаштування вподобань
            </span>
            <GenderPreferenceEditor
              genderInterests={genderInterests}
              setGenderInterests={setGenderInterests}
            />
            <RelationshipsPreferenceEditor
              relationships={relationships}
              setRelationships={setRelationships}
            />
            <InterestEditor interests={interests} setInterests={setInterests} />
          </div>

          <button
            onClick={saveChanges}
            className='w-full py-2 text-base md:text-lg font-medium text-white transition-colors duration-300 bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] border-2 border-white/20 rounded-2xl hover:cursor-pointer mt-3'
          >
            Зберегти зміни
          </button>

          <button
            onClick={logOut}
            className='w-full py-2 text-base md:text-lg font-medium text-white transition-colors duration-300 bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] border-2 border-white/20 rounded-2xl hover:cursor-pointer mt-3'
          >
            Вийти з облікового запису
          </button>
        </div>
      </div>
      {success && (
        <Notification
          type={'success'}
          message={'Змінни збереженні'}
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
      {error && (
        <Notification
          type={'error'}
          message={'Не вдалося змінити профіль'}
          className='fixed z-10 -translate-x-1/2 bottom-5 left-1/2 md:left-auto md:right-5 md:translate-x-0 w-100 md:w-auto'
        />
      )}
    </>
  );
};

export default SettingsCard;
