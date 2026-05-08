import emailjs from '@emailjs/browser';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Поле ' Ім'я ' є обов'язковим")
    .min(2, 'Мінімальна довжина імені — 2 символи'),
  email: yup
    .string()
    .required("Поле ' Електронна адреса ' є обов'язковим")
    .email('Введіть коректну електронну адресу'),
  message: yup
    .string()
    .required("Поле ' Тема звернення '  є обов'язковим")
    .min(10, 'Опишіть проблему детальніше (мінімум 10 символів)')
    .max(1500, 'Скоротіть опис — дозволено до 1500 символів'),
});

const ContactForm = ({ setSuccess, setError }) => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onSubmit = data => {
    setIsSending(true);

    emailjs
      .send(
        'service_i5joimm',
        'template_n50ityn',
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        'PskL4GEQ6kMNnIPsp',
      )
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        reset();
      })
      .catch(() => {
        setError(true);
        setError(() => {
          false;
        }, 3000);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col w-full gap-4 px-5 py-10 rounded-lg bg-black/20'
    >
      <div className='flex flex-col'>
        <input
          {...register('name')}
          className='w-full p-3 text-white border border-gray-200/20 rounded-xl placeholder:text-white/70 focus:outline-none focus:border-white'
          placeholder="Ім'я"
        />
        {errors.name && (
          <p className='text-sm text-red-500'>{errors.name.message}</p>
        )}
      </div>
      <div className='flex flex-col'>
        <input
          {...register('email')}
          className='w-full p-3 text-white border border-gray-200/20 rounded-xl placeholder:text-white/70 focus:outline-none focus:border-white'
          placeholder='Електронна адреса'
        />
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>
      <div className='flex flex-col'>
        <textarea
          rows={5}
          {...register('message')}
          className='w-full p-3 text-white border resize-none border-gray-200/20 rounded-xl placeholder:text-white/70 focus:outline-none focus:border-white'
          placeholder='Повідомлення'
        />
        {errors.message && (
          <p className='text-sm text-red-500'>{errors.message.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='w-full bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] text-white p-2 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 hover:cursor-pointer'
      >
        {isSending ? <ClipLoader color='ffffff' /> : 'Надіслати'}
      </button>
    </form>
  );
};

export default ContactForm;
