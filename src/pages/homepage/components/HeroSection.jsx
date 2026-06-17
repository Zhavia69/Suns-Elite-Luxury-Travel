import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Flag, Calendar, Clock, Users, ArrowRight, X } from "lucide-react";
import MagneticButton from "../../../components/ui/MagneticButton";

// ── Luxury Select Component (inline) ─────────────────────────
const LuxurySelect = ({ label, placeholder, options, value, onChange, icon: Icon }) => {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  return (
    <div className="relative group">
      <label className="block text-[0.6rem] tracking-[0.18em] uppercase text-champagneGold/60 font-body mb-2 transition-colors duration-300 group-focus-within:text-champagneGold">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 bg-transparent border-b border-champagneGold/30 pb-2.5 text-left transition-all duration-500 hover:border-champagneGold/60 focus:outline-none focus:border-champagneGold focus:shadow-[0_4px_12px_-4px_rgba(200,169,107,0.3)]"
      >
        {Icon && <Icon size={14} className="text-champagneGold/50 flex-shrink-0 transition-colors duration-300 group-hover:text-champagneGold/80" strokeWidth={1.5} />}
        <span className={`text-sm font-body flex-1 ${selected ? 'text-warmIvory' : 'text-warmIvory/40'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={12} className={`text-champagneGold/50 transition-transform duration-300 ${open ? 'rotate-180 text-champagneGold' : ''}`} strokeWidth={1.5} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 right-0 z-50 mt-1 glass-card border border-champagneGold/20 shadow-luxury-lg overflow-hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm font-body transition-colors duration-200
                  ${value === opt.value ? 'text-champagneGold bg-champagneGold/10' : 'text-warmIvory/75 hover:text-warmIvory hover:bg-champagneGold/5'}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Luxury Input Component (inline) ──────────────────────────
const LuxuryInput = ({ label, type = "text", placeholder, value, onChange, icon: Icon, min }) => (
  <div className="group">
    <label className="block text-[0.6rem] tracking-[0.18em] uppercase text-champagneGold/60 font-body mb-2 transition-colors duration-300 group-focus-within:text-champagneGold">
      {label}
    </label>
    <div className="flex items-center gap-3 border-b border-champagneGold/30 pb-2.5 transition-all duration-500 hover:border-champagneGold/60 group-focus-within:border-champagneGold group-focus-within:shadow-[0_4px_12px_-4px_rgba(200,169,107,0.3)]">
      {Icon && <Icon size={14} className="text-champagneGold/50 flex-shrink-0 transition-colors duration-300 group-hover:text-champagneGold/80 group-focus-within:text-champagneGold" strokeWidth={1.5} />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        className="w-full bg-transparent text-sm font-body text-warmIvory placeholder-warmIvory/30 outline-none border-none transition-all"
        style={{ colorScheme: 'dark' }}
      />
    </div>
  </div>
);

// ── Hero Section ──────────────────────────────────────────────
const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [formData, setFormData] = useState({
    pickup: "", destination: "", serviceType: "", date: "", time: "", passengers: "1",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const serviceOptions = [
    { value: "seamless-arrivals",    label: "Seamless Arrivals (Airport Transfer)" },
    { value: "into-the-wild",        label: "Into the Wild (Safari Gateway)" },
    { value: "at-your-command",      label: "At Your Command (Hourly Chauffeur)" },
    { value: "executive-standard",   label: "The Executive Standard (Corporate)" },
    { value: "vip-transport",        label: "VIP Transport" },
  ];
  const passengerOptions = [
    { value: "1", label: "1 Guest" },
    { value: "2", label: "2 Guests" },
    { value: "3", label: "3 Guests" },
    { value: "4", label: "4 Guests" },
    { value: "5+", label: "5+ Guests" },
  ];

  const set = (field) => (val) => setFormData(p => ({ ...p, [field]: val }));
  const setE = (field) => (e) => setFormData(p => ({ ...p, [field]: e.target.value }));

  const getMinDate = () => new Date().toISOString().split("T")[0];

  const handleReserve = () => {
    const svc = serviceOptions.find(o => o.value === formData.serviceType);
    const msg = [
      "✦ Journey Request — Suns Elite Luxury Travels",
      "─────────────────────────────",
      `📍 Pickup:      ${formData.pickup || "—"}`,
      `🏁 Destination: ${formData.destination || "—"}`,
      `🚘 Experience:  ${svc ? svc.label : formData.serviceType || "—"}`,
      `📅 Date:        ${formData.date || "—"}`,
      `⏰ Time:        ${formData.time || "—"}`,
      `👥 Guests:      ${formData.passengers}`,
      "",
      "Please confirm availability.",
    ].join("\n");

    const url = `https://wa.me/254743248996?text=${encodeURIComponent(msg)}`;
    setWhatsappUrl(url);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    window.open(whatsappUrl, "_blank");
    setFormData({ pickup: "", destination: "", serviceType: "", date: "", time: "", passengers: "1" });
    setShowConfirm(false);
  };

  const handleCall = () => {
    const phone = "+254743248996";
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phone}`;
    } else {
      alert(`📞 Please call us at ${phone}`);
    }
  };

  return (
    <>
      {/* ════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
        aria-label="Hero — Suns Elite Luxury Travels"
      >
        {/* ── Background — Parallax ─────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ y: bgY }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=85&w=2560&auto=format&fit=crop"
            alt="Cinematic Kenyan savanna at golden hour — luxury journey"
            className="w-full h-full object-cover object-center origin-center"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            loading="eager"
            fetchpriority="high"
          />
          {/* Cinematic layered overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/25 to-[#0A0A0A]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/30" />
          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />
        </motion.div>

        {/* ── Hero Content ──────────────────────────────────── */}
        <motion.div
          className="relative z-10 luxury-container pt-32 pb-12 lg:pt-40 lg:pb-16 flex flex-col items-center text-center"
          style={{ y: contentY, opacity }}
        >
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="block h-px bg-gradient-to-r from-transparent to-champagneGold/70"
              style={{ width: 48 }}
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <span className="eyebrow">Kenya's Premier Concierge</span>
            <motion.span
              className="block h-px bg-gradient-to-l from-transparent to-champagneGold/70"
              style={{ width: 48 }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-display text-hero text-warmIvory text-balance max-w-5xl mb-6"
            style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Beyond the Journey.{' '}
            <em className="text-gradient-gold not-italic">Into the Experience.</em>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="font-body text-base md:text-lg text-warmIvory/60 max-w-xl mx-auto leading-relaxed mb-12 text-pretty"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Private journeys crafted for the world's most discerning travellers.
            From Nairobi to the Mara — in absolute comfort.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton
                as="a"
                href="#reserve"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('booking-panel')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-luxury-primary text-[0.7rem] px-10 py-4 flex items-center gap-2"
              >
                Reserve Your Journey
                <ArrowRight size={14} strokeWidth={2} />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="/service-catalog"
                className="btn-luxury-ghost text-[0.7rem] px-10 py-4"
              >
                Explore Experiences
              </MagneticButton>
            </div>
            <p className="mt-3 text-[0.55rem] tracking-[0.15em] uppercase font-body text-warmIvory/30 text-center">
              Flight Tracking Included • Vetted Chauffeurs • 24/7 Concierge Support
            </p>
          </motion.div>

          {/* Trust Micro-bar */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 md:gap-10 text-warmIvory/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { value: '500+', label: 'Journeys' },
              { value: '98%', label: 'Satisfaction' },
              { value: '24/7', label: 'Concierge' },
              { value: '10+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-xl font-light text-champagneGold/80">{stat.value}</div>
                <div className="text-[0.6rem] tracking-[0.15em] uppercase font-body mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Scroll Indicator ──────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="text-[0.55rem] tracking-[0.2em] uppercase text-warmIvory/30 font-body">Scroll</span>
          <ChevronDown
            size={16}
            className="text-champagneGold/50 animate-chevron-bounce"
            strokeWidth={1.5}
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          BOOKING PANEL — floats below hero
      ════════════════════════════════════════════════ */}
      <section
        id="booking-panel"
        className="relative z-20 bg-[#0A0A0A]"
        aria-label="Reserve your journey"
      >
        <div className="luxury-container py-0">
          <motion.div
            className="glass-card border border-champagneGold/20 -mt-0 md:-mt-0 mx-0 md:mx-0 p-8 md:p-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Panel Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-champagneGold/15">
              <div>
                <p className="eyebrow mb-2">Begin Your Journey</p>
                <h2 className="font-heading text-2xl md:text-3xl font-medium text-warmIvory">
                  Reserve a Private Experience
                </h2>
              </div>
              <p className="text-xs text-warmIvory/40 font-body">
                Instant confirmation via WhatsApp · 24/7 Available
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <LuxuryInput
                label="Pickup Location"
                placeholder="Nairobi CBD, JKIA, Hotel..."
                value={formData.pickup}
                onChange={setE("pickup")}
                icon={MapPin}
              />
              <LuxuryInput
                label="Destination"
                placeholder="Masai Mara, Amboseli, CBD..."
                value={formData.destination}
                onChange={setE("destination")}
                icon={Flag}
              />
              <LuxurySelect
                label="Experience Type"
                placeholder="Select an experience"
                options={serviceOptions}
                value={formData.serviceType}
                onChange={set("serviceType")}
                icon={ArrowRight}
              />
              <LuxuryInput
                label="Journey Date"
                type="date"
                value={formData.date}
                onChange={setE("date")}
                icon={Calendar}
                min={getMinDate()}
              />
              <LuxuryInput
                label="Preferred Time"
                type="time"
                value={formData.time}
                onChange={setE("time")}
                icon={Clock}
              />
              <LuxurySelect
                label="Number of Guests"
                placeholder="Select guests"
                options={passengerOptions}
                value={formData.passengers}
                onChange={set("passengers")}
                icon={Users}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                type="button"
                onClick={handleReserve}
                className="btn-luxury-primary flex-1 justify-center text-xs py-4 flex items-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Reserve via WhatsApp
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCall}
                className="btn-luxury-ghost sm:flex-none sm:min-w-[200px] text-xs py-4 flex items-center gap-2 justify-center"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Concierge
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WhatsApp Confirmation Modal ───────────────────────── */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={() => setShowConfirm(false)} />
            <motion.div
              className="relative glass-card border border-champagneGold/25 p-8 max-w-md w-full"
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-4 right-4 text-warmIvory/40 hover:text-warmIvory transition-colors"
                aria-label="Close"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full whatsapp-green flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-warmIvory mb-2">Continue to WhatsApp</h3>
                <p className="text-sm text-warmIvory/50 font-body leading-relaxed">
                  Your journey details are ready. We'll confirm availability and pricing personally.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirm}
                  className="btn-luxury-primary w-full justify-center text-xs py-4"
                >
                  Open WhatsApp
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="btn-luxury-ghost w-full justify-center text-xs py-3"
                >
                  Edit Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSection;
