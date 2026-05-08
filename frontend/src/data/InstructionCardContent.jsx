import { FaCommentAlt, FaHeart, FaSearch, FaUser } from 'react-icons/fa';

const instructionContent = [
  {
    icon: <FaUser size={25} color='#F73149' />,
    title: 'Створи профіль',
    description: 'Заповни інформацію про себе, фото та інтереси',
  },
  {
    icon: <FaSearch size={25} color='#F73149' />,
    title: 'Переглядай профілі',
    description: 'Свайпай, шукай студентів поблизу',
  },
  {
    icon: <FaHeart size={25} color='#F73149' />,
    title: 'Надсилай вподобання',
    description: 'Якщо обидва вподобали - отримаєте матч',
  },
  {
    icon: <FaCommentAlt size={25} color='#F73149' />,
    title: 'Почни спілкування',
    description: 'Пиши першим і знайомся!',
  },
];

export default instructionContent;
