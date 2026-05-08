import SidebarNavigation from './SidebarNavigation';

const Sidebar = () => {
  return (
    <aside className='w-full md:w-20 h-15 md:h-auto bg-gradient-to-b from-[#F73149] via-[#e62a3f] to-[#F73149] flex flex-col items-center md:justify-start justify-center shadow-2xl border-r border-white/10'>
      <SidebarNavigation />
    </aside>
  );
};

export default Sidebar;
