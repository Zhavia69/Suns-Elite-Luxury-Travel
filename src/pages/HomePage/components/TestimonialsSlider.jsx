import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Suns Elite redefined what I thought a private transfer could be. The chauffeur was waiting with a handwritten sign, chilled water, and knowledge of every back route in Nairobi. It felt like being looked after by a personal concierge, not a driver.",
    author: "James Whitfield",
    title: "CEO, Whitfield Capital · London",
    flag: "🇬🇧",
    avatar: "J",
  },
  {
    id: 2,
    quote: "We arranged our entire Maasai Mara safari transfer through Suns Elite. The Land Cruiser was immaculate, the driver knew the roads and the wildlife patterns. Our guests — all senior executives — were incredibly impressed.",
    author: "Amara Osei-Mensah",
    title: "Director, Pan-African Investments · Accra",
    flag: "🇬🇭",
    avatar: "A",
  },
  {
    id: 3,
    quote: "As someone who travels over 200 days a year, I have high expectations. Suns Elite consistently exceeds them. The vehicles are pristine, the team is discreet, and the reliability is something I now depend on for every Nairobi visit.",
    author: "Dr. Sofia Andersen",
    title: "UN Advisor · Geneva",
    flag: "🇨🇭",
    avatar: "S",
  },
  {
    id: 4,
    quote: "The attention to detail was remarkable — from the welcome note in the vehicle to the perfectly timed airport pick-up despite my flight arriving 40 minutes early. This is what luxury service truly means.",
    author: "Raj Mehta",
    title: "Managing Partner, Horizon VC · Dubai",
    flag: "🇦🇪",
    avatar: "R",
  },
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = TESTIMONIALS.length;

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const testimonial = TESTIMONIALS[current];

  return (
    <section
      className="relative bg-[#080808] overflow-hidden"
      aria-label="Guest testimonials"
    >
      <hr className="luxury-divider" />

      {/* ── Background large quotation mark ──────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 font-display text-[20rem] font-light text-champagneGold/[0.03] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,107,0.04) 0%, transparent 70%)' }}
      />

      <div className="luxury-container section-padding relative z-10">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow mb-4">Voices of Our Guests</p>
          <h2 className="font-heading text-display text-warmIvory">
            Trusted by the <em className="italic text-champagneGold/80">World's Best</em>
          </h2>
        </motion.div>

        {/* ── Testimonial Carousel ────────────────────────── */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Large quote mark */}
              <div className="font-display text-6xl text-champagneGold/30 leading-none mb-6" aria-hidden="true">
                "
              </div>

              {/* Quote */}
              <blockquote className="font-display text-lg md:text-xl font-light text-warmIvory/80 leading-[1.8] mb-10 text-pretty italic">
                {testimonial.quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-5">
                <div className="w-12 h-12 rounded-full bg-champagneGold/10 border border-champagneGold/25 flex items-center justify-center font-display text-xl text-champagneGold/70">
                  {testimonial.avatar}
                </div>
                <div className="text-left">
                  <p className="font-body text-sm font-500 text-warmIvory">
                    {testimonial.author} <span className="ml-1">{testimonial.flag}</span>
                  </p>
                  <p className="text-xs text-warmIvory/40 font-body mt-0.5">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Progress Dots ──────────────────────────────── */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-400 ease-luxury ${
                  i === current
                    ? 'w-8 h-1 bg-champagneGold'
                    : 'w-1.5 h-1.5 rounded-full bg-warmIvory/20 hover:bg-warmIvory/40'
                }`}
                aria-label={`View testimonial ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
              />
            ))}
          </div>

          {/* ── Auto-progress bar ─────────────────────────── */}
          <div className="w-full h-px bg-champagneGold/10 mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-champagneGold/50"
              key={current}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      <hr className="luxury-divider" />
    </section>
  );
};

export default TestimonialsSlider;