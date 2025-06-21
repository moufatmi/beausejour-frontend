import React, { useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Plane className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold text-gray-800">Beausejour Voyage</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#accueil"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('accueil');
              }}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Accueil
            </a>
            <a
              href="#rechercher"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('rechercher');
              }}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Rechercher un vol
            </a>
            <a
              href="#a-propos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('a-propos');
              }}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              À propos
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <a
                href="#accueil"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('accueil');
                }}
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
              >
                Accueil
              </a>
              <a
                href="#rechercher"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('rechercher');
                }}
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
              >
                Rechercher un vol
              </a>
              <a
                href="#a-propos"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('a-propos');
                }}
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
              >
                À propos
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 