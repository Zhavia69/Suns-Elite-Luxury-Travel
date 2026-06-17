import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedServices from './components/FeaturedServices';
import WhyChooseUs from './components/WhyChooseUs';
import FleetShowcase from './components/FleetShowcase';
import TestimonialsSlider from './components/TestimonialsSlider';
import TrustSignals from './components/TrustSignals';
import { PhoneCall, Mail, Instagram, Facebook } from 'lucide-react';

const LuxuryFooter = () => {
  const whatsapp = 'https://wa.me/254743248996?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Suns%20Elite%20Luxury%20Travels.';

  return (
    <footer className="bg-[#080808] border-t border-champagneGold/12 relative overflow-hidden">
      {/* ── Top Gold Divider ─────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-champagneGold/30 to-transparent" />

      {/* ── Subtle background texture ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

      <div className="luxury-container py-20 lg:py-28 relative z-10">
        {/* ── Main Footer Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 lg:mb-20">

          {/* ── Col 1: Brand ─────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Wordmark */}
            <div className="mb-6">
              <div className="font-display text-2xl font-light tracking-[0.06em] text-warmIvory mb-1">
                SUNS ELITE
              </div>
              <div className="text-[0.55rem] tracking-[0.28em] uppercase text-champagneGold/55 font-body">
                Luxury Travels · Kenya
              </div>
            </div>

            {/* Gold rule */}
            <div className="h-px w-12 bg-gradient-to-r from-champagneGold/60 to-transparent mb-6" />

            <p className="font-body text-sm text-warmIvory/40 leading-relaxed max-w-sm mb-8 text-pretty">
              Kenya's most distinguished travel concierge — crafting private journeys
              for the world's most discerning guests since 2014. From Nairobi to the Mara,
              in absolute comfort and discretion.
            </p>

            {/* Contact details */}
            <div className="space-y-3 mb-8">
              {[
                { href: 'tel:+254743248996', text: '+254 743 248 996' },
                { href: 'tel:+254721363682', text: '+254 721 363 682' },
                { href: 'tel:+254117498441', text: '+254 117 498 441' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 text-sm font-body text-warmIvory/40 hover:text-champagneGold/80 transition-colors duration-300"
                >
                  <PhoneCall size={13} strokeWidth={1.5} className="text-champagneGold/40 flex-shrink-0" />
                  {item.text}
                </a>
              ))}
              <a
                href="mailto:sunsluxurytravels@gmail.com"
                className="flex items-center gap-3 text-sm font-body text-warmIvory/40 hover:text-champagneGold/80 transition-colors duration-300"
              >
                <Mail size={13} strokeWidth={1.5} className="text-champagneGold/40 flex-shrink-0" />
                sunsluxurytravels@gmail.com
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                {
                  href: 'https://facebook.com',
                  label: 'Facebook',
                  icon: <Facebook size={16} strokeWidth={1.5} />,
                },
                {
                  href: 'https://instagram.com',
                  label: 'Instagram',
                  icon: <Instagram size={16} strokeWidth={1.5} />,
                },
                {
                  href: whatsapp,
                  label: 'WhatsApp',
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-champagneGold/15 flex items-center justify-center text-warmIvory/40 hover:text-champagneGold/80 hover:border-champagneGold/40 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Experiences ───────────────────────── */}
          <div>
            <h4 className="text-[0.6rem] tracking-[0.22em] uppercase text-champagneGold/50 font-body mb-6">
              Experiences
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'Seamless Arrivals',    href: '/service-catalog' },
                { label: 'Into the Wild',         href: '/service-catalog' },
                { label: 'At Your Command',       href: '/service-catalog' },
                { label: 'The Executive Standard',href: '/service-catalog' },
                { label: 'VIP Transport',          href: '/service-catalog' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-body text-warmIvory/40 hover:text-warmIvory/80 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Destinations + Company ───────────── */}
          <div>
            <h4 className="text-[0.6rem] tracking-[0.22em] uppercase text-champagneGold/50 font-body mb-6">
              Destinations
            </h4>
            <ul className="space-y-3.5 mb-10">
              {['Maasai Mara', 'Amboseli', 'Nairobi CBD', 'Diani Beach', 'Samburu', 'Lake Nakuru'].map((d) => (
                <li key={d}>
                  <span className="text-sm font-body text-warmIvory/35">{d}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-[0.6rem] tracking-[0.22em] uppercase text-champagneGold/50 font-body mb-6">
              Company
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'Contact Us',     href: '/contact-support' },
                { label: 'Our Fleet',      href: '/fleet-showcase' },
                { label: 'Book a Journey', href: '/booking-lookup' },
                { label: 'Privacy Policy', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-body text-warmIvory/40 hover:text-warmIvory/80 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Footer Bottom ────────────────────────────────── */}
        <div className="pt-8 border-t border-champagneGold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.65rem] text-warmIvory/25 font-body tracking-wide">
            © {new Date().getFullYear()} Suns Elite Luxury Travels. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {['NTSA Licensed', 'ISO 9001 Certified', 'Fully Insured'].map((cert, i) => (
              <React.Fragment key={cert}>
                {i > 0 && <span className="text-champagneGold/20 text-xs">·</span>}
                <span className="text-[0.6rem] tracking-[0.15em] uppercase text-warmIvory/25 font-body">
                  {cert}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Suns Elite Luxury Travels — Kenya's Premier Private Concierge & Safari Transfer Service</title>
        <meta
          name="description"
          content="Kenya's most distinguished travel concierge. Private airport transfers, safari gateway journeys, executive chauffeur services, and corporate transport — crafted for discerning travellers since 2014."
        />
        <meta
          name="keywords"
          content="luxury travel Kenya, private airport transfer Nairobi, safari transfer Maasai Mara, executive chauffeur service, VIP transport Kenya, corporate transportation Nairobi, luxury concierge Kenya"
        />
        <meta property="og:title" content="Suns Elite Luxury Travels — Kenya's Premier Private Concierge" />
        <meta
          property="og:description"
          content="Private journeys crafted for the world's most discerning travellers. From Nairobi to the Mara — in absolute comfort and discretion."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=85&w=1200" />
        <link rel="canonical" href="/" />
        <meta name="theme-color" content="#0A0A0A" />
      </Helmet>

      <div className="min-h-dvh bg-[#0A0A0A]">
        <Header />

        <main id="main-content">
          {/* 1. Hero + Booking Panel */}
          <HeroSection />

          {/* 2. Signature Experiences */}
          <FeaturedServices />

          {/* 3. Why Choose Us */}
          <WhyChooseUs />

          {/* 4. Fleet */}
          <FleetShowcase />

          {/* 5. Testimonials */}
          <TestimonialsSlider />

          {/* 6. Destinations + Concierge CTA */}
          <TrustSignals />
        </main>

        <LuxuryFooter />
      </div>
    </>
  );
};

export default Homepage;
