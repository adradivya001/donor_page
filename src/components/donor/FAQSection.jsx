import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search } from 'lucide-react';
import { infoService } from '../../services/supabase';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await infoService.getFAQs();
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs([
            {
              category: 'Donation',
              question: 'Is my donation tax-deductible?',
              answer: 'Yes, all donations to Janmsethu are eligible for 80G tax exemption. You will receive a receipt via email immediately after a successful transaction.',
            },
            {
              category: 'Impact',
              question: 'How do you select families for the grant?',
              answer: 'Families undergo a rigorous screening process involving financial background checks and medical necessity evaluation by our clinical panel.',
            },
            {
              category: 'Payment',
              question: 'Can I set up a recurring monthly donation?',
              answer: 'Yes, during the payment step, you can choose to make your donation monthly.',
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFAQs();
  }, []);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="section-padding bg-neutral-light/10">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-navy-primary mb-6">Frequently Asked Questions</h2>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-dark" size={20} />
              <input 
                type="text" 
                placeholder="Search your questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-light rounded-full focus:ring-2 focus:ring-green-accent outline-none shadow-subtle transition-all"
              />
            </div>
          </motion.div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-card overflow-hidden border border-neutral-light shadow-subtle"
              >
                <button 
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-neutral-light/10 transition-colors"
                >
                  <span className="font-bold text-navy-primary pr-8">{faq.question}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-green-accent text-white rotate-180' : 'bg-neutral-light text-navy-primary'}`}>
                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-neutral-dark leading-relaxed">
                        <div className="h-px bg-neutral-light mb-4" />
                        {faq.answer}
                        <div className="mt-4 flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-green-accent bg-green-50 px-2 py-0.5 rounded">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 bg-navy-primary text-white rounded-card"
          >
            <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-8 text-white/70">Our team is here to help you understand your impact and the process.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:support@janmsethu.org" className="btn-primary">Email Us</a>
              <a href="tel:+919876543210" className="btn-secondary border-white text-white hover:bg-white hover:text-navy-primary">Call Support</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
