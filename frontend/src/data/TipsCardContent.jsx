import {
  Ban,
  Hand,
  KeyRound,
  MapPin,
  Megaphone,
  MoveUpRight,
} from 'lucide-react';

const tipsContent = [
  {
    icon: <KeyRound className='text-[#F73149]' size={60} />,
    tip: 'Не ділись особистими даними одразу',
  },
  {
    icon: <MapPin className='text-[#F73149]' size={60} />,
    tip: 'Зустрічайся у людних місцях',
  },
  {
    icon: <Megaphone className='text-[#F73149]' size={60} />,
    tip: 'Повідом друзям, куди йдеш',
  },
  {
    icon: <MoveUpRight className='text-[#F73149]' size={60} />,
    tip: 'Май план повернення додому',
  },
  {
    icon: <Ban className='text-[#F73149]' size={60} />,
    tip: 'Не надсилай приватні фото незнайомим',
  },
  {
    icon: <Hand className='text-[#F73149]' size={60} />,
    tip: 'Прислухайся до інтуіції — стоп, якщо не комфортно',
  },
];

export default tipsContent;
