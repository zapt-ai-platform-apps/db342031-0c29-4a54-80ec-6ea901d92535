import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold" onClick={closeMenu}>
            Pajak ku assisten pajakku
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'bg-indigo-800' : 'hover:bg-indigo-700'}`}>
              Beranda
            </Link>
            <Link to="/company" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/company') ? 'bg-indigo-800' : 'hover:bg-indigo-700'}`}>
              Pajak Perusahaan
            </Link>
            <Link to="/individual" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/individual') ? 'bg-indigo-800' : 'hover:bg-indigo-700'}`}>
              Pajak Orang Pribadi
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="cursor-pointer p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'bg-indigo-800' : 'hover:bg-indigo-700'}`}
                onClick={closeMenu}>
                Beranda
              </Link>
              <Link to="/company" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/company') ? 'bg-indigo-800' : 'hover:bg-indigo-700'}`}
                onClick={closeMenu}>
                Pajak Perusahaan
              </Link>
              <Link to="/individual" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/individual') ? 'bg-indigo-800' : 'hover:bg-indigo-700'}`}
                onClick={closeMenu}>
                Pajak Orang Pribadi
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;