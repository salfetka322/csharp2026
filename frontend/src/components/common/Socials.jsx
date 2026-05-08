import {
  FaTiktok,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
} from 'react-icons/fa';

const Socials = ({ contact, className = '' }) => {
  const socialsIcon = [
    {
      icon: <FaInstagram size={contact ? 24 : 20} />,
      link: 'https://www.instagram.com/_r1nozaki/?hl=ru',
      alt: 'Instagram',
    },
    {
      icon: <FaTelegramPlane size={contact ? 24 : 20} />,
      link: 'https://t.me/r1nozaki',
      alt: 'Telegram',
    },
    {
      icon: <FaYoutube size={contact ? 24 : 20} />,
      link: 'https://www.youtube.com/results?search_query=%D1%88%D0%BE%D1%83+%D1%88%D0%B2%D0%B8%D0%B4%D0%BA%D1%96+%D0%BF%D0%BE%D0%B1%D0%B0%D1%87%D0%B5%D0%BD%D0%BD%D1%8F',
      alt: 'Youtube',
    },
    {
      icon: <FaTiktok size={contact ? 24 : 20} />,
      link: 'https://www.tiktok.com/@bluehgfdw?_t=ZM-8zxuIwv9rFw&_r=1',
      alt: 'TikTok',
    },
  ];
  return (
    <div className={`flex items-center gap-5 w-full ${className}`}>
      {socialsIcon.map(({ icon, link, alt }) => (
        <a
          key={alt}
          href={link}
          alt={alt}
          target='_blank'
          className={`transition-colors duration-300 hover:text-[#F73149] `}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
