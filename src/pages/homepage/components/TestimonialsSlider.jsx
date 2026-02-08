import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Oakly Quinten',
      title: 'Client ',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
      rating: 5,
      content: `Suns Elite Luxury Travel has been our trusted partner for diplomatic transport for over two years. Their professionalism, discretion, and punctuality are unmatched. The chauffeurs are well-trained and understand the importance of protocol.`,
      service: 'Hourly Transportation',date: '2024-07-15'
    },
    {
      id: 2,
      name: 'Effie Aduong',
      title: 'Client',avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      rating: 5,
      content: `Exceptional service from start to finish. The luxury voyage was immaculate, the chauffeur was professional, and the airport transfer was seamless. This is now our company's preferred transportation service.`,
      service: 'Executive Airport Transfer',
      date: '2024-07-28'
    },
    {
      id: 3,
      name: 'Cynathia Rose',
      title: 'HRM Advisor',
      avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
      rating: 5,
      content: `I've used Sun's Luxury Travel for multiple within Nairobi. Their attention to detail is remarkable - from flight tracking to providing bottled water and Wi-Fi. Truly a premium experience.`,
      service: 'Corporate Transport',
      date: '2024-08-02'
    },
    {
      id: 4,
      name: 'Lucky Timothy',
      title: 'Client',
      avatar: 'https://randomuser.me/api/portraits/lego/6.jpg',
      rating: 5,
      content: `Our safari gateway transfer to and from the airport were absolutely perfect. The vehicle was comfortable for the long journey, and our driver shared fascinating insights about Kenya. Highly recommended!`,
      service: 'Airport Transfer',
      date: '2024-08-10'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-primary fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-muted/30">

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover why diplomats, executives, and discerning travelers choose Sun's Travel for their luxury transportation needs.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div 
            className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-luxury"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar and Info */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="relative inline-block">
                      <Image
                        src={testimonials?.[currentIndex]?.avatar}
                        alt={testimonials?.[currentIndex]?.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1">
                        <Icon name="Quote" size={12} className="text-primary-foreground" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-heading font-semibold text-foreground">
                        {testimonials?.[currentIndex]?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {testimonials?.[currentIndex]?.title}
                      </p>
                      <div className="flex justify-center md:justify-start space-x-1 mt-2">
                        {renderStars(testimonials?.[currentIndex]?.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {testimonials?.[currentIndex]?.service}
                      </span>
                    </div>
                    <blockquote className="text-foreground text-lg leading-relaxed mb-4">
                      "{testimonials?.[currentIndex]?.content}"
                    </blockquote>
                    <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                      <Icon name="Calendar" size={14} />
                      <span>
                        {new Date(testimonials[currentIndex].date)?.toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full luxury-transition ${
                    index === currentIndex
                      ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            <div className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
                1000+
              </div>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
                5.0
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
                24/7
              </div>
              <p className="text-sm text-muted-foreground">Support Available</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
                99%
              </div>
              <p className="text-sm text-muted-foreground">On-Time Rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;