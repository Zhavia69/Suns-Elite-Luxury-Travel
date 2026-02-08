import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const SupportWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const supportOptions = [
    {
      label: 'WhatsApp Chat',
      icon: 'MessageCircle',
      action: () => {
        window.open('https://wa.me/254743248996?text=Hello, I need assistance with my booking', '_blank');
      }
    },
    {
      label: 'Call Support',
      icon: 'Phone',
      action: () => {
        window.location.href = 'tel:+254743248996';
      }
    },
    {
      label: 'Email Us',
      icon: 'Mail',
      action: () => {
        window.location.href = 'mailto:support@sunstravel.co.ke';
      }
    },
    {
      label: 'Emergency Line',
      icon: 'AlertCircle',
      action: () => {
        window.location.href = 'tel:+254743248996';
      }
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Support Menu */}
      {isExpanded && (
        <div className="mb-4 bg-card border border-border rounded-lg shadow-luxury-lg p-4 w-64 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-semibold text-sm">Need Help?</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
          
          <div className="space-y-2">
            {supportOptions?.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={option?.action}
                className="w-full justify-start text-left hover:bg-muted/50"
              >
                <Icon name={option?.icon} size={16} className="mr-2" />
                {option?.label}
              </Button>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Available 24/7 for your convenience
            </p>
          </div>
        </div>
      )}
      {/* Support Toggle Button */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-14 w-14 rounded-full shadow-luxury-lg hover:scale-105 luxury-transition"
      >
        <Icon name={isExpanded ? "X" : "Headphones"} size={24} />
      </Button>
      {/* Minimize Widget Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -left-2 h-6 w-6 bg-muted hover:bg-muted-foreground/20 rounded-full"
      >
        <Icon name="Minus" size={12} />
      </Button>
    </div>
  );
};

export default SupportWidget;