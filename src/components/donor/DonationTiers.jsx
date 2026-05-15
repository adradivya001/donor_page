import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Info } from 'lucide-react';
import { donationService } from '../../services/supabase';

const DonationTiers = ({ onSelect }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const data = await donationService.getTiers();
        if (data && data.length > 0) {
          setTiers(data.map(t => ({
            id: t.id,
            amount: t.amount,
            title: t.tier_name,
            description: t.description,
            beneficiaries: t.beneficiary_count,
            color: t.color_code ? `bg-[${t.color_code}]/10` : 'bg-brand-purple/5',
            accent: t.color_code ? `text-[${t.color_code}]` : 'text-brand-purple',
            recommended: t.position === 1,
          })));
        } else {
          // Fallback to static defaults if DB is empty
          setTiers([
            {
              id: 'tier-1',
              amount: 15000,
              title: 'Support Starter',
              description: 'Medical screening for one couple.',
              beneficiaries: 1,
              color: 'bg-brand-purple/5',
              accent: 'text-brand-purple',
            },
            {
              id: 'tier-2',
              amount: 50000,
              title: 'Family Hope',
              description: 'Partial clinical treatment support.',
              beneficiaries: 1,
              color: 'bg-brand-purple/10',
              accent: 'text-brand-purple',
              recommended: true,
            },
            {
              id: 'tier-3',
              amount: 100000,
              title: 'Miracle Maker',
              description: 'Major portion of an IVF cycle.',
              beneficiaries: 1,
              color: 'bg-brand-purple/20',
              accent: 'text-brand-purple',
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching tiers:", err);
      }
    };
    fetchTiers();
  }, []);

  return (
    <section id="donate" className="section-padding bg-neutral-light/20">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-pink mb-4">Choose Your Gift</h2>
          <p className="text-lg text-neutral-dark">
            Select a predefined tier or enter a custom amount to start your impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className={`relative bg-white p-8 rounded-card border-2 ${tier.recommended ? 'border-purple-600 ring-4 ring-purple-600/10' : 'border-transparent shadow-subtle'} cursor-pointer transition-all flex flex-col`}
              onClick={() => onSelect(tier.amount)}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Recommended
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-brand-text">{tier.title}</h3>
                <Heart className={tier.accent} size={24} />
              </div>
              
              <div className="mb-8">
                <p className={`text-3xl font-bold ${tier.accent}`}>₹{(tier.amount || 0).toLocaleString()}</p>
                <p className="text-sm text-neutral-dark mt-2">{tier.description}</p>
              </div>
              
              <div className={`mt-auto py-3 ${tier.color} rounded-button text-center mb-6`}>
                <p className={`text-sm font-semibold ${tier.accent}`}>
                  Supports {tier.beneficiaries} families
                </p>
              </div>
              
              <button className={`w-full py-3 rounded-button font-bold transition-all shadow-sm ${tier.recommended ? 'bg-brand-purple text-white hover:bg-brand-purple-hover' : 'bg-white border-2 border-brand-purple text-brand-purple hover:bg-brand-purple/5'}`}>
                Select This Tier
              </button>
            </motion.div>
          ))}

          {/* Custom Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            className="bg-white p-8 rounded-card border-2 border-dashed border-gray-300 shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-brand-text">Custom Gift</h3>
                <Heart className="text-brand-text/40" size={24} />
              </div>
              <p className="text-sm text-brand-text/60 mb-6">Choose an amount that feels right for you.</p>
              
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-purple font-bold text-lg">₹</span>
                <input 
                  type="number" 
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 bg-brand-purple/5 border border-transparent rounded-button focus:bg-white focus:ring-2 focus:ring-brand-purple/20 outline-none font-bold text-lg transition-all"
                />
              </div>
            </div>

            <button 
              onClick={() => onSelect(Number(customAmount))}
              disabled={!customAmount || Number(customAmount) <= 0}
              className="w-full py-3 bg-brand-purple text-white rounded-button font-bold hover:bg-brand-purple-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-purple-glow"
            >
              Continue
            </button>
          </motion.div>
        </div>

        {/* Live Calculation / Info */}
        <div className="bg-brand-purple/5 p-6 rounded-card border border-brand-purple/10 flex items-start gap-4">
          <Info className="text-brand-purple flex-shrink-0 mt-1" size={24} />
          <p className="text-sm text-brand-purple leading-relaxed">
            <strong>Transparency Note:</strong> 100% of your donation (excluding payment gateway fees) goes directly to beneficiary medical expenses. Janmsethu is an 80G certified non-profit organization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationTiers;
