import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TripDetails = ({ tripData }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime)?.toLocaleString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sections = [
    {
      id: 'service',
      title: 'Service Details',
      icon: 'Car',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image 
              src={tripData?.vehicle?.image} 
              alt={tripData?.vehicle?.name}
              className="w-20 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-semibold text-foreground">{tripData?.vehicle?.name}</h4>
              <p className="text-sm text-muted-foreground">{tripData?.vehicle?.category}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-muted-foreground flex items-center">
                  <Icon name="Users" size={12} className="mr-1" />
                  {tripData?.vehicle?.capacity} passengers
                </span>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Icon name="Briefcase" size={12} className="mr-1" />
                  {tripData?.vehicle?.luggage} luggage
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Service Type</p>
              <p className="font-medium text-foreground">{tripData?.serviceType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium text-foreground">{tripData?.estimatedDuration}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'route',
      title: 'Route Information',
      icon: 'MapPin',
      content: (
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <div className="w-0.5 h-8 bg-border"></div>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
            <div className="space-y-6 flex-1">
              <div>
                <p className="text-xs text-muted-foreground">PICKUP</p>
                <p className="font-medium text-foreground">{tripData?.pickup?.address}</p>
                <p className="text-sm text-muted-foreground">{formatDateTime(tripData?.pickup?.dateTime)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">DESTINATION</p>
                <p className="font-medium text-foreground">{tripData?.destination?.address}</p>
                <p className="text-sm text-muted-foreground">ETA: {tripData?.destination?.eta}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-border">
            <div>
              <p className="text-muted-foreground">Distance</p>
              <p className="font-medium text-foreground">{tripData?.route?.distance}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Route</p>
              <p className="font-medium text-foreground">{tripData?.route?.type}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'passenger',
      title: 'Passenger Information',
      icon: 'User',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm">Primary Contact</p>
              <p className="font-medium text-foreground">{tripData?.passenger?.name}</p>
              <p className="text-sm text-muted-foreground">{tripData?.passenger?.email}</p>
              <p className="text-sm text-muted-foreground">{tripData?.passenger?.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Passenger Count</p>
              <p className="font-medium text-foreground">{tripData?.passenger?.count} passengers</p>
              {tripData?.passenger?.specialRequests && (
                <>
                  <p className="text-muted-foreground text-sm mt-2">Special Requests</p>
                  <p className="text-sm text-foreground">{tripData?.passenger?.specialRequests}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'addons',
      title: 'Add-on Services',
      icon: 'Plus',
      content: (
        <div className="space-y-3">
          {tripData?.addons?.length > 0 ? (
            tripData?.addons?.map((addon, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <Icon name={addon?.icon} size={16} className="text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{addon?.name}</p>
                    <p className="text-sm text-muted-foreground">{addon?.description}</p>
                  </div>
                </div>
                <p className="font-medium text-foreground">{addon?.price}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No additional services selected</p>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="font-heading font-semibold text-xl text-foreground">Trip Details</h2>
        <p className="text-muted-foreground text-sm">Complete information about your booking</p>
      </div>
      <div className="divide-y divide-border">
        {sections?.map((section) => (
          <div key={section?.id} className="p-6">
            <button
              onClick={() => toggleSection(section?.id)}
              className="flex items-center justify-between w-full text-left luxury-transition hover:text-primary"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section?.icon} size={20} className="text-primary" />
                <h3 className="font-semibold text-foreground">{section?.title}</h3>
              </div>
              <Icon 
                name={expandedSection === section?.id ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>
            
            {(expandedSection === section?.id || expandedSection === null) && (
              <div className="mt-4">
                {section?.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripDetails;