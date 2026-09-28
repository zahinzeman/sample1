'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { submitProjectInquiry } from '@/lib/supabase';
import { CUBIC_EASE } from './motion';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectType?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  defaultProjectType = 'Residential Interiors',
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: defaultProjectType,
    location: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
      setErrorMessage('');
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitProjectInquiry({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        location: formData.location,
        estimated_budget: formData.budget,
        message: formData.message,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission failed:', err);
      // Fallback via API route
      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            project_type: formData.projectType,
            location: formData.location,
            estimated_budget: formData.budget,
            message: formData.message,
          }),
        });
        if (res.ok) {
          setSubmitted(true);
        } else {
          const errData = await res.json();
          setErrorMessage(errData.error || 'Failed to submit inquiry. Please try again.');
        }
      } catch (apiErr: any) {
        setErrorMessage(
          'Unable to reach database. Please run the SQL schema in Supabase or email us directly at studio@aurellestudio.com.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#171717]/70 backdrop-blur-[6px]"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: CUBIC_EASE }}
            className="relative w-full max-w-[640px] bg-[#F5F3EC] border border-[#D1D1D1] rounded-[12px] p-6 sm:p-10 z-10 shadow-none my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#EAE8E0] hover:bg-[#D1D1D1] text-[#1F1F1F] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 bg-[#DE6800]/15 text-[#DE6800] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="h3-card text-[#1F1F1F] mb-3">
                  Inquiry Received<span className="text-[#DE6800]">.</span>
                </h3>
                <p className="body-text text-[#5C5C5C] max-w-md mx-auto mb-8">
                  Thank you for sharing your vision with Aurelle. Our studio directors will review your project details and respond within 24 business hours.
                </p>
                <Button variant="primary" onClick={onClose} className="mx-auto">
                  Close Window
                </Button>
              </div>
            ) : (
              <div>
                <span className="text-[12px] font-mono tracking-widest text-[#DE6800] uppercase mb-2 block">
                  Studio Consultation
                </span>
                <h3 id="inquiry-modal-title" className="h3-card text-[#1F1F1F] mb-2">
                  Begin Your Project<span className="text-[#DE6800]">.</span>
                </h3>
                <p className="body-text text-[15px] text-[#5C5C5C] mb-8">
                  Share the details of your space. Every scheme is developed from first principles around your lifestyle.
                </p>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-[6px] bg-[#DE6800]/10 border border-[#DE6800]/30 text-[#DE6800] text-[14px]">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#303030] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Elena Rostova"
                        className="w-full bg-[#EAE8E0] border border-[#D1D1D1] rounded-[6px] px-3.5 py-2.5 text-[15px] text-[#1F1F1F] placeholder-[#8A8A8A] focus:outline-none focus:border-[#DE6800]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#303030] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="elena@domain.com"
                        className="w-full bg-[#EAE8E0] border border-[#D1D1D1] rounded-[6px] px-3.5 py-2.5 text-[15px] text-[#1F1F1F] placeholder-[#8A8A8A] focus:outline-none focus:border-[#DE6800]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#303030] mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        className="w-full bg-[#EAE8E0] border border-[#D1D1D1] rounded-[6px] px-3.5 py-2.5 text-[15px] text-[#1F1F1F] focus:outline-none focus:border-[#DE6800]"
                      >
                        <option value="Residential Interiors">Residential Interiors</option>
                        <option value="Hospitality & Workplace">Hospitality & Workplace</option>
                        <option value="Interior Architecture">Interior Architecture</option>
                        <option value="Furnishing & Styling">Furnishing & Styling</option>
                        <option value="Complete Architecture & Interior">Complete Architecture & Interior</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#303030] mb-1.5">
                        Location (City / Country)
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Lisbon, Portugal"
                        className="w-full bg-[#EAE8E0] border border-[#D1D1D1] rounded-[6px] px-3.5 py-2.5 text-[15px] text-[#1F1F1F] placeholder-[#8A8A8A] focus:outline-none focus:border-[#DE6800]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#303030] mb-1.5">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full bg-[#EAE8E0] border border-[#D1D1D1] rounded-[6px] px-3.5 py-2.5 text-[15px] text-[#1F1F1F] focus:outline-none focus:border-[#DE6800]"
                    >
                      <option value="">Select an investment range...</option>
                      <option value="$75,000 – $150,000">$75,000 – $150,000</option>
                      <option value="$150,000 – $350,000">$150,000 – $350,000</option>
                      <option value="$350,000 – $750,000">$350,000 – $750,000</option>
                      <option value="$750,000+">$750,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#303030] mb-1.5">
                      Tell us about your space & timeline *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Briefly describe your property, goals, and envisioned timeline..."
                      className="w-full bg-[#EAE8E0] border border-[#D1D1D1] rounded-[6px] px-3.5 py-2.5 text-[15px] text-[#1F1F1F] placeholder-[#8A8A8A] focus:outline-none focus:border-[#DE6800] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-3.5 justify-center"
                    >
                      {isSubmitting ? 'Transmitting to Studio...' : 'Submit Studio Inquiry'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
