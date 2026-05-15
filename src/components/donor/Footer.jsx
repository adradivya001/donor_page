import React from 'react';
import { ChevronUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <footer className="bg-white pt-0 pb-1 border-t border-gray-100 m-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="flex items-center h-24">
            <img 
              src="/janmasethu.png" 
              alt="JanmaSethu Logo" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 md:gap-10 text-slate-600 font-medium text-sm">
          <a href="#" className="hover:text-brand-pink transition">Privacy Policy</a>
          <a href="#" className="hover:text-brand-pink transition">Terms of Service</a>
          <a href="#" className="hover:text-brand-pink transition">Cookies</a>
        </div>

        {/* Copyright & Button */}
        <div className="flex items-center gap-6">
          <p className="text-slate-400 text-sm text-center md:text-right font-medium">
            © 2026 Janmsethu Trust. Building families, one miracle at a time. <br className="md:hidden" />
            Built for the future of care.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-[#111827] text-white rounded-full flex items-center justify-center hover:bg-brand-purple transition-all shadow-lg"
          >
            <ChevronUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
