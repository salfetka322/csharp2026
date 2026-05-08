import { AnimatePresence, motion } from 'motion/react';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const Notification = ({ type, message, className = '' }) => {
  const styles = {
    success: 'bg-green-500 text-center',
    error: 'bg-red-500 text-center',
    info: 'bg-blue-500 text-center',
  };

  const icons = {
    success: <FaCheckCircle className='flex-shrink-0 mr-2' />,
    error: <MdError className='flex-shrink-0 mr-2' />,
    info: <FaInfoCircle className='flex-shrink-0 mr-2' />,
  };

  return (
    <AnimatePresence>
      <motion.div
        key='notification'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center px-5
           py-3 rounded-lg shadow-md text-white ${styles[type]} ${className}`}
      >
        {icons[type]}
        <span className='text-sm md:text-base'>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;
