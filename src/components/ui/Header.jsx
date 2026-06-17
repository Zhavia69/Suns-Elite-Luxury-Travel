import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navigationItems = [
  { label: 'Home',         path: '/homepage' },
  { label: 'Services',     path: '/service-catalog' },
  { label: 'Our Fleet',    path: '/fleet-showcase' },
  { label: 'Contact',      path: '/contact-support' },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll position
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path) =>
    location.pathname === path || location.pathname === '/' && path === '/homepage';

  const whatsappUrl = 'https://wa.me/254743248996?text=Hello%2C%20I%20would%20like%20to%20reserve%20a%20journey%20with%20Suns%20Elite%20Luxury%20Travels.';

  return (
    <>
      {/* ── Main Header ─────────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-solid"
        animate={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0)',
          borderBottomColor: scrolled ? 'rgba(200,169,107,0.15)' : 'rgba(200,169,107,0)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="luxury-container">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* ── Wordmark Logo ──────────────────────────────────── */}
            <Link
              to="/homepage"
              className="flex flex-col group select-none"
              aria-label="Suns Elite Luxury Travels — Home"
            >
              <motion.span
                className="font-display text-xl lg:text-2xl font-light tracking-[0.08em] text-warmIvory group-hover:text-champagneGold transition-colors duration-400"
                style={{ letterSpacing: '0.06em' }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                SUNS ELITE
              </motion.span>
              <motion.span
                className="text-[0.55rem] tracking-[0.28em] uppercase text-champagneGold/70 font-body font-medium mt-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Luxury Travels · Kenya
              </motion.span>
            </Link>

            {/* ── Desktop Navigation ──────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-10"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.path}
                    className={`relative text-[0.75rem] font-body font-500 tracking-[0.12em] uppercase transition-colors duration-300 pb-1 group
                      ${isActive(item.path) ? 'text-champagneGold' : 'text-warmIvory/75 hover:text-warmIvory'}`}
                  >
                    {item.label}
                    {/* Animated gold underline */}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-champagneGold transition-all duration-300 ease-luxury
                        ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* ── Desktop CTA ──────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+254743248996"
                className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-champagneGold/70 hover:text-champagneGold transition-colors duration-300 font-body"
                aria-label="Call us"
              >
                <Phone size={13} strokeWidth={1.5} />
                <span>+254 743 248 996</span>
              </a>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-primary text-[0.7rem] py-3 px-6"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ 
                  opacity: scrolled ? 1 : 0, 
                  x: scrolled ? 0 : 16,
                  pointerEvents: scrolled ? 'auto' : 'none'
                }}
                transition={{ duration: 0.4 }}
                aria-label="Reserve your journey via WhatsApp"
              >
                Book Now
              </motion.a>
            </div>

            {/* ── Mobile Menu Toggle ───────────────────────────────── */}
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 text-warmIvory hover:text-champagneGold transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Drawer ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-4/5 max-w-sm bg-[#0A0A0A] border-l border-champagneGold/20 lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-8 py-7 border-b border-champagneGold/15">
                <div className="flex flex-col">
                  <span className="font-display text-lg font-light tracking-[0.06em] text-warmIvory">
                    SUNS ELITE
                  </span>
                  <span className="text-[0.5rem] tracking-[0.25em] uppercase text-champagneGold/60 font-body mt-0.5">
                    Luxury Travels
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 text-warmIvory/60 hover:text-champagneGold transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="flex-1 px-8 py-10 flex flex-col gap-1" aria-label="Mobile navigation">
                {navigationItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.path}
                      className={`block py-4 text-xl font-display font-light border-b border-champagneGold/10 transition-colors duration-300
                        ${isActive(item.path) ? 'text-champagneGold' : 'text-warmIvory/75 hover:text-warmIvory'}`}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <span className="ml-3 text-xs text-champagneGold/60 font-body tracking-widest">—</span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="px-8 pb-10 flex flex-col gap-4">
                <a
                  href="tel:+254743248996"
                  className="flex items-center gap-3 text-sm text-warmIvory/60 hover:text-champagneGold transition-colors font-body"
                >
                  <Phone size={16} strokeWidth={1.5} />
                  <span>+254 743 248 996</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary w-full justify-center text-xs py-4"
                >
                  Reserve Your Journey
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── WhatsApp Floating Button ──────────────────────────────── */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3.5 whatsapp-green text-white rounded-full shadow-luxury-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-pulse-gold opacity-60 pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-xs font-body font-600 tracking-wide whitespace-nowrap">
          Chat with Us
        </span>
      </motion.a>
    </>
  );
};

export default Header;
