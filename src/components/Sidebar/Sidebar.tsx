

// import React from 'react';

// const HamburgerIcon = () => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M4 6H20M4 12H20M4 18H20"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// type SidebarProps = {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// };

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
//   return (
//     <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       <div className="sidebar-header">
//         <button onClick={toggleSidebar} className="toggle-btn">
//           <HamburgerIcon />
//         </button>
//         {/* The title only shows when the sidebar is open */}
//         {isOpen && <h1 className="sidebar-title">Your App</h1>}
//       </div>

//       <nav className="sidebar-nav">
//         {/* Your navigation links, chat history, etc. go here */}
//         {/* Example content */}
//         <a href="#" className="nav-item">
//           <span className="nav-icon">💬</span>
//           {isOpen && <span className="nav-text">New Chat</span>}
//         </a>
//         <a href="#" className="nav-item">
//           <span className="nav-icon">🔍</span>
//           {isOpen && <span className="nav-text">Explore</span>}
//         </a>
//         <a href="#" className="nav-item">
//           <span className="nav-icon">⚙️</span>
//           {isOpen && <span className="nav-text">Settings</span>}
//         </a>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;






























'use client';

import React, { FC } from 'react';
// import { MenuIcon, PlusIcon, UserIcon } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`bg-[#181818] text-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700 h-16">
        {isOpen && <span className="text-xl font-semibold">Galaxy Chat AI</span>}
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
          {/* <MenuIcon /> */}OO
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center p-2 space-x-3 rounded-lg hover:bg-gray-700">
          {/* <PlusIcon /> */}
          {isOpen && <span>New Chat</span>}
        </a>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <a href="#" className="flex items-center p-2 space-x-3 rounded-lg hover:bg-gray-700">
          {/* <UserIcon /> */}
          {isOpen && <span>Profile</span>}
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;