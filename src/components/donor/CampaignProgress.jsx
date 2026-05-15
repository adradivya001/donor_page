import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { campaignService, infoService } from '../../services/supabase';

import 'swiper/css';
import 'swiper/css/pagination';

const CampaignProgress = () => {
  const [campaignData, setCampaignData] = useState({
    progress: 62.5,
    raised: 9375000,
    goal: 15000000,
  });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaigns = await campaignService.getActiveCampaigns();
        if (campaigns && campaigns.length > 0) {
          const main = campaigns[0];
          setCampaignData({
            progress: Math.round((main.current_amount / main.goal_amount) * 100),
            raised: main.current_amount,
            goal: main.goal_amount,
          });
        }

        const testimonialData = await infoService.getTestimonials();
        if (testimonialData && testimonialData.length > 0) {
          setTestimonials(testimonialData);
        } else {
          // Fallback to initial provided stories
          setTestimonials([
            {
              name: 'Divya & Sanjay',
              story: "After years of longing, Janmsethu's support gave us the miracle we prayed for. Today, our home is filled with the laughter we always dreamed of.",
              avatar_text: 'DS'
            },
            {
              name: 'Priya & Rohit',
              story: "After 12 years of waiting, Janmsethu gave us hope. Today, our son brings boundless joy to our home.",
              avatar_text: 'PR'
            },
            {
              name: 'Meera & Arun',
              story: "We lost hope 15 years ago. Janmsethu turned our 'dry home' into one filled with laughter. Our daughter is our greatest gift.",
              avatar_text: 'MA'
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const { progress, raised, goal } = campaignData;

  const milestones = [
    { title: '₹50L raised!', icon: <Trophy size={18} />, color: 'bg-yellow-100 text-yellow-700' },
    { title: '1000 lives touched', icon: <Users size={18} />, color: 'bg-blue-100 text-blue-700' },
    { title: '500+ Miracles', icon: <Heart size={18} />, color: 'bg-green-100 text-green-700' },
  ];


  return (
    <section className="section-padding bg-brand-pink text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Progress Visuals */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif">Campaign Momentum</h2>
            
            <div className="bg-white/20 p-8 rounded-[30px] backdrop-blur-md border border-white/20 mb-10 shadow-2xl">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-4xl font-bold text-white">₹{(raised || 9375000).toLocaleString()}</span>
                  <span className="text-white/80 ml-2">raised of ₹1.5 Cr goal</span>
                </div>
                <span className="text-white font-bold text-xl">{progress || 62.5}%</span>
              </div>
              
              <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress || 62.5}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-brand-purple shadow-[0_0_20px_rgba(128,90,213,0.5)]"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-yellow-100 text-yellow-700">
                  🏆 ₹50L raised!
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
                  👥 1000 families supported
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700">
                  💝 500+ Miracles
                </div>
              </div>
            </div>

          </div>

          {/* Testimonials */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 6000 }}
              pagination={{ clickable: true }}
              className="testimonial-swiper"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white p-10 rounded-[30px] text-brand-pink shadow-2xl min-h-[300px] flex flex-col justify-center">
                    <p className="text-xl italic leading-relaxed mb-8 font-medium">
                      "{t.story}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center font-bold text-brand-pink">
                        {t.avatar_text || (t.name ? t.name.charAt(0) : 'B')}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-text">{t.name}</h4>
                        <p className="text-sm text-brand-text/60">Successful Beneficiary</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignProgress;
