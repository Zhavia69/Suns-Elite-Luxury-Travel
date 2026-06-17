import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function MobileBookingBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBook = () => {
    if (window.location.pathname === "/") {
      document.getElementById('booking-panel')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = "/#reserve";
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+254743248996";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-champagneGold/20 px-4 py-3 pb-8"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="flex items-center gap-3 max-w-sm mx-auto">
            <button
              onClick={handleCall}
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-sm bg-champagneGold/10 text-champagneGold border border-champagneGold/30"
              aria-label="Call Concierge"
            >
              <Phone size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleBook}
              className="flex-1 btn-luxury-primary py-3 text-xs flex items-center justify-center gap-2"
            >
              Reserve Journey
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
