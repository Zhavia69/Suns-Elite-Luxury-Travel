import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FleetShowcase = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showBookingOptions, setShowBookingOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fleetCategories = [
    {
      id: 'premium-van',
      title: 'Premium Concierge Vans',
      description: 'Luxury cars perfect for larger groups and extended journeys',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
      capacity: '1-7 passengers',
      luggage: '8-12 bags',
      features: ['Reclining Seats', 'Individual AC', 'USB Ports', 'Reading Lights'],
      vehicles: ['Toyota Noah', 'Toyata Voxy', 'Nissan Serena'],
      priceRange: 'KES 12,000 - 18,000',
      popular: false
    },
    {
      id: 'safari-vehicle',
      title: 'Safari vehicles',
      description: 'Specialized 4WD vehicles designed for safari adventures and rough terrain',
      image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800',
      capacity: '1-7 passengers',
      luggage: '8-12 bags',
      features: ['Pop-up Roof', '4WD Capability', 'Game Viewing', 'Dust Protection'],
      vehicles: ['Toyota Land Cruiser', 'Nissan Patrol', 'Toyota Prado'],
      priceRange: 'KES 15,000 - 25,000',
      popular: false
    }
  ];

  const toggleExpanded = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleBookNow = (category) => {
    setSelectedCategory(category);
    setShowBookingOptions(true);
  };

  const handleBookingChoice = (choice) => {
    const phoneNumber = '+254743248996';
    const email = 'info@luxurytravel.com';
    const whatsAppUrl = `https://wa.me/254743248996?text=Hello, I’d like to book a ${selectedCategory?.title}.`;

    if (choice === 'email') {
      window.location.href = `mailto:${email}?subject=Booking Request - ${selectedCategory?.title}&body=Hello, I’d like to book a ${selectedCategory?.title}. Please share more details.`;
    } else if (choice === 'call') {
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
      } else {
        alert(`📞 Please call us directly at ${phoneNumber}`);
      }
    } else if (choice === 'whatsapp') {
      window.open(whatsAppUrl, '_blank');
    }

    setShowBookingOptions(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="pt-6 md:pt-10 pb-16 md:pb-24 bg-background">

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6">
            Our Premium Fleet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated collection of luxury vehicles, each maintained to the highest standards and equipped with premium amenities.
          </p>
        </motion.div>

        {/* Fleet Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {fleetCategories?.map((category) => (
            <motion.div
              key={category?.id}
              variants={itemVariants}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg luxury-transition"
            >
              {category?.popular && (
                <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.title}
                  className="w-full h-full object-cover group-hover:scale-105 luxury-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {category?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category?.description}
                  </p>
                </div>
              </div>

              <div className="p-6">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{category?.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{category?.luggage}</span>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <span className="text-xs text-muted-foreground">Starting from</span>
                  <div className="font-heading text-lg font-semibold text-primary">
                    {category?.priceRange}
                  </div>
                </div>

                {/* Expandable Details */}
                <motion.div
                  initial={false}
                  animate={{ height: expandedCard === category?.id ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-border space-y-4">
                    {/* Features */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 text-sm">Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category?.features?.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="Check" size={12} className="text-primary" />
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Available Vehicles */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 text-sm">Available Models</h4>
                      <div className="flex flex-wrap gap-2">
                        {category?.vehicles?.map((vehicle, index) => (
                          <span
                            key={index}
                            className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                          >
                            {vehicle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(category?.id)}
                    iconName={expandedCard === category?.id ? "ChevronUp" : "ChevronDown"}
                    iconPosition="right"
                    className="flex-1"
                  >
                    {expandedCard === category?.id ? 'Less Details' : 'More Details'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    className="flex-1"
                    onClick={() => handleBookNow(category)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-luxury">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our fleet management team can arrange specialized vehicles for unique requirements, including diplomatic transport, VIP events, and extended safari expeditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fleet-showcase">
                {/* <Button
                  variant="default"
                  size="lg"
                  iconName="Car"
                  iconPosition="left"
                >
                  Explore Full Fleet
                </Button> */}
              </Link>
              <Link to="/contact-support">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Speak to Specialist
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✅ Booking Options Modal */}
      {showBookingOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Complete Your Booking</h3>
            <p className="text-sm text-gray-600 mb-6">
              How would you like to proceed with booking the <strong>{selectedCategory?.title}</strong>?
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="default" onClick={() => handleBookingChoice('email')} iconName="Mail">
                Write an Email
              </Button>
              <Button variant="default" onClick={() => handleBookingChoice('call')} iconName="Phone">
                Make a Phone Call
              </Button>
              <Button variant="default" onClick={() => handleBookingChoice('whatsapp')} iconName="MessageCircle">
                Chat on WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBookingOptions(false)}
                className="mt-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FleetShowcase;
