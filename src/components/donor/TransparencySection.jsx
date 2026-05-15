import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FileDown, ShieldCheck, Landmark, BarChart2 } from 'lucide-react';
import { infoService } from '../../services/supabase';

const TransparencySection = () => {
  const [data, setData] = useState([
    { name: 'Medical Treatments', value: 85, color: '#27ae60' },
    { name: 'Counseling & Support', value: 10, color: '#3498db' },
    { name: 'Admin & Operations', value: 5, color: '#2c3e50' },
  ]);

  const [trustSignals, setTrustSignals] = useState([
    { label: '80G Certified', desc: 'Tax exemption for Indian donors.', icon: <ShieldCheck size={32} /> },
    { label: 'Audit Reports', desc: 'Annual financial transparency.', icon: <FileDown size={32} /> },
    { label: 'Bank Partners', desc: 'Secure institutional backing.', icon: <Landmark size={32} /> },
    { label: 'Impact Verified', desc: 'Third-party verification seals.', icon: <BarChart2 size={32} /> },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metrics = await infoService.getTransparencyData();
        if (metrics && metrics.length > 0) {
          setData(metrics.map(m => ({
            name: m.name,
            value: m.value,
            color: m.color || '#27ae60'
          })));
        }
      } catch (err) {
        console.error("Error fetching transparency data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="transparency" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-navy-primary mb-4">Accountability & Transparency</h2>
          <p className="text-lg text-neutral-dark">
            We believe in complete openness about how your funds are utilized to create impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Pie Chart */}
          <div className="bg-neutral-light/20 p-8 rounded-card border border-neutral-light flex flex-col items-center overflow-hidden">
            <h3 className="text-xl font-bold text-navy-primary mb-6 text-center">Fund Utilization Breakdown</h3>
            <div className="w-full max-w-[400px]">
              <ResponsiveContainer width="100%" aspect={1}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {data.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-navy-primary">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {trustSignals.map((signal, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col gap-4 p-6 bg-white border border-neutral-light rounded-card hover:border-green-accent transition-colors"
              >
                <div className="text-green-accent">{signal.icon}</div>
                <div>
                  <h4 className="font-bold text-navy-primary mb-1">{signal.label}</h4>
                  <p className="text-sm text-neutral-dark leading-relaxed">{signal.desc}</p>
                </div>
                {signal.label === 'Audit Reports' && (
                  <a href="#" className="text-green-accent text-sm font-bold flex items-center gap-1 hover:underline mt-auto">
                    Download 2023 Report <FileDown size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TransparencySection;
