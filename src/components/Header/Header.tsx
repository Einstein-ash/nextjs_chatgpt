import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex h-16 flex-shrink-0 items-center border-b border-gray-700 bg-[#181818] px-6 text-gray-200">
      <h1 className="text-xl font-semibold">{title}</h1>
      {/* You can add other elements like a user profile icon here later */}
    </header>
  );
};

export default Header;