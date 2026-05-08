import { Link } from 'react-router';

const SupportCard = ({ icon, title, link, btnText, target }) => {
  return (
    <div className='flex items-center justify-center w-full h-40 max-w-3xl gap-5 p-5 bg-black/20 rounded-xl'>
      {icon}
      <div className='flex flex-col gap-2'>
        <h2 className='text-lg text-white'>{title}</h2>
        <Link
          to={link}
          target={target}
          className='border-1 border-gray-200/20 rounded-md text-center text-white py-1 px-3 bg-[#272727] transition-colors duration-300 hover:bg-black'
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default SupportCard;
