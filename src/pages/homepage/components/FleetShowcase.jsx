import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Users, Briefcase, Wifi } from "lucide-react";

const FLEET_CATEGORIES = [
  {
    id: "executive",
    label: "Executive Sedans",
    vehicles: [
      {
        id: "s-class",
        name: "Mercedes-Benz S-Class",
        tagline: "The benchmark of automotive prestige.",
        image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "3", luggage: "3 bags", features: ["Wi-Fi", "Leather interior", "Climate control"] },
        badge: "Most Requested",
      },
      {
        id: "bmw-7",
        name: "BMW 7 Series",
        tagline: "Precision engineering. Absolute refinement.",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "3", luggage: "3 bags", features: ["Panoramic roof", "Massage seats", "Bose audio"] },
      },
      {
        id: "e-class",
        name: "Mercedes-Benz E-Class",
        tagline: "Timeless elegance for every occasion.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "3", luggage: "2 bags", features: ["MBUX system", "Ambient lighting", "Wi-Fi"] },
      },
    ],
  },
  {
    id: "suv",
    label: "Luxury SUVs",
    vehicles: [
      {
        id: "gls",
        name: "Mercedes-Benz GLS",
        tagline: "Command presence. Exceptional comfort.",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "6", luggage: "4 bags", features: ["Air suspension", "7 seats", "Widescreen display"] },
        badge: "Popular Choice",
      },
      {
        id: "range-rover",
        name: "Range Rover Autobiography",
        tagline: "Above all, beyond compare.",
        image: "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "4", luggage: "4 bags", features: ["Terrain response", "Meridian audio", "Heated seats"] },
      },
      {
        id: "land-cruiser",
        name: "Toyota Land Cruiser V8",
        tagline: "Uncompromised in any terrain.",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "7", luggage: "5 bags", features: ["4WD system", "Off-road ready", "Spacious cabin"] },
      },
    ],
  },
  {
    id: "safari",
    label: "Safari Vehicles",
    vehicles: [
      {
        id: "safari-landcruiser",
        name: "Safari Land Cruiser",
        tagline: "Built for the bush. Crafted for comfort.",
        image: "https://images.unsplash.com/photo-1544736779-09f5abfb6b37?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "7", luggage: "Roof rack", features: ["Pop-up roof", "All-terrain tyres", "Cooler box"] },
        badge: "Safari Specialist",
      },
      {
        id: "custom-safari",
        name: "Custom Safari Van",
        tagline: "Group safaris, unforgettable horizons.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=85&w=1920&auto=format&fit=crop",
        specs: { passengers: "12", luggage: "Ample storage", features: ["Pop-up roof", "Camera hatches", "Game drive ready"] },
      },
    ],
  },
];

const VehicleCard = ({ vehicle, isActive, onClick }) => (
  <motion.div
    className={`group relative overflow-hidden cursor-pointer border transition-all duration-500 ${
      isActive ? 'border-champagneGold/50' : 'border-champagneGold/10 hover:border-champagneGold/30'
    }`}
    onClick={onClick}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />

      {vehicle.badge && (
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-champagneGold text-deepBlack text-[0.55rem] tracking-[0.15em] uppercase font-body font-600">
          {vehicle.badge}
        </div>
      )}

      {isActive && (
        <motion.div
          className="absolute inset-0 border-2 border-champagneGold/40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>

    <div className="p-6 bg-[#0E0E0E]">
      <h4 className="font-heading text-lg text-warmIvory mb-1">{vehicle.name}</h4>
      <p className="font-display italic text-xs text-champagneGold/50 mb-4">{vehicle.tagline}</p>
      <div className="flex items-center gap-4 text-[0.6rem] tracking-[0.12em] uppercase text-warmIvory/35 font-body">
        <span className="flex items-center gap-1.5">
          <Users size={11} strokeWidth={1.5} /> {vehicle.specs.passengers} guests
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase size={11} strokeWidth={1.5} /> {vehicle.specs.luggage}
        </span>
        {vehicle.specs.features.includes('Wi-Fi') && (
          <span className="flex items-center gap-1.5">
            <Wifi size={11} strokeWidth={1.5} /> Wi-Fi
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const FleetShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("executive");
  const [activeVehicle, setActiveVehicle] = useState(null);

  const category = FLEET_CATEGORIES.find(c => c.id === activeCategory);

  const openWhatsApp = (vehicleName) => {
    const msg = `Hello, I'd like to enquire about the ${vehicleName} from your fleet.`;
    window.open(`https://wa.me/254743248996?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      className="section-padding bg-[#080808] relative overflow-hidden"
      aria-label="Our Fleet"
      id="fleet"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(200,169,107,0.04) 0%, transparent 70%)' }}
      />

      <div className="luxury-container relative z-10">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="eyebrow mb-4">The Fleet</p>
              <h2 className="font-heading text-display text-warmIvory">
                Driven by <em className="italic text-champagneGold/80">Excellence</em>
              </h2>
              <p className="font-body text-sm text-warmIvory/45 max-w-md mt-4 leading-relaxed">
                Every vehicle in our collection is meticulously maintained and presented to the highest standard of luxury.
              </p>
            </div>

            <a
              href="/fleet-showcase"
              className="btn-luxury-ghost inline-flex items-center gap-2 text-xs px-7 py-3.5 self-start lg:self-end"
            >
              Full Fleet
              <ArrowRight size={13} strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>

        {/* ── Category Tabs ──────────────────────────────── */}
        <motion.div
          className="flex gap-0 mb-12 border border-champagneGold/15 overflow-x-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {FLEET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setActiveVehicle(null); }}
              className={`relative flex-shrink-0 px-8 py-4 text-[0.65rem] tracking-[0.18em] uppercase font-body transition-all duration-400 ${
                activeCategory === cat.id
                  ? 'text-champagneGold bg-champagneGold/8'
                  : 'text-warmIvory/40 hover:text-warmIvory/70 hover:bg-warmIvory/3'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-champagneGold"
                  layoutId="fleet-tab-indicator"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Vehicle Grid ───────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-champagneGold/5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {category?.vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isActive={activeVehicle?.id === vehicle.id}
                onClick={() => setActiveVehicle(vehicle)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Active Vehicle Detail Panel ─────────────────── */}
        <AnimatePresence>
          {activeVehicle && (
            <motion.div
              className="mt-px border border-champagneGold/15 border-t-champagneGold/30 bg-[#0E0E0E] p-8 md:p-12 flex flex-col md:flex-row gap-10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-1">
                <p className="eyebrow mb-3">Selected Vehicle</p>
                <h3 className="font-heading text-2xl md:text-3xl text-warmIvory mb-3">{activeVehicle.name}</h3>
                <p className="font-display italic text-sm text-champagneGold/55 mb-6">"{activeVehicle.tagline}"</p>

                <div className="mb-8">
                  <p className="text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/30 font-body mb-3">Amenities</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeVehicle.specs.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-body text-warmIvory/55">
                        <span className="w-1 h-1 rounded-full bg-champagneGold/60 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 md:text-right">
                <div className="flex items-center md:justify-end gap-8">
                  {[
                    { label: "Guests", value: activeVehicle.specs.passengers },
                    { label: "Luggage", value: activeVehicle.specs.luggage },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-[0.55rem] tracking-[0.15em] uppercase text-warmIvory/25 font-body mb-1">{s.label}</p>
                      <p className="font-display text-xl font-light text-champagneGold/70">{s.value}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => openWhatsApp(activeVehicle.name)}
                  className="btn-luxury-primary text-[0.65rem] px-7 py-4 flex items-center gap-2 md:self-end"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Request This Vehicle
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FleetShowcase;
