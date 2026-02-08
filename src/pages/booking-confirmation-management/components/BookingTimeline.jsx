import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingTimeline = ({ currentStep = 1, driverInfo = null }) => {
  const timelineSteps = [
    {
      id: 1,
      title: 'Booking Confirmed',
      description: 'Your reservation has been confirmed',
      icon: 'CheckCircle',
      timestamp: '18 Aug 2025, 17:00',
      completed: true
    },
    {
      id: 2,
      title: 'Driver Assigned',
      description: driverInfo ? `${driverInfo?.name} will be your chauffeur` : 'Professional driver being assigned',
      icon: 'User',
      timestamp: driverInfo ? '18 Aug 2025, 17:15' : 'Pending',
      completed: currentStep >= 2
    },
    {
      id: 3,
      title: 'Vehicle Dispatched',
      description: 'Your luxury vehicle is en route',
      icon: 'Car',
      timestamp: currentStep >= 3 ? '18 Aug 2025, 18:30' : 'Scheduled',
      completed: currentStep >= 3
    },
    {
      id: 4,
      title: 'Trip Completed',
      description: 'Safe arrival at destination',
      icon: 'MapPin',
      timestamp: currentStep >= 4 ? '18 Aug 2025, 19:45' : 'Pending',
      completed: currentStep >= 4
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Clock" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-foreground">Booking Status</h3>
      </div>
      <div className="space-y-6">
        {timelineSteps?.map((step, index) => (
          <div key={step?.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 luxury-transition ${
                step?.completed 
                  ? 'bg-success border-success text-success-foreground' 
                  : currentStep === step?.id
                  ? 'bg-primary border-primary text-primary-foreground animate-pulse'
                  : 'bg-muted border-border text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={16} />
              </div>
              {index < timelineSteps?.length - 1 && (
                <div className={`w-0.5 h-8 mt-2 ${
                  step?.completed ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
            
            <div className="flex-1 pb-6">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-semibold ${
                  step?.completed ? 'text-foreground' : 
                  currentStep === step?.id ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </h4>
                <span className="text-xs text-muted-foreground font-mono">
                  {step?.timestamp}
                </span>
              </div>
              <p className={`text-sm ${
                step?.completed ? 'text-muted-foreground' : 
                currentStep === step?.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step?.description}
              </p>
              
              {step?.id === 2 && driverInfo && step?.completed && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{driverInfo?.name}</p>
                      <p className="text-sm text-muted-foreground">{driverInfo?.vehicle} • {driverInfo?.rating} ⭐</p>
                      <p className="text-sm text-muted-foreground">{driverInfo?.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {currentStep < 4 && (
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-primary" />
            <p className="text-sm text-foreground">
              Real-time updates will appear here as your booking progresses
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTimeline;