import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Wifi } from "lucide-react";
import Header from "../../components/ui/Header";
import MagneticButton from "../../components/ui/MagneticButton";

const FLEET_COLLECTION = [
  {
    category: "Executive Sedans",
    description: "The pinnacle of urban mobility. For boardroom transfers, airport arrivals, and elegant city movement.",
    vehicles: [
      {
        name: "Mercedes-Benz S-Class",
        tagline: "The benchmark of automotive prestige.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=85&w=1920&auto=format&fit=crop",
        passengers: "3", luggage: "3", features: ["Wi-Fi", "Massage seats", "Climate control", "Burmester audio"]
      },
      {
        name: "BMW 7 Series",
        tagline: "Precision engineering. Absolute refinement.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=85&w=1920&auto=format&fit=crop",
        passengers: "3", luggage: "3", features: ["Panoramic roof", "Extended legroom", "Ambient lighting"]
      },
      {
        name: "Mercedes-Benz E-Class",
        tagline: "Timeless elegance for every occasion.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=85&w=1920&auto=format&fit=crop",
        passengers: "3", luggage: "2", features: ["MBUX system", "Wi-Fi", "Leather interior"]
      }
    ]
  },
  {
    category: "Luxury SUVs",
    description: "Commanding presence combined with supreme comfort. Ideal for groups, excessive luggage, or commanding the road.",
    vehicles: [
      {
        name: "Range Rover Autobiography",
        tagline: "Above all, beyond compare.",
        image: "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=85&w=1920&auto=format&fit=crop",
        passengers: "4", luggage: "4", features: ["Terrain response", "Meridian audio", "Heated/Cooled seats"]
      },
      {
        name: "Mercedes-Benz GLS",
        tagline: "Command presence. Exceptional comfort.",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=85&w=1920&auto=format&fit=crop",
        passengers: "6", luggage: "4", features: ["Air suspension", "7 seats", "Widescreen display"]
      },
      {
        name: "Toyota Land Cruiser V8",
        tagline: "Uncompromised in any terrain.",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=85&w=1920&auto=format&fit=crop",
        passengers: "7", luggage: "5", features: ["4WD system", "Off-road ready", "Spacious cabin"]
      }
    ]
  },
  {
    category: "Safari Vehicles",
    description: "Purpose-built for the Kenyan wild, without sacrificing the luxury you expect.",
    vehicles: [
      {
        name: "Custom Safari Land Cruiser",
        tagline: "Built for the bush. Crafted for comfort.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=85&w=1920&auto=format&fit=crop",
        passengers: "7", luggage: "Rack", features: ["Pop-up roof", "All-terrain tyres", "Cooler box", "Radio comms"]
      }
    ]
  }
];

const FleetShowcase = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openWhatsApp = (vehicleName) => {
    const msg = `Hello, I'd like to enquire about the ${vehicleName} from your fleet.`;
    window.open(`https://wa.me/254743248996?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-dvh bg-[#0A0A0A]">
      <Helmet>
        <title>Our Fleet — Suns Elite Luxury Travels</title>
        <meta name="description" content="Explore our impeccable collection of executive sedans, luxury SUVs, and bespoke safari vehicles in Kenya." />
      </Helmet>
      
      <Header />

      <main className="pt-32 lg:pt-40 pb-20">
        <div className="luxury-container">
          
          {/* Page Header */}
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-5">The Collection</p>
            <h1 className="font-heading text-display text-warmIvory max-w-3xl mx-auto text-balance">
              Driven by <em className="italic text-champagneGold/80">Excellence</em>
            </h1>
            <p className="font-body text-base text-warmIvory/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              Our fleet represents the pinnacle of automotive luxury. 
              Meticulously maintained, flawlessly presented, and driven by 
              professionals who understand the art of the journey.
            </p>
          </motion.div>

          {/* Fleet Categories */}
          <div className="space-y-24 md:space-y-32">
            {FLEET_COLLECTION.map((category, catIndex) => (
              <div key={category.category}>
                {/* Category Header */}
                <motion.div 
                  className="mb-12 text-center md:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                    <span className="font-display text-3xl font-light text-champagneGold/30">0{catIndex + 1}</span>
                    <h2 className="font-heading text-3xl lg:text-4xl text-warmIvory">{category.category}</h2>
                  </div>
                  <p className="font-body text-sm text-warmIvory/50 max-w-xl mx-auto md:mx-0">
                    {category.description}
                  </p>
                  <div className="h-px w-full max-w-md bg-gradient-to-r from-champagneGold/30 to-transparent mt-8 mx-auto md:mx-0" />
                </motion.div>

                {/* Vehicle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.vehicles.map((vehicle, vIndex) => (
                    <motion.div 
                      key={vehicle.name}
                      className="group border border-champagneGold/10 hover:border-champagneGold/30 bg-[#0E0E0E] transition-all duration-500 overflow-hidden"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: vIndex * 0.1 }}
                    >
                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h3 className="font-heading text-xl text-warmIvory mb-2">{vehicle.name}</h3>
                        <p className="font-display italic text-sm text-champagneGold/60 mb-6">"{vehicle.tagline}"</p>

                        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-champagneGold/10">
                          <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/40 font-body">
                            <Users size={12} className="text-champagneGold/70" strokeWidth={1.5} />
                            {vehicle.passengers}
                          </div>
                          <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/40 font-body">
                            <Briefcase size={12} className="text-champagneGold/70" strokeWidth={1.5} />
                            {vehicle.luggage}
                          </div>
                          {vehicle.features.includes("Wi-Fi") && (
                            <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/40 font-body">
                              <Wifi size={12} className="text-champagneGold/70" strokeWidth={1.5} />
                              Yes
                            </div>
                          )}
                        </div>

                        <MagneticButton 
                          onClick={() => openWhatsApp(vehicle.name)}
                          className="w-full btn-luxury-ghost text-[0.65rem] py-3 flex items-center justify-center gap-2 group-hover:bg-champagneGold/10 group-hover:border-champagneGold/50"
                        >
                          Request Vehicle
                          <ArrowRight size={12} strokeWidth={1.5} />
                        </MagneticButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

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

export default FleetShowcase;