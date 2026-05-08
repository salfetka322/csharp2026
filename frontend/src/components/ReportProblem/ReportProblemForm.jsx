import emailjs from '@emailjs/browser';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import * as yup from 'yup';

import Btn from '../UI/Btn';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Поле ' Ім'я ' є обов'язковим")
    .min(2, 'Мінімальна довжина імені — 2 символи'),
  email: yup
    .string()
    .required("Поле ' Електронна адреса ' є обов'язковим")
    .email('Введіть коректну електронну адресу'),
  problem: yup
    .string()
    .required("Поле ' Проблема '  є обов'язковим")
    .min(10, 'Опишіть проблему детальніше (мінімум 10 символів)')
    .max(1500, 'Скоротіть опис — дозволено до 1500 символів'),
});

const ReportProblemForm = ({ setSuccess, setError }) => {
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
        'service_5rqb4bg',
        'template_fjsjvuq',
        {
          name: data.name,
          email: data.email,
          problem: data.problem,
        },
        'dNwarFQeLfc1EdrRh',
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
        setTimeout(() => {
          setError(false);
        }, 3000);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-lg p-8 rounded-lg shadow-lg bg-black/20'
    >
      <h2 className='text-xl font-bold text-white'>Повідомити проблему</h2>
      <div className='flex flex-col gap-2 mt-5'>
        <label htmlFor='name' className='text-lg text-left text-white'>
          Ваше ім'я
        </label>
        <input
          {...register('name')}
          className='w-full h-14.5 px-3 rounded-lg  bg-white placeholder:text-[#D4DBE2] focus:outline-none focus:border-2 focus:border-[#F73149] '
          placeholder="Введіть ваше ім'я"
        />
        {errors.name && (
          <p className='text-sm text-left text-red-500'>
            {errors.name.message}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-2 mt-5'>
        <label htmlFor='email' className='text-lg text-left text-white'>
          Електронна адреса
        </label>
        <input
          {...register('email')}
          className='w-full h-14.5 px-3 rounded-lg  bg-white placeholder:text-[#D4DBE2] focus:outline-none focus:border-2 focus:border-[#F73149] '
          placeholder='Введіть електронну адресу'
        />
        {errors.email && (
          <p className='text-sm text-left text-red-500'>
            {errors.email.message}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-2 mt-5 mb-5'>
        <label htmlFor='problem' className='text-lg text-left text-white'>
          Опишіть проблему
        </label>
        <textarea
          rows={10}
          {...register('problem')}
          className='w-full rounded-lg p-2 resize-none bg-white focus:outline-none focus:border-2 focus:border-[#F73149]'
          placeholder='Опишіть проблему'
        />
        {errors.problem && (
          <p className='text-sm text-left text-red-500'>
            {errors.problem.message}
          </p>
        )}
      </div>
      <Btn type='submit' disabled={isSending}>
        {isSending ? <ClipLoader size={30} color='#ffffff' /> : 'Надіслати'}
      </Btn>
    </form>
  );
};

export default ReportProblemForm;
