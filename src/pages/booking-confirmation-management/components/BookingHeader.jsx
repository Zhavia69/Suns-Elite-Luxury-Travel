import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingHeader = ({ bookingReference, confirmationDate, status = 'confirmed' }) => {
  const statusConfig = {
    confirmed: { 
      icon: 'CheckCircle', 
      color: 'text-success', 
      bg: 'bg-success/10',
      message: 'Booking Confirmed Successfully!'
    },
    driver_assigned: { 
      icon: 'User', 
      color: 'text-primary', 
      bg: 'bg-primary/10',
      message: 'Driver Assigned'
    },
    in_progress: { 
      icon: 'MapPin', 
      color: 'text-warning', 
      bg: 'bg-warning/10',
      message: 'Trip in Progress'
    },
    completed: { 
      icon: 'CheckCircle2', 
      color: 'text-success', 
      bg: 'bg-success/10',
      message: 'Trip Completed'
    }
  };

  const currentStatus = statusConfig?.[status] || statusConfig?.confirmed;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${currentStatus?.bg}`}>
            <Icon name={currentStatus?.icon} size={24} className={currentStatus?.color} />
          </div>
          <div>
            <h1 className="font-heading font-semibold text-2xl text-foreground">
              {currentStatus?.message}
            </h1>
            <p className="text-muted-foreground text-sm">
              Your luxury transportation is ready
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Booking Reference</p>
          <p className="font-mono font-semibold text-lg text-primary">
            #{bookingReference}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Confirmed on {confirmationDate}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span>Fully Insured</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;