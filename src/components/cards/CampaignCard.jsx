import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Clock } from 'lucide-react';
import Button from '../ui/Button';

const CampaignCard = ({ campaign, onDonate }) => {
    const progress = Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
        >
            {/* Image Placeholder/Thumbnail */}
            <div className="h-56 bg-gray-100 relative overflow-hidden">
                {campaign.image_url ? (
                    <img src={campaign.image_url} alt={campaign.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-soft-pink to-teal-50">
                        <Users size={48} />
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-deep-teal shadow-sm">
                    Active Mission
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-deep-teal transition-colors">
                    {campaign.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {campaign.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-auto">
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-deep-teal">₹{campaign.raised_amount.toLocaleString()} raised</span>
                        <span className="text-gray-400">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-6">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-deep-teal to-teal-400 rounded-full"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="text-xs text-gray-500 flex items-center gap-1.5">
                            <Clock size={14} />
                            Goal: ₹{campaign.goal_amount.toLocaleString()}
                        </div>
                        <Button 
                            onClick={() => onDonate(campaign)}
                            variant="primary" 
                            size="sm"
                            className="px-6 rounded-lg"
                        >
                            Donate <ArrowRight size={14} className="ml-1 inline" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CampaignCard;
