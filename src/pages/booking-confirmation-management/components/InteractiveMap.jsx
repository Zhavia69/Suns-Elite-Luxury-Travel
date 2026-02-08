import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveMap = ({ pickup, destination, route }) => {
  const [mapView, setMapView] = useState('route');

  // Mock coordinates for demonstration
  const pickupCoords = pickup?.coordinates || { lat: -1.2921, lng: 36.8219 }; // Nairobi
  const destinationCoords = destination?.coordinates || { lat: -1.3197, lng: 36.8258 }; // JKIA

  const mapViews = [
    { id: 'route', label: 'Route View', icon: 'Route' },
    { id: 'pickup', label: 'Pickup', icon: 'MapPin' },
    { id: 'destination', label: 'Destination', icon: 'Flag' }
  ];

  const getMapSrc = () => {
    switch (mapView) {
      case 'pickup':
        return `https://www.google.com/maps?q=${pickupCoords?.lat},${pickupCoords?.lng}&z=16&output=embed`;
      case 'destination':
        return `https://www.google.com/maps?q=${destinationCoords?.lat},${destinationCoords?.lng}&z=16&output=embed`;
      default:
        return `https://www.google.com/maps/embed/v1/directions?key=demo&origin=${pickupCoords?.lat},${pickupCoords?.lng}&destination=${destinationCoords?.lat},${destinationCoords?.lng}&mode=driving`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-lg text-foreground">Route Map</h3>
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {mapViews?.map((view) => (
              <button
                key={view?.id}
                onClick={() => setMapView(view?.id)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium luxury-transition ${
                  mapView === view?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={view?.icon} size={12} />
                <span>{view?.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Distance</p>
            <p className="font-semibold text-foreground">{route?.distance}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Duration</p>
            <p className="font-semibold text-foreground">{route?.duration}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Traffic</p>
            <p className="font-semibold text-success">Light</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-video bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Trip Route Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapSrc()}
            className="border-0"
          />
        </div>
        
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-luxury">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs font-medium text-foreground">Pickup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs font-medium text-foreground">Destination</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={16} className="text-primary" />
            <span className="text-muted-foreground">Optimal route selected</span>
          </div>
          <button className="text-primary hover:text-primary/80 luxury-transition font-medium">
            View in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;