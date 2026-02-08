import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onLearnMore, currency = 'KES' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    const symbol = currency === 'USD' ? '$' : 'KSh';
    const formattedPrice = currency === 'USD' 
      ? (price / 130)?.toFixed(0) 
      : price?.toLocaleString();
    return `${symbol}${formattedPrice}`;
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg overflow-hidden shadow-luxury luxury-transition hover:shadow-luxury-lg ${
        isHovered ? 'border-primary/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service?.image}
          alt={service?.name}
          className="w-full h-full object-cover luxury-transition hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            {service?.category}
          </div>
        </div>
        {service?.isPopular && (
          <div className="absolute top-3 left-3">
            <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>Popular</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {service?.name}
          </h3>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="font-semibold text-primary text-lg">
              {formatPrice(service?.startingPrice)}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {service?.description}
        </p>

        <div className="space-y-2 mb-4">
          {service?.keyFeatures?.slice(0, 3)?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{service?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{service?.capacity}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLearnMore(service)}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;