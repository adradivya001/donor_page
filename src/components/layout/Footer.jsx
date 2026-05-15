import React from 'react';
import { ChevronUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white pt-0 pb-1">
            <div className="nav-inner-new px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <div className="flex items-center h-24">
                        <img 
                            src="/janmasethu.png" 
                            alt="JanmaSethu Logo" 
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex items-center gap-6 md:gap-10 text-ink-mid font-medium text-sm">
                    <a href="#" className="hover:text-brand-pink transition">Privacy Policy</a>
                    <a href="#" className="hover:text-brand-pink transition">Terms of Service</a>
                    <a href="#" className="hover:text-brand-pink transition">Cookies</a>
                </div>

                {/* Copyright Section */}
                <div className="flex items-center gap-6">
                    <p className="text-ink-hint text-sm text-center md:text-right">
                        © 2026 JanmaSethu Fertility Grant Program. <br className="md:hidden" />
                        Built for the future of care.
                    </p>
                    
                    {/* Back to Top Button */}
                    <button 
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-[#111827] text-white rounded-full flex items-center justify-center hover:bg-brand-purple transition-all shadow-lg"
                        aria-label="Back to top"
                    >
                        <ChevronUp size={24} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
