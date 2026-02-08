import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      id: 'kaa',
      name: 'Kenya Association of Air Operators',
      logo: 'data:image/png;base64,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',
      description: 'Licensed airport transfer operator'
    },
    {
      id: 'ntsa',
      name: 'National Transport & Safety Authority',
      logo: 'data:image/png;base64,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',
      description: 'Certified commercial transport provider'
    },
    {
      id: 'kato',
      name: 'Kenya Association of Tour Operators',
      logo: 'data:image/jpeg;base64,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',
      description: 'Registered tourism transport service'
    },
    // {
    //   id: 'diplomatic',
    //   name: 'Diplomatic Service Provider',
    //   logo: 'https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?q=80&w=2070&auto=format&fit=crop',
    //   description: 'Approved for embassy transport'
    // }
  ];

  const partners = [
    // {
    //   id: 'serena',
    //   name: 'Serena Hotels',
    //   logo: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    //   type: 'Hotel Partner'
    // },
    // {
    //   id: 'fairmont',
    //   name: 'Fairmont Hotels',
    //   logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    //   type: 'Luxury Partner'
    // },
    // {
    //   id: 'hemingways',
    //   name: 'Hemingways Collection',
    //   logo: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    //   type: 'Safari Partner'
    // },
    // {
    //   id: 'british-high',
    //   name: 'British High Commission',
    //   logo: 'https://images.pixabay.com/photo/2017/07/21/23/57/concert-2527495_960_720.jpg',
    //   type: 'Diplomatic Partner'
    // }
  ];

  const achievements = [
    {
      icon: 'Award',
      title: 'Excellence Award 2024',
      description: 'Kenya Tourism Board recognition for outstanding service'
    },
    {
      icon: 'Shield',
      title: 'ISO 9001 Certified',
      description: 'International quality management standards'
    },
    {
      icon: 'Users',
      title: '1000+ VIP Clients',
      description: 'Trusted by diplomats, executives, and celebrities'
    },
    {
      icon: 'Clock',
      title: '99% On-Time Rate',
      description: 'Consistently punctual service delivery'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6">
            Trusted & Certified
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence is recognized by leading industry bodies, government agencies, and luxury hospitality partners across Kenya.
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-heading text-xl font-semibold text-foreground mb-8 text-center">
            Licensed & Certified
          </h3>
          <div className="max-w-6xl w-full mx-auto flex flex-wrap justify-center items-center gap-10 px-4">
  {certifications?.map((cert, index) => (
    <motion.div
      key={cert?.id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-xl p-6 shadow-luxury hover:shadow-luxury-lg luxury-transition
                 flex flex-col justify-center items-center text-center"
    >
      <div className="relative w-16 h-16 mb-4 rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src={cert?.logo}
          alt={cert?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/10"></div>
      </div>

      <h4 className="font-medium text-foreground text-sm mb-2 leading-tight">
        {cert?.name}
      </h4>

      <p className="text-xs text-muted-foreground">
        {cert?.description}
      </p>
    </motion.div>
  ))}
</div>

        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* <h3 className="font-heading text-xl font-semibold text-foreground mb-8 text-center">
            Trusted Partners
          </h3> */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners?.map((partner, index) => (
              <motion.div
                key={partner?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center space-y-2"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-card border border-border shadow-luxury group-hover:shadow-luxury-lg luxury-transition">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-full h-full object-cover group-hover:scale-105 luxury-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-foreground">{partner?.name}</p>
                  <p className="text-xs text-muted-foreground">{partner?.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-xl font-semibold text-foreground mb-8 text-center">
            Recognition & Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements?.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 text-center shadow-luxury hover:shadow-luxury-lg luxury-transition"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Icon name={achievement?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {achievement?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {achievement?.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security & Insurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-card border border-border rounded-2xl p-8 md:p-12 shadow-luxury text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Shield" size={24} className="text-primary" />
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Security & Insurance
            </h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            All our vehicles are fully insured with comprehensive coverage. Our chauffeurs undergo thorough background checks and security training, ensuring your safety and peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              <span>KES 50M Insurance Coverage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              <span>Background Verified Drivers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              <span>GPS Tracking & Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              <span>24/7 Emergency Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;