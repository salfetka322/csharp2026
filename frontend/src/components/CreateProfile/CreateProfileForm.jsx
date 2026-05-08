import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import formatDateFromParts from '../../helpers/formatDateFromParts';
import getAge from '../../helpers/getAge';
import { sendProfile } from '../../services/profileService';
import Btn from '../UI/Btn';
import DateInput from './DateInput';
import GenderInterests from './GenderInterests';
import InterestsSelect from './InterestSelect';
import ModalGenderSelect from './ModalGenderSelect';
import PurposeRelationshipsSelect from './PurposeRelationshipsSelect';
import TextInput from './TextInput';
import UploadProfilePhotos from './UploadProfilePhotos';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Поле 'Ім'я' є обов'язковим")
    .min(1, 'Це поле має бути довжиною від 1 до 22 символів.')
    .max(22, 'Це поле має бути довжиною від 1 до 22 символів.'),
  location: yup.string().required('Вкажіть місце проживання'),
  education: yup.string().required('Виберіть заклад освіти'),
  telegram: yup.string().required("Telegram обов'язковий"),
  day: yup
    .string()
    .required('Вкажіть день')
    .test('valid-day', 'Невірна дата', value => {
      const num = Number(value);
      return num >= 1 && num <= 31;
    }),
  month: yup
    .string()
    .required('Вкажіть місяць')
    .test('valid-month', 'Місяць має бути від 1 до 12', value => {
      const num = Number(value);
      return num >= 1 && num <= 12;
    }),
  year: yup
    .string()
    .required('Вкажіть рік')
    .test(
      'valid-year',
      `Рік має бути від 1955 до ${new Date().getFullYear()}`,
      value => {
        const num = Number(value);
        return num >= 1955 && num <= new Date().getFullYear();
      },
    ),
  gender: yup.string().required('Вкажіть стать'),
  genderInterests: yup
    .array('Оберіть хоча б одну опцію')
    .of(yup.string())
    .min(1, 'Оберіть хоча б одну опцію'),
  purposeRelationships: yup.string().required('Вкажіть кого ви шукаєте'),
  photos: yup
    .array()
    .of(yup.mixed())
    .required('Додайте хоча б 2 фото')
    .min(2, 'Додайте хоча б 2 фото')
    .max(6, 'Не більше 6 фото'),
  interests: yup.array().of(yup.string()).max(3, 'Максимум 3 інтереси'),
});

const CreateProfileForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const createProfile = data => {
    const birthDate = formatDateFromParts(data.day, data.month, data.year);
    const age = getAge(birthDate);
    
    const payload = {
      ...data,
      age,
      email: data.email || user?.email || '',
    };

    delete payload.day;
    delete payload.month;
    delete payload.year;

    sendProfile(payload)
      .then(() => {
        navigate('/finding');
        reset();
      })
      .catch(e => {
        console.error('Помилка створення профілю:', e);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(createProfile)}
      className='flex flex-col w-full max-w-4xl gap-10 lg:gap-16'
    >
      <div className='flex flex-col gap-10 lg:flex-row lg:gap-10'>
        <div className='flex flex-col w-full gap-6 lg:w-2/4'>
          <TextInput
            label="Ім'я"
            id='name'
            register={register}
            error={errors.name}
          />
          <TextInput
            label={'Місце проживання'}
            id={'location'}
            register={register}
            error={errors.location}
            placeholder={'Місце проживання'}
          />
          <TextInput
            label='Заклад освіти'
            id='education'
            register={register}
            error={errors.education}
            placeholder={'Введіть повну назву ВНЗ без абревіатури'}
          />
          <TextInput
            label={'Телеграм'}
            id={'telegram'}
            register={register}
            error={errors.telegram}
            placeholder={"Ім'я користувача без @"}
          />

          <DateInput register={register} errors={errors} />
          <ModalGenderSelect
            register={register}
            setValue={setValue}
            watch={watch}
          />
          {errors.gender && (
            <p className='text-sm font-bold text-red-500'>
              {errors.gender.message}
            </p>
          )}
          <GenderInterests register={register} watch={watch} />
          {errors.genderInterests && (
            <p className='text-sm font-bold text-red-500'>
              {errors.genderInterests.message}
            </p>
          )}
          <PurposeRelationshipsSelect
            register={register}
            setValue={setValue}
            watch={watch}
          />
          {errors.purposeRelationships && (
            <p className='text-sm font-bold text-red-500'>
              {errors.purposeRelationships.message}
            </p>
          )}
        </div>

        <div className='w-full lg:w-2/4'>
          <UploadProfilePhotos
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <hr className='flex-grow border-t border-gray-300' />
        <span className='text-lg font-bold text-white'>За бажанням</span>
        <hr className='flex-grow border-t border-gray-300' />
      </div>

      <div className='w-full max-w-xl mx-auto'>
        <InterestsSelect watch={watch} setValue={setValue} />
      </div>

      <div className='flex justify-center '>
        <Btn type='submit'>Продовжити</Btn>
      </div>
    </form>
  );
};

export default CreateProfileForm;
