import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedServices from './components/FeaturedServices';
import TestimonialsSlider from './components/TestimonialsSlider';
import FleetShowcase from './components/FleetShowcase';
import TrustSignals from './components/TrustSignals';
import { PhoneCall, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import SupportWidget from '../../components/ui/SupportWidget';
import BookingStatusIndicator from '../../components/ui/BookingStatusIndicator';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Suns Elite Luxury Travels Transportation Services in Kenya</title>
        <meta
          name="description"
          content="Premium airport transfers, executive rides, and safari gateways in Kenya. Professional chauffeurs, luxury vehicles, and 24/7 service for discerning travelers."
        />
        <meta
          name="keywords"
          content="luxury transport Kenya, airport transfer Nairobi, executive rides, safari transport, chauffeur service, premium vehicles"
        />
        <meta property="og:title" content="Sun's Travel - Luxury Transportation Services in Kenya" />
        <meta
          property="og:description"
          content="Experience premium transportation with our luxury fleet and professional chauffeurs across Kenya."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <HeroSection />
          <FeaturedServices />
          <TestimonialsSlider />
          <FleetShowcase />
          <TrustSignals />
        </main>

        {/* Fixed Position Widgets */}
        <SupportWidget />
        <BookingStatusIndicator />

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-2xl shadow-md">
                    <span className="text-primary-foreground font-extrabold text-xl">S</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold text-foreground tracking-wide">
                      Suns Elite Luxury Travels
                    </h3>
                    <p className="text-sm text-muted-foreground italic">Redefining Luxury Travel</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed max-w-lg">
                  Experience Kenya’s most refined transportation service from executive airport
                  transfers and corporate rides to bespoke safari getaways. We deliver seamless,
                  secure, and sophisticated travel experiences tailored for the discerning traveler.
                </p>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                  <div className="text-sm text-primary">
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <PhoneCall className="w-4 h-4 text-primary/90" />
                        <a
                          href="tel:+254743248996"
                          className="hover:text-primary/80 transition-colors"
                        >
                          +254 743 248 996
                        </a>
                      </li>
                      <li className="flex items-center space-x-2">
                        <PhoneCall className="w-4 h-4 text-primary/90" />
                        <a
                          href="tel:+254721363682"
                          className="hover:text-primary/80 transition-colors"
                        >
                          +254 721 363 682
                        </a>
                      </li>
                      <li className="flex items-center space-x-2">
                        <PhoneCall className="w-4 h-4 text-primary/90" />
                        <a
                          href="tel:+254117498441"
                          className="hover:text-primary/80 transition-colors"
                        >
                          +254 117 498 441
                        </a>
                      </li>
                    </ul>
                  </div>

                  <span className="hidden sm:block text-muted-foreground text-lg">|</span>

                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-primary/90" />
                    <a
                      href="mailto:sunsluxurytravels@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors text-sm"
                    >
                      sunsluxurytravels@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social Handles */}
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://facebook.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                  href="https://tiktok.com/@yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {/* TikTok SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M128,0C57.308,0,0,57.308,0,128s57.308,128,128,128s128-57.308,128-128S198.692,0,128,0z M171.793,139.034
                      c-14.453,0-27.67-7.285-35.631-18.52v58.982c0,16.209-13.152,29.361-29.361,29.361s-29.361-13.152-29.361-29.361
                      s13.152-29.361,29.361-29.361c5.573,0,10.757,1.587,15.199,4.334v-50.515c-4.442-2.748-9.626-4.334-15.199-4.334
                      c-24.064,0-43.614,19.55-43.614,43.614s19.55,43.614,43.614,43.614s43.614-19.55,43.614-43.614V128
                      C174.802,128.001,172.31,128.042,171.793,139.034z"/>
                      </svg>
                      
  </a>
</div>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/service-catalog" className="hover:text-foreground luxury-transition">
                      Airport Transfer
                    </a>
                  </li>
                  <li>
                    <a href="/service-catalog" className="hover:text-foreground luxury-transition">
                      Executive Rides
                    </a>
                  </li>
                  <li>
                    <a href="/service-catalog" className="hover:text-foreground luxury-transition">
                      Safari Gateway
                    </a>
                  </li>
                  <li>
                    <a href="/service-catalog" className="hover:text-foreground luxury-transition">
                      Corporate Transport
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/contact-support" className="hover:text-foreground luxury-transition">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground luxury-transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Sun's Travel. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-xs text-muted-foreground">Licensed by NTSA Kenya</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">ISO 9001 Certified</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
