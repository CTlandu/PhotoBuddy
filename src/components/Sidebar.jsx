import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-full bg-blue-200 p-4 top-16 left-10 z-20">
      <nav className="flex flex-col space-y-2">
        <a href="/profile" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Profile</a>
        <a href="/portfolio" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Portfolio</a>
        <a href="/preference" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Preference</a>
        <a href="/setting" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Setting</a>
      </nav>
    </div>
  );
};

export default Sidebar;
