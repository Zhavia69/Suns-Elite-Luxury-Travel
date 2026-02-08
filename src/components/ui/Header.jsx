import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [currency, setCurrency] = useState('KES');
  const location = useLocation();

  // Navigation items including anchor links for scrolling
  const navigationItems = [
    { label: 'Home', path:  '/homepage', icon: 'Home' },
   
    { label: 'Contact Us', path: '/contact-support', icon: 'Phone' }, // external page
  ];
  

  const isActivePath = (path) => {
    // Mark active only for external page, not anchors
    if (path === '/contact-support') {
      return location?.pathname === '/contact-support';
    }
    return false;
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency');
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  // Smooth scroll handler for anchor links
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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-18 items-center">
          {/* Logo */}
          <Link
            to="/homepage"
            className="flex flex-col transition-all duration-500 ease-in-out group"
          >
            <span className="font-serif font-semibold text-2xl text-white group-hover:text-gray-200">
              Suns Elite Luxury Travels
            </span>
            <span className="text-sm text-gray-300 uppercase tracking-widest group-hover:text-gray-400">
              Luxury Concierge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-auto">
            {navigationItems?.map((item) => (
              item.path.startsWith('#') ? (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleScroll(e, item.path)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium luxury-transition ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.icon && <Icon name={item.icon} size={16} />}
                  <span>{item.label}</span>
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
