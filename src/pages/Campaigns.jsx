import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CampaignCard from '../components/cards/CampaignCard';
import { supabase } from '../services/supabase';
import { useUIStore } from '../store/useUIStore';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const toggleDonateModal = useUIStore(state => state.toggleDonationModal);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const { data, error } = await supabase
                    .from('campaigns')
                    .select('*')
                    .eq('status', 'active')
                    .order('created_at', { ascending: false });

                if (data) setCampaigns(data);
            } catch (err) {
                console.error("Error fetching campaigns:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <div className="min-h-screen bg-warm-white">
            <Navbar onDonate={toggleDonateModal} onApply={() => {}} />

            {/* Header Section */}
            <section className="pt-32 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-deep-teal font-bold tracking-widest uppercase text-sm"
                        >
                            Impact Discovery
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif text-gray-900 mt-4 mb-6"
                        >
                            Active Missions of <br />
                            <span className="text-bold-pink italic">Hope & Parenthood</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl"
                        >
                            Browse through our current fundraising efforts. Every contribution, 
                            no matter the size, brings a deserving family one step closer to their miracle.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Filter/Search Bar (Aesthetic Placeholder) */}
            <section className="sticky top-20 z-30 py-4 bg-white/80 backdrop-blur-md border-y border-gray-100">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search missions..." 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-deep-teal/20 transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all">
                            <Filter size={16} /> Filters
                        </button>
                    </div>
                </div>
            </section>

            {/* Campaigns Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-[2rem]"></div>
                            ))}
                        </div>
                    ) : campaigns.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {campaigns.map(campaign => (
                                <CampaignCard 
                                    key={campaign.id} 
                                    campaign={campaign} 
                                    onDonate={toggleDonateModal}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-soft-pink rounded-full text-bold-pink mb-6">
                                <Heart size={36} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No Active Missions Found</h3>
                            <p className="text-gray-500">Check back soon for new opportunities to create impact.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Campaigns;
