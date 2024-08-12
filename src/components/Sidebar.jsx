import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-full p-4 top-16 left-0 z-20 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/8">
      <nav className="flex flex-col space-y-2 ml-24">
        <a href="/profile" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Profile</a>
        <a href="/portfolio" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Portfolio</a>
        <a href="/preference" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Preference</a>
        <a href="/setting" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Setting</a>
      </nav>
    </div>
  );
};

export default Sidebar;
