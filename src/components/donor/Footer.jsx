import React from 'react';
import { ChevronUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <footer className="bg-white py-4 m-0">
      <div className="w-full px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img 
            src="/janmasethu.png" 
            alt="JanmaSethu Logo" 
            className="h-10 w-auto block"
          />
        </div>

        {/* Center: Legal Links - Perfectly equally spaced */}
        <div className="flex flex-wrap justify-center gap-16">
          <a href="#" className="text-brand-text/80 hover:text-brand-pink font-semibold transition-colors">Privacy Policy</a>
          <a href="#" className="text-brand-text/80 hover:text-brand-pink font-semibold transition-colors">Terms of Service</a>
          <a href="#" className="text-brand-text/80 hover:text-brand-pink font-semibold transition-colors">Cookies</a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-8">
          <p className="text-brand-text/50 text-sm font-medium hidden lg:block">
            © 2026 Janmsethu Trust. Building families, one miracle at a time.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-[#1a202c] text-white rounded-full flex items-center justify-center hover:bg-brand-purple transition-all shadow-lg hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Copyright (only visible on mobile) */}
      <div className="lg:hidden mt-8 text-center px-4">
        <p className="text-brand-text/50 text-xs font-medium">
          © 2026 Janmsethu Trust. Building families, one miracle at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
