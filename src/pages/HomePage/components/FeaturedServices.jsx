import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, ChevronRight } from "lucide-react";

const SERVICES = [
  {
    id: "seamless-arrivals",
    roman: "I",
    title: "Seamless Arrivals",
    subtitle: "Airport Transfer",
    tagline: "Where every journey begins — without friction, without compromise.",
    description:
      "Your flight lands. Your chauffeur awaits. Flight-monitored, immaculately presented, and ready before you reach the arrivals hall. We transform the most stressful moment of travel into the most effortless.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=85&w=2070&auto=format&fit=crop",
    features: ["Real-time flight tracking", "Personalised meet & greet", "Luggage handling", "Complimentary Wi-Fi"],
    price: "From KES 8,500",
    popular: true,
    destinations: ["JKIA · Nairobi", "Moi International · Mombasa", "Wilson Airport"],
    whatsappMsg: "Hello, I'd like to enquire about your Seamless Arrivals (Airport Transfer) service.",
  },
  {
    id: "into-the-wild",
    roman: "II",
    title: "Into the Wild",
    subtitle: "Safari Gateway Transfer",
    tagline: "The Mara awaits. Let the journey be part of the legend.",
    description:
      "Bespoke transfers to Kenya's most celebrated safari destinations. From Nairobi to the red dust of the Mara — in vehicles built for the terrain, guided by drivers who know the land intimately.",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=85&w=2070&auto=format&fit=crop",
    features: ["Maasai Mara, Amboseli & beyond", "Custom safari-ready vehicles", "Scenic route stopovers", "Refreshments en route"],
    price: "From KES 15,000",
    destinations: ["Maasai Mara", "Amboseli", "Tsavo", "Samburu"],
    whatsappMsg: "Hello, I'd like to enquire about your Into the Wild (Safari Gateway) service.",
  },
  {
    id: "at-your-command",
    roman: "III",
    title: "At Your Command",
    subtitle: "Exclusive Hourly Chauffeur",
    tagline: "Your schedule. Your pace. Your city — on your terms.",
    description:
      "A dedicated chauffeur placed entirely at your disposal. For city explorations, consecutive meetings, luxury shopping, or simply the pleasure of unhurried movement through Nairobi.",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=85&w=2070&auto=format&fit=crop",
    features: ["Flexible 3-hour to full-day", "Multiple stops, no limits", "Professional English-speaking chauffeur", "Nairobi & beyond"],
    price: "From KES 3,500/hr",
    destinations: ["Nairobi CBD", "Karen", "Westlands", "Gigiri"],
    whatsappMsg: "Hello, I'd like to enquire about your At Your Command (Hourly Chauffeur) service.",
  },
  {
    id: "executive-standard",
    roman: "IV",
    title: "The Executive Standard",
    subtitle: "Corporate Transportation",
    tagline: "Precision. Discretion. The confidence to arrive differently.",
    description:
      "Purpose-built for the world of business. Executive sedans, boardroom-ready SUVs, and multi-vehicle fleets that project exactly the right impression — every single time.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=85&w=2070&auto=format&fit=crop",
    features: ["Corporate billing & invoicing", "Priority scheduling", "Wi-Fi enabled fleet", "NDA-level discretion"],
    price: "From KES 6,500",
    destinations: ["Nairobi CBD", "Corporate Parks", "KICC", "UN Complex"],
    whatsappMsg: "Hello, I'd like to enquire about your Executive Standard (Corporate Transport) service.",
  },
];

const FeaturedServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/254743248996?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
      aria-label="Signature Experiences"
      id="services"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(200,169,107,0.15) 0%, transparent 60%), 
                            radial-gradient(circle at 80% 20%, rgba(200,169,107,0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="luxury-container relative z-10">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          className="text-center mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-5">Our Signature Services</p>
          <h2 className="font-heading text-display text-warmIvory max-w-3xl mx-auto text-balance">
            Every Journey,{' '}
            <em className="italic text-champagneGold/80">Crafted for You</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-champagneGold/50" />
            <span className="text-champagneGold/40 text-xs">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-champagneGold/50" />
          </div>
        </motion.div>

        {/* ── Service Cards — Editorial Grid ──────────────── */}
        <div className="space-y-1">
          {SERVICES.map((svc, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.article
                key={svc.id}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} gap-0 border border-champagneGold/10 hover:border-champagneGold/25 transition-colors duration-500`}>

                  {/* ── Image Panel ─────────────────────── */}
                  <div className="relative lg:w-1/2 overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-luxury group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/50 via-transparent to-transparent lg:opacity-0 lg:group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent lg:hidden" />

                    {/* Roman numeral overlay */}
                    <div className="absolute top-6 left-6 font-display text-6xl font-light text-warmIvory/20 leading-none pointer-events-none select-none">
                      {svc.roman}
                    </div>

                    {svc.popular && (
                      <div className="absolute top-6 right-6 px-3 py-1.5 bg-champagneGold text-deepBlack text-[0.6rem] tracking-[0.15em] uppercase font-body font-600">
                        Most Requested
                      </div>
                    )}
                  </div>

                  {/* ── Content Panel ───────────────────── */}
                  <div className="lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-[#0E0E0E]">

                    {/* Top rule */}
                    <motion.div
                      className="h-px bg-gradient-to-r from-champagneGold/60 to-transparent mb-8 w-12"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />

                    <p className="eyebrow mb-3">{svc.subtitle}</p>

                    <h3 className="font-heading text-3xl md:text-4xl font-medium text-warmIvory mb-4 leading-tight">
                      {svc.title}
                    </h3>

                    <p className="font-display text-base italic text-champagneGold/60 mb-5 leading-relaxed">
                      "{svc.tagline}"
                    </p>

                    <p className="font-body text-sm text-warmIvory/55 leading-relaxed mb-7 text-pretty">
                      {svc.description}
                    </p>

                    {/* Features */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-xs font-body text-warmIvory/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-champagneGold/70 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-champagneGold/10">
                      <div>
                        <p className="text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/30 font-body mb-1">Starting</p>
                        <p className="font-display text-xl font-light text-champagneGold">{svc.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedService(svc)}
                          className="btn-luxury-ghost text-[0.65rem] px-5 py-3 flex items-center gap-2"
                          aria-label={`Learn more about ${svc.title}`}
                        >
                          Details
                          <ChevronRight size={12} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => openWhatsApp(svc.whatsappMsg)}
                          className="btn-luxury-primary text-[0.65rem] px-5 py-3 flex items-center gap-2"
                          aria-label={`Enquire about ${svc.title}`}
                        >
                          Enquire
                          <ArrowRight size={12} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── Section Footer CTA ─────────────────────────── */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-warmIvory/40 font-body mb-6">
            Every experience is fully bespoke. Our concierge team will personalise every detail.
          </p>
          <a
            href="/service-catalog"
            className="btn-luxury-ghost inline-flex items-center gap-2 text-xs px-8 py-4"
          >
            View All Experiences
            <ArrowRight size={13} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>

      {/* ── Service Detail Modal ───────────────────────────── */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedService(null)} />

            <motion.div
              className="relative glass-card border border-champagneGold/20 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div className="md:w-2/5 relative overflow-hidden" style={{ minHeight: '260px' }}>
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0A0A0A]/40" />
                <div className="absolute top-4 left-4 font-display text-8xl font-light text-warmIvory/10 leading-none select-none">
                  {selectedService.roman}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10 relative">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-warmIvory/40 hover:text-warmIvory border border-champagneGold/20 hover:border-champagneGold/50 transition-all duration-300"
                  aria-label="Close details"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>

                <p className="eyebrow mb-3">{selectedService.subtitle}</p>
                <h3 className="font-heading text-2xl md:text-3xl text-warmIvory mb-3">{selectedService.title}</h3>
                <p className="font-display italic text-sm text-champagneGold/60 mb-5">"{selectedService.tagline}"</p>

                <hr className="luxury-divider mb-5" />

                <p className="text-sm text-warmIvory/60 font-body leading-relaxed mb-6">{selectedService.description}</p>

                {/* Inclusions */}
                <div className="mb-6">
                  <p className="text-[0.6rem] tracking-[0.18em] uppercase text-warmIvory/30 font-body mb-3">Inclusions</p>
                  <ul className="space-y-2">
                    {selectedService.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm font-body text-warmIvory/65">
                        <Check size={13} className="text-champagneGold flex-shrink-0" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Destinations */}
                <div className="mb-8">
                  <p className="text-[0.6rem] tracking-[0.18em] uppercase text-warmIvory/30 font-body mb-3">Key Destinations</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.destinations.map((d) => (
                      <span key={d} className="px-3 py-1.5 border border-champagneGold/20 text-xs font-body text-warmIvory/50">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-champagneGold/10">
                  <div>
                    <p className="text-[0.6rem] tracking-[0.12em] uppercase text-warmIvory/30 font-body">Starting price</p>
                    <p className="font-display text-2xl font-light text-champagneGold mt-1">{selectedService.price}</p>
                  </div>
                  <button
                    onClick={() => { openWhatsApp(selectedService.whatsappMsg); setSelectedService(null); }}
                    className="btn-luxury-primary text-[0.65rem] px-6 py-3.5 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Reserve via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedServices;
