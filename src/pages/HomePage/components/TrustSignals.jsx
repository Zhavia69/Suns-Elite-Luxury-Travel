import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const DESTINATIONS = [
  {
    id: "maasai-mara",
    name: "Maasai Mara",
    tagline: "The Great Migration",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=85&w=800&auto=format&fit=crop",
    distance: "270 km from Nairobi",
  },
  {
    id: "amboseli",
    name: "Amboseli",
    tagline: "Kilimanjaro's Shadow",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=85&w=800&auto=format&fit=crop",
    distance: "240 km from Nairobi",
  },
  {
    id: "nairobi",
    name: "Nairobi",
    tagline: "The Safari Capital",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?q=85&w=800&auto=format&fit=crop",
    distance: "City Service",
  },
  {
    id: "diani",
    name: "Diani Beach",
    tagline: "Indian Ocean Bliss",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=85&w=800&auto=format&fit=crop",
    distance: "Mombasa Transfer",
  },
  {
    id: "samburu",
    name: "Samburu",
    tagline: "Untamed North",
    image: "https://images.unsplash.com/photo-1516739220285-cf53c40d8b6b?q=85&w=800&auto=format&fit=crop",
    distance: "350 km from Nairobi",
  },
  {
    id: "lake-nakuru",
    name: "Lake Nakuru",
    tagline: "Flamingo Kingdom",
    image: "https://images.unsplash.com/photo-1625245489364-2f7e2d68aba8?q=85&w=800&auto=format&fit=crop",
    distance: "160 km from Nairobi",
  },
];

const TrustSignals = () => {
  return (
    <>
      {/* ════════════════════════════════════════════════
          DESTINATIONS SECTION
      ════════════════════════════════════════════════ */}
      <section
        className="section-padding bg-[#0A0A0A] relative overflow-hidden"
        aria-label="Kenya destinations"
        id="destinations"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(200,169,107,0.04) 0%, transparent 70%)' }}
        />

        <div className="luxury-container relative z-10">
          {/* Header */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="eyebrow mb-4">Where We Take You</p>
              <h2 className="font-heading text-display text-warmIvory">
                Kenya's Finest <em className="italic text-champagneGold/80">Destinations</em>
              </h2>
              <p className="font-body text-sm text-warmIvory/45 max-w-md mt-4 leading-relaxed">
                Every corner of this extraordinary country, accessible in the style it deserves.
              </p>
            </div>
          </motion.div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-champagneGold/5">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.id}
                className="group relative overflow-hidden cursor-default"
                style={{ aspectRatio: '4/3' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/30 to-transparent group-hover:from-[#0A0A0A]/70 transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={10} className="text-champagneGold/70" strokeWidth={1.5} />
                    <span className="text-[0.55rem] tracking-[0.15em] uppercase text-champagneGold/60 font-body">
                      {dest.distance}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg md:text-xl text-warmIvory leading-tight">{dest.name}</h3>
                  <p className="font-display italic text-xs text-warmIvory/50 mt-1">{dest.tagline}</p>
                </div>

                {/* Hover border accent */}
                <div className="absolute inset-0 border border-champagneGold/0 group-hover:border-champagneGold/25 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CONCIERGE CTA — FULL WIDTH BAND
      ════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        aria-label="Reserve your journey"
      >
        <div className="relative">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=85&w=2070&auto=format&fit=crop"
            alt="Luxury vehicle at twilight"
            className="w-full h-[480px] md:h-[560px] object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="luxury-container">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="eyebrow mb-5">Begin Here</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-warmIvory mb-5 leading-tight">
                  Your Journey Begins{' '}
                  <em className="italic text-champagneGold/80">with a Conversation</em>
                </h2>
                <p className="font-body text-sm text-warmIvory/55 max-w-md mb-8 leading-relaxed">
                  Speak directly with our concierge team. No automated systems.
                  No booking portals. Just exceptional personal service, from the first word.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="https://wa.me/254743248996?text=Hello%2C%20I%20would%20like%20to%20arrange%20a%20private%20journey%20with%20Suns%20Elite."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-primary inline-flex items-center gap-2 text-xs px-9 py-4"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Message Our Concierge
                  </motion.a>

                  <motion.a
                    href="/contact-support"
                    className="btn-luxury-ghost inline-flex items-center gap-2 text-xs px-9 py-4"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    All Contact Options
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </motion.a>
                </div>

                {/* Trust micro-bar */}
                <div className="flex flex-wrap gap-6 mt-8">
                  {['NTSA Licensed', 'ISO 9001 Certified', 'Fully Insured'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-champagneGold/60" />
                      <span className="text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/40 font-body">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSignals;