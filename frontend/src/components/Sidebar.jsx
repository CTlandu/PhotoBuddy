// import React from 'react';

// const Sidebar = () => {
//   return (
//     <div className="flex flex-col w-64 h-full p-4 top-16 left-0 z-20 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/8">
//       <nav className="flex flex-col space-y-2 ml-24">
//         <a href="/profile" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Profile</a>
//         <a href="/portfolio" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Portfolio</a>
//         <a href="/preference" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Preference</a>
//         <a href="/setting" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Setting</a>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full p-4 top-16 left-0 z-20 w-48 md:w-64 lg:w-72 xl:w-80 2xl:w-96">
      <nav className="flex flex-col space-y-2 ml-4 md:ml-6 lg:ml-8 xl:ml-10 2xl:ml-12 mr-4 md:mr-6 lg:mr-8 xl:mr-10 2xl:mr-12">
        <a href="/profile" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Profile</a>
        <a href="/portfolio" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Portfolio</a>
        <a href="/preference" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Preference</a>
        <a href="/setting" className="text-lg hover:bg-blue-300 hover:text-white p-2 rounded">Setting</a>
      </nav>
    </div>
  );
};

export default Sidebar;


