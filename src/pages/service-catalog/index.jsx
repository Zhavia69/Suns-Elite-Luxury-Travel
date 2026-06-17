import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Header from "../../components/ui/Header";
import LuxuryFooter from "../HomePage/index"; // I'll refactor the footer to a separate file or just keep it simple

const CATALOG_SERVICES = [
  {
    id: "seamless-arrivals",
    title: "Seamless Arrivals",
    subtitle: "Airport Transfer",
    tagline: "Where every journey begins — without friction, without compromise.",
    description: "Your flight lands. Your chauffeur awaits. Flight-monitored, immaculately presented, and ready before you reach the arrivals hall. We transform the most stressful moment of travel into the most effortless.",
    image: "https://images.unsplash.com/photo-1549488344-c79b63486df8?q=85&w=2070&auto=format&fit=crop",
    features: ["Real-time flight tracking", "Personalised meet & greet", "Luggage handling", "Complimentary Wi-Fi"],
    price: "From KES 8,500",
    btnText: "Reserve Your Airport Pickup",
    trustSignal: "Flight Tracking Included • Vetted Chauffeurs"
  },
  {
    id: "into-the-wild",
    title: "Into the Wild",
    subtitle: "Safari Gateway Transfer",
    tagline: "The Mara awaits. Let the journey be part of the legend.",
    description: "Bespoke transfers to Kenya's most celebrated safari destinations. From Nairobi to the red dust of the Mara — in vehicles built for the terrain, guided by drivers who know the land intimately.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=85&w=2070&auto=format&fit=crop",
    features: ["Maasai Mara, Amboseli & beyond", "Custom safari-ready vehicles", "Scenic route stopovers", "Refreshments en route"],
    price: "From KES 15,000",
    btnText: "Plan Your Safari Journey",
    trustSignal: "Expert Driver-Guides • Safe & Secure"
  },
  {
    id: "at-your-command",
    title: "At Your Command",
    subtitle: "Exclusive Hourly Chauffeur",
    tagline: "Your schedule. Your pace. Your city — on your terms.",
    description: "A dedicated chauffeur placed entirely at your disposal. For city explorations, consecutive meetings, luxury shopping, or simply the pleasure of unhurried movement through Nairobi.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=85&w=2070&auto=format&fit=crop",
    features: ["Flexible 3-hour to full-day", "Multiple stops, no limits", "Professional English-speaking chauffeur", "Nairobi & beyond"],
    price: "From KES 3,500/hr",
    btnText: "Reserve Your Chauffeur",
    trustSignal: "Absolute Discretion • Highly Flexible"
  },
  {
    id: "executive-standard",
    title: "The Executive Standard",
    subtitle: "Corporate Transportation",
    tagline: "Precision. Discretion. The confidence to arrive differently.",
    description: "Purpose-built for the world of business. Executive sedans, boardroom-ready SUVs, and multi-vehicle fleets that project exactly the right impression — every single time.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=85&w=2070&auto=format&fit=crop",
    features: ["Corporate billing & invoicing", "Priority scheduling", "Wi-Fi enabled fleet", "NDA-level discretion"],
    price: "From KES 6,500",
    btnText: "Request Executive Transport",
    trustSignal: "Priority Corporate Support • Invoicing Available"
  },
  {
    id: "vip-close-protection",
    title: "VIP Transport",
    subtitle: "Secure & Discreet Mobility",
    tagline: "Absolute security, seamless movement.",
    description: "For high-profile individuals, diplomats, and VIPs requiring enhanced security and absolute discretion. Journey with peace of mind in our specialised fleet, with highly trained personnel ensuring your safety.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=85&w=2070&auto=format&fit=crop",
    features: ["Advanced security protocols", "Discreet routing", "Armoured vehicle options", "Close protection officers available"],
    price: "Bespoke Pricing",
    btnText: "Enquire About VIP Services",
    trustSignal: "Highest Level of Discretion • Certified Protection"
  }
];

const ServiceCatalog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/254743248996?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-dvh bg-[#0A0A0A]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-champagneGold origin-left z-[60]"
        style={{ scaleX }}
      />
      <Helmet>
        <title>Curated Experiences — Suns Elite Luxury Travels</title>
        <meta name="description" content="Explore our signature private journeys and executive mobility services in Kenya. Airport transfers, safari gateways, and VIP transport." />
      </Helmet>
      
      <Header />

      <main className="pt-32 lg:pt-40 pb-20">
        <div className="luxury-container">
          
          {/* Page Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-5">Our Collection</p>
            <h1 className="font-heading text-display text-warmIvory max-w-3xl mx-auto text-balance">
              Curated <em className="italic text-champagneGold/80">Experiences</em>
            </h1>
            <p className="font-body text-base text-warmIvory/50 max-w-2xl mx-auto mt-6 leading-relaxed">
              Every journey is an opportunity to experience unparalleled comfort. 
              Discover our signature services, crafted for those who expect nothing less than perfection.
            </p>
          </motion.div>

          {/* Catalog Grid */}
          <div className="space-y-12 md:space-y-24">
            {CATALOG_SERVICES.map((svc, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={svc.id}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2 relative overflow-hidden group">
                    <div className="aspect-[4/3] w-full overflow-hidden border border-champagneGold/10">
                      <img 
                        src={svc.image} 
                        alt={svc.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <p className="eyebrow mb-3">{svc.subtitle}</p>
                    <h2 className="font-heading text-3xl md:text-4xl font-medium text-warmIvory mb-4">
                      {svc.title}
                    </h2>
                    <p className="font-display italic text-lg text-champagneGold/70 mb-6">
                      "{svc.tagline}"
                    </p>
                    <p className="font-body text-sm text-warmIvory/60 leading-relaxed mb-8 text-pretty">
                      {svc.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                      {svc.features.map(f => (
                        <div key={f} className="flex items-center gap-3 text-xs font-body text-warmIvory/50">
                          <Check size={14} className="text-champagneGold" strokeWidth={1.5} />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8 pt-6 border-t border-champagneGold/10">
                      <div>
                        <p className="text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/30 font-body mb-1">Starting</p>
                        <p className="font-display text-xl font-light text-champagneGold whitespace-nowrap">{svc.price}</p>
                      </div>
                      <div className="flex flex-col w-full sm:w-auto">
                        <button 
                          onClick={() => openWhatsApp(`Hello, I am interested in reserving the ${svc.title} service.`)}
                          className="btn-luxury-primary text-[0.7rem] px-8 py-3.5 flex items-center justify-center gap-2"
                        >
                          {svc.btnText || "Enquire Now"}
                          <ArrowRight size={14} strokeWidth={1.5} />
                        </button>
                        {svc.trustSignal && (
                          <div className="mt-2.5 text-[0.55rem] tracking-[0.1em] uppercase text-warmIvory/40 font-body text-center sm:text-left">
                            {svc.trustSignal}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </main>

      {/* Simple Footer for catalog - can be extracted to component */}
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

export default ServiceCatalog;