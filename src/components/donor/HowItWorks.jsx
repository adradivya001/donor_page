import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, FileText, CreditCard, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Select',
      description: 'Choose a donation tier or enter a custom amount.',
      icon: <MousePointerClick size={32} />,
    },
    {
      title: 'Fill Form',
      description: 'Provide your basic details for tax receipts (80G).',
      icon: <FileText size={32} />,
    },
    {
      title: 'Choose Payment',
      description: 'Complete your transaction via UPI, Card, or Net Banking.',
      icon: <CreditCard size={32} />,
    },
    {
      title: 'Track Impact',
      description: 'Receive updates on the families your gift supported.',
      icon: <BarChart3 size={32} />,
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-navy-primary mb-4">Simple Path to Giving</h2>
          <p className="text-lg text-neutral-dark">
            Your journey to making a difference is designed to be seamless and transparent.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-neutral-light -translate-y-1/2 z-0">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-green-accent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-white border-4 border-neutral-light rounded-full flex items-center justify-center text-navy-primary mb-6 transition-colors duration-300 hover:border-green-accent hover:text-green-accent bg-white shadow-subtle">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-primary mb-3">{step.title}</h3>
                <p className="text-neutral-dark text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
