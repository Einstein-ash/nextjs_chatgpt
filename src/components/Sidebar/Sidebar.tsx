'use client';

import { SidebarProps } from '@/models/chat.model';
import React, { FC } from 'react';

import { FaPlus, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar, setMessages }) => {

  const handleNewChat = () => {
    setMessages([]);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  }

  return (
    <>
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></button>
      )}

      <aside
        className={`
          bg-[#181818] text-gray-200 flex flex-col 
          transition-all duration-300 ease-in-out
          
          fixed inset-y-0 left-0 z-40 md:relative md:flex-shrink-0 
          
          ${isOpen ? 'w-64' : 'w-0 md:w-20'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700 h-16">
          {isOpen && <span className="text-xl font-semibold whitespace-nowrap">Galaxy Chat AI</span>}
          
          <button
            onClick={toggleSidebar}
            className="hidden p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 md:block"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={handleNewChat} className="w-full flex items-center p-2 space-x-3 rounded-lg hover:bg-gray-700">
            <FaPlus />
            {isOpen && <span className="whitespace-nowrap">New Chat</span>}
          </button>
        </nav>


        <div className="p-4 border-t border-gray-700">
          <a href="#" className="flex items-center p-2 space-x-3 rounded-lg hover:bg-gray-700">
            <FaUser />
            {isOpen && <span className="whitespace-nowrap">Profile</span>}
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;