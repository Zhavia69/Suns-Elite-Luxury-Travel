import React from 'react';
import ServiceCard from './ServiceCard';
import Icon from '../../../components/AppIcon';

const ServiceGrid = ({ services, onServiceSelect, currency, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/5"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="h-3 bg-muted rounded w-1/3"></div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (services?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          No Services Found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any services matching your criteria. Try adjusting your filters or search terms.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.location?.reload()}
            className="text-primary hover:text-primary/80 luxury-transition"
          >
            Clear all filters
          </button>
          <span className="text-muted-foreground hidden sm:inline">•</span>
          <button 
            onClick={() => console.log('Contact support')}
            className="text-primary hover:text-primary/80 luxury-transition"
          >
            Contact support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services?.map((service) => (
        <ServiceCard
          key={service?.id}
          service={service}
          onLearnMore={onServiceSelect}
          currency={currency}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;