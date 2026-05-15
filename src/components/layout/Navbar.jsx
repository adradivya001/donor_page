import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = ({ onApply, onDonate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'Mission', href: '/#mission' },
        { name: 'Impact', href: '/#impact' },
        { name: 'About Us', href: '/#about' }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 flex items-center ${
            isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
        }`}>
            <div className="w-full px-4 md:px-8 relative flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex-shrink-0 z-10">
                    <Link to="/" className="flex items-center">
                        <img 
                            src="/janmasethu.png" 
                            alt="JanmaSethu Logo" 
                            style={{ 
                                height: '80px', 
                                width: 'auto', 
                                transform: 'scale(2.8)', 
                                transformOrigin: 'left center',
                                display: 'block'
                            }}
                        />
                    </Link>
                </div>

                {/* Center: Tabs - Perfectly Centered */}
                <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className="text-brand-text/70 hover:text-brand-pink transition font-medium text-lg whitespace-nowrap"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button 
                        onClick={onDonate} 
                        className="text-brand-pink font-semibold hover:text-brand-pink/80 transition text-lg whitespace-nowrap"
                    >
                        Donate
                    </button>
                </div>

                {/* Right: Action Button */}
                <div className="hidden md:flex items-center z-10">
                    <Button onClick={onDonate} variant="secondary" size="md">
                        Gift Parenthood
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        className="text-gray-700" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 flex flex-col gap-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href} 
                            className="text-lg py-2 text-gray-700 border-b border-gray-50" 
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button 
                        onClick={() => { onDonate(); setIsOpen(false); }} 
                        className="text-left text-lg py-2 text-deep-teal font-semibold"
                    >
                        Donate
                    </button>
                    <Button 
                        onClick={() => { onApply(); setIsOpen(false); }} 
                        className="w-full text-center mt-2"
                    >
                        Apply for Grant
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
