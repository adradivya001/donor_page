import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Baby, Users } from 'lucide-react';
import { infoService } from '../../services/supabase';

const ImpactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [impacts, setImpacts] = useState([
    {
      amount: '₹15,000',
      support: 'Diagnostic Screening & Counseling',
      description: 'Covers essential fertility tests and emotional support for one couple.',
      icon: <Users className="text-blue-trust" size={32} />,
      delay: 0,
    },
    {
      amount: '₹50,000',
      support: 'Partial IUI Treatment Support',
      description: 'Funds the medical procedure and medication costs for Intrauterine Insemination.',
      icon: <Heart className="text-green-accent" size={32} />,
      delay: 0.2,
    },
    {
      amount: '₹1,50,000',
      support: 'Full IVF Treatment Grant',
      description: 'Provides a complete In-Vitro Fertilization cycle including medication.',
      icon: <Baby className="text-blue-trust" size={32} />,
      delay: 0.4,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cards = await infoService.getImpactCards();
        if (cards && cards.length > 0) {
          const iconMap = {
            'users': <Users className="text-blue-trust" size={32} />,
            'heart': <Heart className="text-green-accent" size={32} />,
            'baby': <Baby className="text-blue-trust" size={32} />
          };

          setImpacts(cards.map((c, i) => ({
            amount: c.amount,
            support: c.support_type,
            description: c.description,
            icon: iconMap[c.icon_type] || <Heart className="text-green-accent" size={32} />,
            delay: i * 0.2
          })));
        }
      } catch (err) {
        console.error("Error fetching impact cards:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="impact" className="section-padding bg-neutral-light/30">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-navy-primary mb-4">Your Impact at a Glance</h2>
          <p className="text-lg text-neutral-dark">
            See how your generous contributions are transformed into tangible hope for families.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: item.delay }}
              whileHover={{ y: -8, boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
              className="bg-white p-8 rounded-card border border-gray-100 shadow-subtle transition-all cursor-default"
            >
              <div className="mb-6 inline-block p-4 bg-neutral-light rounded-full">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-navy-primary mb-2">{item.amount}</h3>
              <div className="text-green-accent font-semibold mb-4 uppercase tracking-wider text-sm">
                {item.support}
              </div>
              <p className="text-neutral-dark leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
