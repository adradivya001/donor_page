import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { campaignService } from '../../services/supabase';

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [stats, setStats] = useState([
    { label: 'Families Supported', value: 847, suffix: '' },
    { label: 'Successful Treatments', value: 523, suffix: '' },
    { label: 'Raised', value: 12.5, prefix: '₹', suffix: ' Cr+' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetching stats for the general campaign (assuming ID mapping or first campaign)
        const data = await campaignService.getCampaignStats(); 
        if (data) {
          setStats([
            { label: 'Families Supported', value: data.families_supported, suffix: '' },
            { label: 'Successful Treatments', value: data.successful_treatments, suffix: '' },
            { label: 'Raised', value: data.total_amount_raised / 10000000, prefix: '₹', suffix: ' Cr+' },
          ]);
        }
      } catch (err) {
        console.error("Error fetching hero stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-brand-pink-soft">
      {/* Background soft patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-brand-pink-light/20 to-transparent" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-brand-purple/10 text-brand-purple rounded-full text-sm font-bold tracking-wider uppercase mb-6 border border-brand-purple/20 animate-pulse">
              Mission: Building Families
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-pink leading-tight mb-6">
              Give the Gift of <br />
              <span className="italic">Parenthood</span>
            </h1>
            <p className="text-xl text-brand-text/80 leading-relaxed mb-10 max-w-xl">
              Your contribution directly funds advanced fertility treatments for underprivileged couples across Andhra Pradesh & Telangana. Help us turn dreams into reality, one family at a time.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-16">
              <ScrollLink to="donate" smooth={true} duration={500} className="btn-primary cursor-pointer flex items-center gap-2">
                Donate Now <ArrowRight size={20} />
              </ScrollLink>
              <ScrollLink to="impact" smooth={true} duration={500} className="btn-outline cursor-pointer">
                Our Impact
              </ScrollLink>
            </div>

            {/* Stats Counter moved inside Left Column for better layout */}
            <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-sm p-4 rounded-card border border-brand-pink/10 shadow-sm">
                  <div className="text-2xl font-bold text-brand-pink">
                    {stat.prefix}
                    {inView ? (
                      <CountUp end={stat.value || 0} duration={2.5} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                    ) : (
                      0
                    )}
                    {stat.suffix}
                  </div>
                  <div className="text-[10px] font-bold text-brand-text/50 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-premium">
              <img 
                src="/donor_hope_impact_1778829435118.png" 
                alt="Giving the Gift of Parenthood" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/20 to-transparent" />
            </div>
            
            {/* Decorative floating elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-brand-pink-light rounded-full blur-3xl opacity-60" 
            />
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl opacity-60" 
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
      >
        <ScrollLink to="impact" smooth={true} duration={500}>
          <ChevronDown size={32} />
        </ScrollLink>
      </motion.div>
    </section>
  );
};

export default Hero;
