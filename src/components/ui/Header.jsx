import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Contact Us', path: '/contact-support', icon: 'Phone' },
  ];

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 150], [0, 0.95]);
  const bgColor = useTransform(scrollY, [0, 150], ['rgba(0,0,0,0)', 'rgba(17,34,64,0.95)']);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 150);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const isActivePath = (path) => path === location.pathname;

  const handleScroll = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-18 items-center">
          {/* Logo */}
          <Link
            to="/homepage"
            className="flex flex-col transition-all duration-500 ease-in-out group"
          >
            <span className="font-display text-2xl text-softWhite group-hover:text-gray-200">
              Suns Elite Luxury Travels
            </span>
            <span className="text-sm text-neutralGray uppercase tracking-widest group-hover:text-gray-400">
              Luxury Concierge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-auto">
            {navigationItems.map((item) =>
              item.path.startsWith('#') ? (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleScroll(e, item.path)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutralGray hover:text-softWhite hover:bg-neutralGray/10 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'text-gold bg-gold/10'
                      : 'text-neutralGray hover:text-softWhite hover:bg-neutralGray/10'
                  }`}
                >
                  {item.icon && <Icon name={item.icon} size={16} />}
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
