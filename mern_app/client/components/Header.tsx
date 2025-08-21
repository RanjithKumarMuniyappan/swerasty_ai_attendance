
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BriefcaseIcon, ChartPieIcon, UsersIcon, VideoCameraIcon } from './icons/Icons';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const linkClasses = "flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors";
  const activeLinkClasses = "bg-gray-900 text-white";

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-indigo-400" />
            <span className="text-white text-xl font-bold ml-3">AttendancePro</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/home" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
              <VideoCameraIcon className="h-5 w-5 mr-2" />
              Home
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
              <ChartPieIcon className="h-5 w-5 mr-2" />
              Dashboard
            </NavLink>
            <NavLink to="/employees" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
              <UsersIcon className="h-5 w-5 mr-2" />
              Employees
            </NavLink>
          </nav>
          <div className="flex items-center">
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
