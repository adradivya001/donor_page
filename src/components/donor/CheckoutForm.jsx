import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, CreditCard, Landmark, Wallet } from 'lucide-react';
import { donationService } from '../../services/supabase';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  panNumber: z.string().min(10, 'Valid PAN is required for 80G').max(10),
  address: z.string().min(5, 'Address is required'),
});

const CheckoutForm = ({ selectedAmount, onBack }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create/Update Donor
      const donor = await donationService.createDonor({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        address: data.address,
        pan_number: data.panNumber,
      });

      // 2. Create Donation Record
      await donationService.createDonation({
        donor_id: donor.id,
        campaign_id: '89326259-8369-4d5a-a49d-1cbfbbacefa4', // Replace with actual active campaign ID if dynamic
        amount: selectedAmount,
        payment_method: paymentMethod,
        payment_status: 'completed', // In real app, verify with gateway first
        transaction_id: `TXN_${Date.now()}`,
      });

      setStep(4); // Success state
    } catch (err) {
      console.error("Donation failed:", err);
      alert("Something went wrong with the transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { title: 'Personal Info' },
    { title: 'Payment' },
    { title: 'Confirmation' },
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: <Wallet size={24} /> },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={24} /> },
    { id: 'netbanking', name: 'Net Banking', icon: <Landmark size={24} /> },
  ];

  return (
    <div id="checkout-form" className="section-padding bg-neutral-light/10 min-h-[600px] flex items-center">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-card shadow-large overflow-hidden">
          {/* Progress Header */}
          <div className="bg-navy-primary p-6 text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Complete Your Donation</h2>
              <p className="text-white/60 text-sm">Amount: ₹{selectedAmount.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= s ? 'bg-green-accent' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-navy-primary mb-2">First Name</label>
                      <input {...register('firstName')} className="input-field" placeholder="John" />
                      {errors.firstName && <p className="text-error text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-navy-primary mb-2">Last Name</label>
                      <input {...register('lastName')} className="input-field" placeholder="Doe" />
                      {errors.lastName && <p className="text-error text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-navy-primary mb-2">Email Address</label>
                      <input {...register('email')} className="input-field" placeholder="john@example.com" />
                      {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-navy-primary mb-2">Phone Number</label>
                      <input {...register('phone')} className="input-field" placeholder="9876543210" />
                      {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-bold text-navy-primary mb-2">PAN Number (for 80G)</label>
                      <input {...register('panNumber')} className="input-field" placeholder="ABCDE1234F" />
                      {errors.panNumber && <p className="text-error text-xs mt-1">{errors.panNumber.message}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-navy-primary mb-2">Permanent Address</label>
                      <textarea {...register('address')} className="input-field h-24" placeholder="Enter your full address" />
                      {errors.address && <p className="text-error text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    
                    <div className="col-span-2 flex justify-between mt-6">
                      <button type="button" onClick={onBack} className="flex items-center gap-2 text-navy-primary font-bold">
                        <ArrowLeft size={20} /> Change Amount
                      </button>
                      <button type="submit" className="btn-primary flex items-center gap-2">
                        Next Step <ArrowRight size={20} />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-navy-primary">Select Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-6 border-2 rounded-card cursor-pointer transition-all flex flex-col items-center gap-4 ${paymentMethod === method.id ? 'border-green-accent bg-green-50' : 'border-neutral-light hover:border-navy-primary'}`}
                      >
                        <div className={paymentMethod === method.id ? 'text-green-accent' : 'text-navy-primary'}>
                          {method.icon}
                        </div>
                        <span className="font-bold text-navy-primary">{method.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-6 rounded-card border border-blue-100 flex items-center gap-4">
                    <ShieldCheck className="text-blue-trust flex-shrink-0" size={32} />
                    <p className="text-sm text-blue-trust">
                      Your transaction is secured with industry-standard 256-bit encryption. We do not store your credit card or UPI details.
                    </p>
                  </div>

                  <div className="flex justify-between mt-12">
                    <button type="button" onClick={() => setStep(1)} disabled={isSubmitting} className="flex items-center gap-2 text-navy-primary font-bold disabled:opacity-50">
                      <ArrowLeft size={20} /> Back
                    </button>
                    <button onClick={onSubmit} disabled={isSubmitting} className="btn-primary flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Processing...' : `Pay ₹${selectedAmount.toLocaleString()}`} 
                      {!isSubmitting && <ArrowRight size={20} />}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-accent text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-large animate-bounce">
                    <Check size={48} strokeWidth={3} />
                  </div>
                  <h2 className="text-4xl font-bold text-navy-primary mb-4">Thank You!</h2>
                  <p className="text-xl text-neutral-dark mb-10 max-w-lg mx-auto">
                    Your contribution of ₹{selectedAmount.toLocaleString()} has been received. A receipt has been sent to your email.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button onClick={() => window.location.reload()} className="btn-primary">
                      Back to Home
                    </button>
                    <button className="btn-secondary">
                      Download 80G Receipt
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
