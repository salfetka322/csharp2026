import { FaHeart } from 'react-icons/fa';
import { FaCalendarDay, FaLaptopCode, FaPeopleGroup } from 'react-icons/fa6';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { PiChatsFill, PiPlantFill } from 'react-icons/pi';

const missionContent = [
  {
    icon: <IoChatbubbleEllipsesSharp size={50} color='#F73149' />,
    title: 'Спільнота',
    description: 'Ми створемо середовище, де студенти можуть бути собою',
  },
  {
    icon: <PiPlantFill size={60} color='#F73149' />,
    title: 'Розвиток',
    description: 'Допомагаємо знаходити можливості, що змінюють життя',
  },
  {
    icon: <FaHeart size={50} color='#F73149' />,
    title: 'Підтримка',
    description: 'Завжди поруч, коли потрібна порада чи допомога',
  },
];

const missionContent2 = [
  {
    icon: <FaLaptopCode size={50} color='#F73149' />,
    title: 'Створюємо платформу',
  },
  {
    icon: <FaPeopleGroup size={50} color='#F73149' />,
    title: 'Запускаємо студентів',
  },
  {
    icon: <FaCalendarDay size={50} color='#F73149' />,
    title: 'Формуємо пари та знайомства',
  },
  {
    icon: <PiChatsFill size={50} color='#F73149' />,
    title: 'Підтримуємо спільноту',
  },
];

export { missionContent, missionContent2 };
