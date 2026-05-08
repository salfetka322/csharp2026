import { FaQuestionCircle, FaBug, FaLock, FaCommentDots } from 'react-icons/fa';

const supportContent = [
  {
    icon: <FaQuestionCircle size={50} color='#F73149' />,
    title: 'Часті питання',
    link: '/faq',
    btnText: 'Перейти до FAQ',
    target: '_self',
  },
  {
    icon: <FaBug size={50} color='#F73149' />,
    title: 'Повідомити про проблему',
    link: '/problem',
    btnText: 'Заповнити форму',
    target: '_self',
  },
  {
    icon: <FaLock size={50} color='#F73149' />,
    title: 'Безпека облікового запису',
    link: '/safety',
    btnText: 'Поради по захисту',
    target: '_self',
  },
  {
    icon: <FaCommentDots size={50} color='#F73149' />,
    title: "Зв'язатися напряму",
    link: 'https://t.me/r1nozaki',
    btnText: 'Чат з підтримкою',
    target: '_blank',
  },
];

export default supportContent;
