import React, { useState, useEffect } from 'react';
import {
    Heart,
    Baby,
    ShieldCheck,
    Coins,
    Users,
    Hospital,
    Menu,
    X,
    ChevronRight,
    Download,
    Phone,
    Mail,
    MapPin,
    ArrowRight,
    Gift
} from 'lucide-react';

// --- Components ---

const Navigation = ({ onApply, onDonate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 text-2xl font-serif font-bold text-deep-teal">
                    JanmaSethu
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-gray-600 hover:text-deep-teal transition font-medium">About Us</a>
                    <a href="#impact" className="text-gray-600 hover:text-deep-teal transition font-medium">Our Impact</a>
                    <a href="#partners" className="text-gray-600 hover:text-deep-teal transition font-medium">Partners</a>
                    <button onClick={onDonate} className="text-deep-teal font-semibold hover:text-teal-700 transition">Donate</button>
                    <button onClick={onApply} className="bg-bold-pink text-white px-6 py-2.5 rounded-lg hover:bg-pink-600 transition shadow-md hover:shadow-lg font-medium">
                        Apply for Grant
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 flex flex-col gap-4 border-t border-gray-100">
                    <a href="#about" className="text-lg py-2 text-gray-700 border-b border-gray-50" onClick={() => setIsOpen(false)}>About Us</a>
                    <a href="#impact" className="text-lg py-2 text-gray-700 border-b border-gray-50" onClick={() => setIsOpen(false)}>Our Impact</a>
                    <a href="#partners" className="text-lg py-2 text-gray-700 border-b border-gray-50" onClick={() => setIsOpen(false)}>Partners</a>
                    <button onClick={() => { onDonate(); setIsOpen(false); }} className="text-left text-lg py-2 text-deep-teal font-semibold">Donate</button>
                    <button onClick={() => { onApply(); setIsOpen(false); }} className="bg-bold-pink text-white px-6 py-3 rounded-lg text-center font-medium mt-2">Apply for Grant</button>
                </div>
            )}
        </nav>
    );
};

const Hero = ({ onApply, onDonate }) => {
    return (
        <section className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-soft-pink via-white to-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-gray-900 mb-6 leading-tight animate-fade-in">
                    Because Every Dream of Motherhood <br /> <span className="text-deep-teal block mt-2">Deserves a Bridge</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    We remove financial and emotional barriers to parenthood through IVF grants,
                    clinical guidance, and 24/7 companionship with Sakhi.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={onApply} className="bg-bold-pink text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-pink-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Apply for a Grant
                    </button>
                    <button onClick={onDonate} className="bg-white text-deep-teal border-2 border-deep-teal px-8 py-4 rounded-xl text-lg font-medium hover:bg-teal-50 transition shadow-sm hover:shadow-md transform hover:-translate-y-1">
                        Donate Now
                    </button>
                </div>
            </div>
        </section>
    );
};

const MothersHeart = () => {
    return (
        <section id="about" className="py-20 bg-soft-pink">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif mb-6 text-gray-900">To the Mother Who is Still Waiting</h2>
                    <p className="text-xl text-deep-teal mb-8 font-light italic">"We see you. We hear the silence you carry."</p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        The nursery is ready in your heart, even if the room is still empty.
                        At JanmaSethu Trust, we believe that the cost of treatment should never be
                        the reason a lullaby goes unsung. We aren't just a clinical resource; we are your
                        'Sakhi'—the friend who holds your hand when the path gets steep.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center border border-gray-100">
                    <div className="flex-1">
                        <div className="mb-6 text-deep-teal opacity-20"><Heart size={48} fill="currentColor" /></div>
                        <p className="text-xl italic text-gray-600 mb-6 leading-relaxed font-serif">
                            "After three failed cycles and mounting debt, my husband and I had given up.
                            JanmaSethu didn't just give us a grant; they gave us a dedicated counselor who stayed on the phone with
                            me during my darkest nights. Today, I don't just have hope—I have a daughter."
                        </p>
                        <div>
                            <p className="font-bold text-lg text-deep-teal">Anjali R.</p>
                            <p className="text-sm text-gray-500">Trust Beneficiary, Mumbai</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                        <span className="text-sm">[Family Photo Placeholder]</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Stakeholders = () => {
    const cards = [
        {
            icon: <Heart size={40} className="text-bold-pink" />,
            title: "Get Supported",
            desc: "Access subsidies for IVF/IUI treatments and 24/7 emotional support from Sakhi, your dedicated companion.",
            features: ["Financial grants up to ₹1,00,000", "Sakhi 24/7 emotional companionship", "Partner clinic network across India"],
            btn: "Find Help",
            primary: true
        },
        {
            icon: <Gift size={40} className="text-deep-teal" />,
            title: "Change a Life",
            desc: "Your contribution directly funds the birth of a new family. Track your impact with complete transparency.",
            features: ["100% transparency on fund usage", "80G tax exemption certificate", "Regular impact reports"],
            btn: "Give Today",
            primary: false
        },
        {
            icon: <Hospital size={40} className="text-deep-teal" />,
            title: "Join the Mission",
            desc: "Partner with us to provide ethical, subsidized fertility care. We handle financial screening so you can focus on care.",
            features: ["Streamlined patient onboarding", "Guaranteed payment for services", "Access to grant-supported patients"],
            btn: "Partner with Us",
            primary: false
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, idx) => (
                        <div key={idx} className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-deep-teal/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-white group-hover:shadow-sm transition-colors">
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold font-serif mb-3 text-gray-900">{card.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{card.desc}</p>
                            <ul className="space-y-3 mb-8">
                                {card.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                                        <ShieldCheck size={18} className="text-deep-teal shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-xl font-semibold transition ${card.primary ? 'bg-bold-pink text-white hover:bg-pink-600' : 'bg-transparent border-2 border-deep-teal text-deep-teal hover:bg-teal-50'}`}>
                                {card.btn}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-deep-teal text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-serif font-bold">JanmaSethu</h3>
                        <p className="text-teal-100 text-sm leading-relaxed">
                            Removing financial and emotional barriers to parenthood through compassionate
                            grants, ethical partnerships, and 24/7 support.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-teal-100 text-sm">
                            <li><a href="#" className="hover:text-white transition">Apply for Grant</a></li>
                            <li><a href="#" className="hover:text-white transition">Donate</a></li>
                            <li><a href="#" className="hover:text-white transition">Partner with Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Resources</h4>
                        <ul className="space-y-3 text-teal-100 text-sm">
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">80G Certificate</a></li>
                            <li><a href="#" className="hover:text-white transition">Financial Reports</a></li>
                            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-teal-100 text-sm">
                            <li className="flex items-center gap-3"><Mail size={16} /> contact@janmasethu.org</li>
                            <li className="flex items-center gap-3"><Phone size={16} /> +91-98765-43210</li>
                            <li className="flex items-center gap-3"><MapPin size={16} /> Mumbai, India</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-teal-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-teal-200">
                    <p>© 2024 JanmaSethu Trust. All rights reserved.</p>
                    <p className="flex items-center gap-2 mt-4 md:mt-0">Made with <Heart size={14} fill="currentColor" /> for every aspiring parent</p>
                </div>
            </div>
        </footer>
    );
};

// --- Modals (Mock) ---

const GrantModal = ({ onClose }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
            <h2 className="text-3xl font-serif font-bold mb-2">Let's Begin Your Journey</h2>
            <p className="text-gray-500 mb-6">We are here to support you every step of the way.</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Enter your full name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none" placeholder="+91" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none" placeholder="Your city" />
                    </div>
                </div>
                <button className="w-full bg-bold-pink text-white py-4 rounded-xl font-bold text-lg mt-4 hover:bg-pink-600 transition">Start Application</button>
            </div>
        </div>
    </div>
);

const DonationModal = ({ onClose }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full text-deep-teal mb-4">
                    <Gift size={32} />
                </div>
                <h2 className="text-2xl font-serif font-bold">Support a Dream</h2>
                <p className="text-gray-500 mt-2">Your contribution brings a family closer to their miracle.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                {['₹500', '₹2,000', '₹5,000', '₹25,000'].map(amt => (
                    <button key={amt} className="border border-gray-200 py-3 rounded-lg hover:border-deep-teal hover:bg-teal-50 transition font-medium text-gray-700 focus:ring-2 focus:ring-deep-teal bg-white">
                        {amt}
                    </button>
                ))}
            </div>

            <button className="w-full bg-deep-teal text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition">Proceed to Donate</button>
            <p className="text-xs text-center text-gray-400 mt-4">Safe & Secure Payment via Razorpay | 80G Tax Benefits</p>
        </div>
    </div>
);

// --- Main App ---

function App() {
    const [showGrantModal, setShowGrantModal] = useState(false);
    const [showDonateModal, setShowDonateModal] = useState(false);

    return (
        <div className="font-sans antialiased text-gray-800">
            <Navigation onApply={() => setShowGrantModal(true)} onDonate={() => setShowDonateModal(true)} />

            <main>
                <Hero onApply={() => setShowGrantModal(true)} onDonate={() => setShowDonateModal(true)} />
                <MothersHeart />
                <Stakeholders />
            </main>

            <Footer />

            {/* Sakhi Trigger (Floating) */}
            <a href="https://janmasethu.com/sakhi" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-white p-4 rounded-full shadow-2xl z-40 border-2 border-pink-100 hover:scale-110 transition group flex items-center justify-center gap-2 cursor-pointer">
                <span className="bg-bold-pink text-white text-xs font-bold px-2 py-0.5 rounded-full absolute -top-2 -right-2 transform group-hover:scale-110 transition">NEW</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-bold-pink to-purple-500 flex items-center justify-center text-white">
                    <Heart size={16} fill="white" />
                </div>
                <span className="font-medium text-gray-800 pr-1">Chat with Sakhi</span>
            </a>

            {showGrantModal && <GrantModal onClose={() => setShowGrantModal(false)} />}
            {showDonateModal && <DonationModal onClose={() => setShowDonateModal(false)} />}
        </div>
    );
}

export default App;
