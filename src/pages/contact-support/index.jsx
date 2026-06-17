import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, Clock, Shield, Award, CheckCircle, Lock, ChevronDown, ArrowRight } from 'lucide-react';
import Header from '../../components/ui/Header';
import { contactService } from '../../utils/supabaseService';

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-champagneGold/20">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group transition-colors duration-300"
    >
      <h4 className="font-heading text-lg md:text-xl text-warmIvory group-hover:text-champagneGold transition-colors">
        {question}
      </h4>
      <div className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-champagneGold text-champagneGold rotate-180' : 'border-champagneGold/20 text-warmIvory/40 group-hover:border-champagneGold/50'}`}>
        <ChevronDown size={14} strokeWidth={1.5} />
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="pb-6 font-body text-sm text-warmIvory/60 leading-relaxed text-pretty">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ContactSupport = () => {
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Hardcode some luxury FAQs if the service fails or returns empty
    const defaultFaqs = [
      {
        id: 1,
        question: "How far in advance should I reserve my journey?",
        answer: "For guaranteed availability, we recommend reserving your journey at least 24 hours in advance. However, our concierge team can often accommodate immediate requests within Nairobi depending on fleet positioning."
      },
      {
        id: 2,
        question: "Are your chauffeurs trained for VIP protection?",
        answer: "Yes. All our chauffeurs undergo rigorous training in defensive driving, discretion, and executive protocol. We also offer specialized close-protection officers for clients requiring enhanced security."
      },
      {
        id: 3,
        question: "Do you operate outside of Nairobi?",
        answer: "Absolutely. While Nairobi is our primary hub, we facilitate luxury transfers across Kenya, including bespoke safari gateways to the Maasai Mara, Amboseli, Samburu, and coastal transfers in Mombasa and Diani."
      },
      {
        id: 4,
        question: "Can I request a specific vehicle model?",
        answer: "We always strive to accommodate specific vehicle requests from our fleet collection. Please mention your preference to our concierge when reserving, and we will confirm availability."
      }
    ];
    setFaqs(defaultFaqs);
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (contactService?.submitInquiry) {
        await contactService.submitInquiry({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          inquiry_type: 'general'
        });
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const CONTACT_METHODS = [
    {
      title: 'WhatsApp Concierge',
      desc: 'Instant, discreet communication directly with our team.',
      info: '+254 743 248 996',
      icon: MessageCircle,
      action: () => window.open('https://wa.me/254743248996?text=Hello, I need assistance with Sun\'s Travel services', '_blank'),
      btnText: 'Start Conversation'
    },
    {
      title: 'Direct Line',
      desc: 'Speak personally with our executive support desk.',
      info: '+254 743 248 996',
      icon: Phone,
      action: () => window.location.href = 'tel:+254743248996',
      btnText: 'Call Now'
    },
    {
      title: 'Private Correspondence',
      desc: 'For detailed itineraries, corporate accounts, and bespoke requests.',
      info: 'sunsluxurytravels@gmail.com',
      icon: Mail,
      action: () => window.location.href = 'mailto:sunsluxurytravels@gmail.com',
      btnText: 'Compose Email'
    }
  ];

  return (
    <div className="min-h-dvh bg-[#0A0A0A]">
      <Helmet>
        <title>At Your Service — Suns Elite Luxury Travels</title>
        <meta name="description" content="Contact our luxury travel concierge. Available 24/7 for private airport transfers, safari journeys, and executive transport in Kenya." />
      </Helmet>
      
      <Header />

      <main className="pt-32 lg:pt-40 pb-20">
        <div className="luxury-container">
          
          {/* ── Page Header ──────────────────────────────────────── */}
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-5">Contact & Support</p>
            <h1 className="font-heading text-display text-warmIvory max-w-3xl mx-auto text-balance">
              At Your <em className="italic text-champagneGold/80">Service</em>
            </h1>
            <p className="font-body text-base text-warmIvory/50 max-w-xl mx-auto mt-6 leading-relaxed text-pretty">
              Whether you are planning a complex itinerary or require an immediate transfer, 
              our concierge desk is available 24 hours a day to assist you with absolute discretion.
            </p>
          </motion.div>

          {/* ── Contact Methods Grid ──────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
            {CONTACT_METHODS.map((method, i) => (
              <motion.div
                key={method.title}
                className="group relative bg-[#0D0D0D] border border-champagneGold/10 p-8 md:p-10 hover:border-champagneGold/30 transition-colors duration-500"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full border border-champagneGold/20 flex items-center justify-center mb-8 group-hover:border-champagneGold/50 transition-colors duration-500">
                  <method.icon size={20} className="text-champagneGold" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl text-warmIvory mb-3">{method.title}</h3>
                <p className="font-body text-sm text-warmIvory/45 mb-6 leading-relaxed h-10">
                  {method.desc}
                </p>
                <p className="font-display text-lg text-champagneGold mb-8">
                  {method.info}
                </p>
                <button
                  onClick={method.action}
                  className="w-full btn-luxury-ghost text-[0.65rem] py-3.5"
                >
                  {method.btnText}
                </button>
              </motion.div>
            ))}
          </div>

          <hr className="luxury-divider mb-24" />

          {/* ── Form & Info Section ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            
            {/* Direct Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl text-warmIvory mb-4">Send an Inquiry</h2>
              <p className="font-body text-sm text-warmIvory/50 mb-10">
                Prefer to write to us? Submit your details below and a dedicated concierge will contact you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-champagneGold/30 pb-3 text-sm font-body text-warmIvory placeholder-warmIvory/30 focus:outline-none focus:border-champagneGold transition-colors"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-champagneGold/30 pb-3 text-sm font-body text-warmIvory placeholder-warmIvory/30 focus:outline-none focus:border-champagneGold transition-colors"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-champagneGold/30 pb-3 text-sm font-body text-warmIvory placeholder-warmIvory/30 focus:outline-none focus:border-champagneGold transition-colors"
                    placeholder="Email Address"
                  />
                </div>

                <div className="relative">
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-champagneGold/30 pb-3 text-sm font-body text-warmIvory placeholder-warmIvory/30 focus:outline-none focus:border-champagneGold transition-colors resize-none"
                    placeholder="How may we assist you?"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-luxury-primary w-full md:w-auto text-xs px-10 py-4 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Message'}
                  {!isSubmitting && <ArrowRight size={14} strokeWidth={1.5} />}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-sm text-champagneGold mt-4 font-body">Your inquiry has been received. We will contact you shortly.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-400 mt-4 font-body">There was an error sending your message. Please try WhatsApp or calling us directly.</p>
                )}
              </form>
            </motion.div>

            {/* Operating Standards & Trust Signals */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-champagneGold/5 border border-champagneGold/15 p-10 md:p-12 mb-8">
                <h3 className="font-heading text-2xl text-warmIvory mb-8">Operating Standards</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Clock size={18} className="text-champagneGold mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-sm font-body text-warmIvory mb-1">24/7 Availability</h4>
                      <p className="text-xs text-warmIvory/50 font-body leading-relaxed">Our concierge desk and operations run 24 hours a day, 365 days a year to accommodate global flight schedules.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Shield size={18} className="text-champagneGold mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-sm font-body text-warmIvory mb-1">Absolute Discretion</h4>
                      <p className="text-xs text-warmIvory/50 font-body leading-relaxed">We guarantee strict confidentiality regarding client identities, itineraries, and destinations.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Award size={18} className="text-champagneGold mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-sm font-body text-warmIvory mb-1">Licensed & Certified</h4>
                      <p className="text-xs text-warmIvory/50 font-body leading-relaxed">Fully NTSA licensed, ISO 9001:2015 certified, and comprehensively insured for executive transport.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Banner */}
              <div className="bg-[#8B2635]/10 border border-[#8B2635]/30 p-8 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8B2635]/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#8B2635]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-sm font-body text-warmIvory mb-2">Emergency Response Line</h4>
                  <p className="text-xs text-warmIvory/60 font-body mb-3">For immediate assistance during active journeys only.</p>
                  <p className="font-display text-lg text-warmIvory">+254 743 248 996</p>
                </div>
              </div>
            </motion.div>
          </div>

          <hr className="luxury-divider mb-24" />

          {/* ── FAQs ──────────────────────────────────────────────── */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl text-warmIvory">Frequently Asked Questions</h2>
            </div>
            
            <div className="border-t border-champagneGold/20">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === faq.id}
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      <footer className="bg-[#080808] border-t border-champagneGold/12 py-10">
        <div className="luxury-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-light tracking-[0.06em] text-warmIvory">
            SUNS ELITE
          </div>
          <p className="text-[0.65rem] text-warmIvory/40 font-body tracking-wide">
            © {new Date().getFullYear()} Suns Elite Luxury Travels. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactSupport;