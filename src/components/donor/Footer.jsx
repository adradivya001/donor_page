import React from 'react';
import { ChevronUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <footer className="bg-white pt-0 pb-0 border-t border-gray-100 m-0 block">
      <div className="max-w-[1400px] mx-auto pl-4 md:pl-6 pr-4 md:pr-6 flex flex-col md:flex-row items-center justify-between h-20 py-0">
        
        {/* Left Column: Logo */}
        <div className="flex-1 flex justify-start overflow-visible">
          <div className="ml-[-20px]">
            <img 
              src="/janmasethu.png" 
              alt="JanmaSethu Logo" 
              style={{ 
                height: '90px', 
                width: 'auto', 
                transform: 'scale(2.8)', 
                transformOrigin: 'left center',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Middle Column: Links (Centered & Equal Spacing) */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex items-center gap-10 text-slate-600 font-semibold text-sm">
            <a href="#" className="hover:text-brand-pink transition whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="hover:text-brand-pink transition whitespace-nowrap">Terms of Service</a>
            <a href="#" className="hover:text-brand-pink transition whitespace-nowrap">Cookies</a>
          </div>
        </div>

        {/* Right Column: Copyright & Button */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-6 mr-[-15px]">
            <p className="text-slate-400 text-[13px] font-medium hidden lg:block whitespace-nowrap">
              © 2026 Janmsethu Trust. Empowering parenthood through your generosity.
            </p>
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 bg-[#111827] text-white rounded-full flex items-center justify-center hover:bg-brand-purple transition-all flex-shrink-0"
            >
              <ChevronUp size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Copyright */}
      <div className="lg:hidden pb-0 text-center">
        <p className="text-slate-400 text-[11px] font-medium px-4">
          © 2026 Janmsethu Trust. <br /> Empowering parenthood through your generosity.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
