import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    id: "discretion",
    number: "01",
    title: "Discretion",
    body: "We protect your privacy as fiercely as we guard your comfort. What happens in our vehicles stays in our vehicles.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    id: "precision",
    number: "02",
    title: "Precision",
    body: "Every detail anticipated. Every minute accounted for. Our operation runs with the discipline of a luxury timepiece.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="22"/>
      </svg>
    ),
  },
  {
    id: "heritage",
    number: "03",
    title: "Heritage",
    body: "Born in Kenya. Trusted by the world. We carry the spirit of this extraordinary land in every journey we undertake.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "concierge",
    number: "04",
    title: "Concierge",
    body: "24/7 personal service — not a booking platform. A real person, a direct line, an unwavering commitment to your needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

const STATS = [
  { value: "500+", label: "Private Journeys" },
  { value: "98%",  label: "Guest Satisfaction" },
  { value: "24/7", label: "Concierge Access" },
  { value: "10+",  label: "Years of Excellence" },
];

const WhyChooseUs = () => {
  return (
    <section
      className="relative bg-[#0D0D0D] overflow-hidden"
      aria-label="Why choose Suns Elite"
    >
      {/* Top divider */}
      <hr className="luxury-divider" />

      {/* ── Radial glow background ───────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,107,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="luxury-container section-padding relative z-10">

        {/* ── Header ────────────────────────────────────── */}
        <motion.div
          className="text-center mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-5">The Suns Elite Difference</p>
          <h2 className="font-heading text-display text-warmIvory max-w-2xl mx-auto text-balance">
            Refined Beyond{' '}
            <em className="italic text-champagneGold/80">Expectation</em>
          </h2>
          <p className="font-body text-base text-warmIvory/45 max-w-xl mx-auto mt-6 leading-relaxed text-pretty">
            We don't simply move people from one place to another.
            We craft the invisible architecture of a perfect journey.
          </p>
        </motion.div>

        {/* ── Pillars Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-champagneGold/8 border border-champagneGold/10 mb-20">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.id}
              className="group bg-[#0D0D0D] p-10 flex flex-col gap-6 hover:bg-[#111111] transition-colors duration-500 cursor-default"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Number */}
              <span className="font-display text-4xl font-light text-champagneGold/20 group-hover:text-champagneGold/35 transition-colors duration-500 leading-none select-none">
                {p.number}
              </span>

              {/* Icon */}
              <div className="text-champagneGold/50 group-hover:text-champagneGold/80 transition-colors duration-400">
                {p.icon}
              </div>

              {/* Gold rule */}
              <motion.div
                className="h-px bg-gradient-to-r from-champagneGold/50 to-transparent"
                style={{ width: '2.5rem' }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              />

              {/* Content */}
              <div>
                <h3 className="font-heading text-xl text-warmIvory mb-3 font-medium">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-warmIvory/45 leading-relaxed text-pretty">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Bar ──────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-champagneGold/12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="font-display text-4xl md:text-5xl font-light text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-[0.65rem] tracking-[0.18em] uppercase text-warmIvory/35 font-body">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ────────────────────────────────────────── */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <a
            href="https://wa.me/254743248996?text=Hello%2C%20I%20would%20like%20to%20learn%20more%20about%20Suns%20Elite%20Luxury%20Travels."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-primary inline-flex items-center gap-2 text-xs px-10 py-4"
          >
            Begin a Conversation
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>
      </div>

      <hr className="luxury-divider" />
    </section>
  );
};

export default WhyChooseUs;
