import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink, scroller } from 'react-scroll';

// Components
import Navbar from '../components/donor/Navbar';
import Hero from '../components/donor/Hero';
import ImpactSection from '../components/donor/ImpactSection';
import HowItWorks from '../components/donor/HowItWorks';
import DonationTiers from '../components/donor/DonationTiers';
import CampaignProgress from '../components/donor/CampaignProgress';
import TransparencySection from '../components/donor/TransparencySection';
import FAQSection from '../components/donor/FAQSection';
import Footer from '../components/donor/Footer';
import CheckoutForm from '../components/donor/CheckoutForm';

const DonorExperience = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setShowCheckout(true);
    
    // Smooth scroll to checkout form after a brief delay for state update
    setTimeout(() => {
      scroller.scrollTo('checkout-form', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }, 100);
  };

  const handleBackToTiers = () => {
    setShowCheckout(false);
    setSelectedAmount(null);
    scroller.scrollTo('donate', {
      duration: 500,
      smooth: 'easeInOutQuart',
    });
  };

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <ImpactSection />
        
        <HowItWorks />
        
        <AnimatePresence mode="wait">
          {!showCheckout ? (
            <motion.div
              key="tiers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DonationTiers onSelect={handleAmountSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <CheckoutForm 
                selectedAmount={selectedAmount} 
                onBack={handleBackToTiers} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <CampaignProgress />
        
        <TransparencySection />
        
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default DonorExperience;

