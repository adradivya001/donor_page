import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Impact', to: 'impact' },
    { name: 'How It Works', to: 'how-it-works' },
    { name: 'Transparency', to: 'transparency' },
    { name: 'Donate', to: 'donate' },
    { name: 'FAQ', to: 'faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-brand-pink-soft py-4'}`}>
      <div className="w-full px-4 md:px-8 flex justify-between items-center relative">
        {/* Left: Logo */}
        <ScrollLink to="home" smooth={true} duration={500} className="flex items-center cursor-pointer flex-shrink-0 z-10">
          <img 
            src="/janmasethu.png?v=2" 
            alt="JanmaSethu Logo" 
            style={{ 
              height: '80px', 
              width: 'auto', 
              transform: 'scale(2.8)', 
              transformOrigin: 'left center',
              display: 'block'
            }}
          />
        </ScrollLink>

        {/* Center Links - Now perfectly centered with equal spacing */}
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-brand-pink after:w-full"
              className="nav-link cursor-pointer whitespace-nowrap"
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>

        {/* Right: Donate button */}
        <div className="hidden md:flex items-center z-10">
          <ScrollLink
            to="donate"
            smooth={true}
            duration={500}
            className="btn-primary"
          >
            Donate Now
          </ScrollLink>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-brand-text">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full p-4 flex flex-col gap-4 shadow-large animate-fade-in">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-brand-text hover:text-brand-pink transition-colors"
            >
              {link.name}
            </ScrollLink>
          ))}
          <ScrollLink
            to="donate"
            smooth={true}
            duration={500}
            onClick={() => setIsOpen(false)}
            className="btn-primary text-center"
          >
            Donate Now
          </ScrollLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
