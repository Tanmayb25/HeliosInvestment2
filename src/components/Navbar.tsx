import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';
// import HeliosLogo from '../assets/HeliosLogo.png';

const HeliosLogo = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516441/HeliosLogo_pufkiz.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Investment Planner', path: '/investment-planner' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar-creative sticky top-0 z-50 w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex flex-col items-start group pt-2 pl-3">
            <div className="flex flex-col items-start h-full w-full">
              
              
                {/* <span className="text-2xl font-bold text-[#1a1750] group-hover:text-[#2a1f70] transition-colors duration-300"> */}
                  <img src={HeliosLogo} className="h-10 md:h-10 lg:h-12 w-auto mb-1" alt="Helios Logo" />
                
                <span className="text-xs text-gray-600 font-medium leading-tight">
                  AMFI Registered Mutual Fund Distributor
                </span>
              
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive(link.path) ? 'text-[#1a1750] border-b-4 border-blue-600 rounded-b-xl bg-blue-50' : 'text-gray-700 hover:text-[#1a1750] hover:bg-gray-100'}
    transform hover:scale-105`
  }
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 btn-accent text-sm transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1a1750] hover:bg-gray-100 transition-all duration-200"
              aria-expanded="false"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-[#1a1750] bg-gray-100'
                      : 'text-gray-700 hover:text-[#1a1750] hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 mt-2 btn-accent text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 