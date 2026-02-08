import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const FeaturedServices = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showNumber, setShowNumber] = useState(false);

  const services = [
    {
      id: "airport-transfer",
      title: "Airport Transfer",
      description:
        "Seamless pickup and drop-off services to and from Jomo Kenyatta International Airport with flight tracking.",
      image:
        "https://images.unsplash.com/photo-1731940066098-02966c6480a9?w=500&auto=format&fit=crop&q=60",
      icon: "Plane",
      features: ["Flight Tracking", "Meet & Greet", "Luggage Assistance"],
      startingPrice: "KES 8,500",
      popular: true,
      additionalInfo: {
        highlights: [
          "Real-time flight monitoring for timely arrivals and departures",
          "Professional chauffeurs trained in client etiquette",
          "Personalized pickup signage at the arrivals terminal",
        ],
        inclusions: [
          "Luxury sedan or SUV options",
          "Complimentary bottled water",
          "Wi-Fi connectivity during transfer",
        ],
        finePrint:
          "Available 24/7. Pricing may vary during peak hours. For international arrivals, complimentary waiting time of up to 1 hour is included.",
      },
    },
    {
      id: "safari-gateway",
      title: "Safari Gateway",
      description:
        "Luxury transfers to Kenya's premier safari destinations including Maasai Mara and Amboseli.",
      image:
        "https://images.unsplash.com/photo-1602410132231-9e6c692e02db?w=500&auto=format&fit=crop&q=60",
      icon: "Binoculars",
      features: ["Safari Vehicle", "Game Drive Ready", "Local Guide"],
      startingPrice: "KES 15,000",
      additionalInfo: {
        highlights: [
          "Transfers to Maasai Mara, Amboseli, Tsavo, and Samburu",
          "Custom safari vehicles with all-weather capability",
          "On-route scenic stopovers and refreshment points",
        ],
        inclusions: [
          "Fuel and toll fees",
          "Professional local driver-guide",
          "Complimentary refreshments during the trip",
        ],
        finePrint:
          "Booking must be confirmed 48 hours in advance. Optional guide services available at an additional fee.",
      },
    },
    {
      id: "hourly-chauffeur",
      title: "Hourly Chauffeur",
      description:
        "Dedicated chauffeur service for multiple stops, shopping, or extended city tours.",
      image:
        "https://images.unsplash.com/photo-1644607317737-43846c6024c9?w=500&auto=format&fit=crop&q=60",
      icon: "Clock",
      features: ["Flexible Schedule", "Multiple Stops", "Wait Time Included"],
      startingPrice: "KES 3,500/hr",
      additionalInfo: {
        highlights: [
          "Perfect for meetings, events, and VIP errands",
          "Chauffeurs familiar with major Nairobi landmarks",
          "Flexible booking – from 3 hours to a full day",
        ],
        inclusions: [
          "Luxury saloon or SUV vehicle",
          "Professional English-speaking chauffeur",
          "Complimentary fuel and parking",
        ],
        finePrint:
          "Hourly rates apply within Nairobi County. Additional mileage billed at KES 150/km outside city limits.",
      },
    },
    {
      id: "corporate-transport",
      title: "Corporate Transport",
      description:
        "Exclusive and reliable transportation solutions tailored for corporate clients, business trips, and company events with professional chauffeurs.",
      image:
        "https://www.chauffeurhire.com.au/storage/news/luxury-corporate-transfer-in-hills-seamless-travel-30102405292480.jpg",
      icon: "Briefcase",
      features: [
        "Professional Chauffeur",
        "On-Time Guarantee",
        "Luxury Fleet",
        "Meeting Transfers",
      ],
      startingPrice: "KES 6,500",
      additionalInfo: {
        highlights: [
          "Executive sedans, SUVs, and vans available",
          "Custom branding for VIP or corporate groups",
          "Priority scheduling for business clients",
        ],
        inclusions: [
          "Wi-Fi enabled vehicles",
          "Bottled water and daily newspaper",
          "Invoice and corporate billing support",
        ],
        finePrint:
          "Minimum booking duration: 3 hours. Monthly or retainer contracts available on request.",
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const handleWhatsApp = (serviceTitle) => {
    const phone = "+254743248996";
    const message = `Hello, I am interested in booking the "${serviceTitle}" service from Sun's Luxury Travels. Could you please provide more details?`;
    window.open(
      `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="pt-12 md:pt-20 pb-20 md:pb-32 bg-background relative z-10">

      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        >
          Featured Luxury Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Immerse yourself in curated luxury — from private transfers to premium safari gateways and
          executive chauffeuring experiences crafted exclusively for your comfort.
        </motion.p>

        {/* Service Tiles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-500"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-2">
                    <Icon name={service.icon} size={20} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{service.title}</span>
                </div>
              </div>

              <div className="p-6 text-left">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-primary" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Starting from</span>
                    <div className="font-heading text-lg font-semibold text-primary">
                      {service.startingPrice}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => {
                    setSelectedService(service);
                    setShowNumber(false);
                  }}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-2xl bg-black/80 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#F8F7F3] rounded-3xl w-full max-w-[90%] lg:max-w-[1200px] mx-auto p-10 relative shadow-2xl border border-[#E5C185]/40"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-6 text-[#4B4B4B] hover:text-[#0A0A0A] text-3xl font-bold transition"
                >
                  &times;
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full md:w-1/2 h-[450px] object-cover rounded-2xl shadow-md"
                  />

                  <div className="flex-1 text-left overflow-y-auto max-h-[80vh] pr-2">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
                      {selectedService.title}
                    </h2>

                    <p className="text-[#4B4B4B] mb-4 leading-relaxed text-base">
                      {selectedService.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                        Highlights
                      </h3>
                      <ul className="list-disc list-inside text-[#4B4B4B] text-sm space-y-1">
                        {selectedService.additionalInfo.highlights.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                        Inclusions
                      </h3>
                      <ul className="list-disc list-inside text-[#4B4B4B] text-sm space-y-1">
                        {selectedService.additionalInfo.inclusions.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-sm text-[#6E6E6E] italic border-t border-[#E5C185]/40 pt-3">
                      {selectedService.additionalInfo.finePrint}
                    </p>

                    <div className="mt-6 font-semibold text-lg text-[#C5A572]">
                      Starting from: {selectedService.startingPrice}
                    </div>

                    {/* Contact Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-[#C5A572] text-white rounded-full px-6 py-3 hover:bg-[#b59560] transition shadow-md hover:shadow-lg"
                        iconName="Phone"
                        iconPosition="left"
                        onClick={() => setShowNumber(!showNumber)}
                      >
                        {showNumber ? "+254 743 248 996" : "Call Now"}
                      </Button>

                      <Button
                        size="lg"
                        className="bg-green-600 text-white rounded-full px-6 py-3 hover:bg-green-700 transition shadow-md hover:shadow-lg"
                        iconName="MessageCircle"
                        iconPosition="left"
                        onClick={() => handleWhatsApp(selectedService.title)}
                      >
                        Chat on WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedServices;
