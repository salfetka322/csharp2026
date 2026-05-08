const Btn = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`w-full text-lg md:text-xl font-bold h-14 md:h-16 bg-gradient-to-br from-[#F73149] via-[#e62a3f] to-[#d62839] text-center text-white rounded-2xl hover:cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F73149]/50 border-2 border-white/20 ${className}`}
    >
      {children}
    </button>
  );
};

export default Btn;
