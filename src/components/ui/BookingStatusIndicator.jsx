import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const BookingStatusIndicator = ({ bookingId = null, currentStep = 0, totalSteps = 4 }) => {
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [isVisible, setIsVisible] = useState(false);

  const bookingSteps = [
    { label: 'Service Selection', icon: 'Car' },
    { label: 'Details & Timing', icon: 'Calendar' },
    { label: 'Payment', icon: 'CreditCard' },
    { label: 'Confirmation', icon: 'CheckCircle' }
  ];

  const statusConfig = {
    idle: { color: 'text-muted-foreground', bg: 'bg-muted' },
    active: { color: 'text-primary', bg: 'bg-primary/10' },
    processing: { color: 'text-warning', bg: 'bg-warning/10' },
    completed: { color: 'text-success', bg: 'bg-success/10' },
    error: { color: 'text-error', bg: 'bg-error/10' }
  };

  useEffect(() => {
    // Show indicator when booking is in progress
    setIsVisible(bookingId !== null || currentStep > 0);
  }, [bookingId, currentStep]);

  useEffect(() => {
    // Simulate real-time booking status updates
    if (bookingId) {
      const interval = setInterval(() => {
        const statuses = ['pending', 'processing', 'completed', 'failed'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setPaymentStatus(randomStatus);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [bookingId]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-30 bg-card border border-border rounded-lg shadow-luxury p-4 w-80 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <h4 className="font-heading font-semibold text-sm">Booking Progress</h4>
        </div>
        {bookingId && (
          <span className="text-xs font-mono text-muted-foreground">
            #{bookingId}
          </span>
        )}
      </div>

      {/* Progress Steps */}
      <div className="space-y-3">
        {bookingSteps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const status = isCompleted ? 'completed' : isCurrent ? 'active' : 'idle';
          const config = statusConfig[status];

          return (
            <div key={index} className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${config.bg}`}>
                <Icon 
                  name={isCompleted ? "Check" : step.icon} 
                  size={16} 
                  className={config.color}
                />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${config.color}`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-muted-foreground">
                    In progress...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Status */}
      {bookingId && paymentStatus !== 'pending' && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon 
              name={
                paymentStatus === 'completed'
                  ? "CheckCircle"
                  : paymentStatus === 'failed'
                  ? "XCircle"
                  : "Clock"
              }
              size={16}
              className={
                paymentStatus === 'completed'
                  ? 'text-success'
                  : paymentStatus === 'failed'
                  ? 'text-error'
                  : 'text-warning'
              }
            />
            <span className="text-sm font-medium">
              Payment {paymentStatus === 'processing' ? 'Processing' : paymentStatus}
            </span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button 
          className="flex-1 text-xs text-primary hover:text-primary/80 luxury-transition"
          onClick={() => console.log('View booking details')}
        >
          View Details
        </button>
        <button 
          className="flex-1 text-xs text-muted-foreground hover:text-foreground luxury-transition"
          onClick={() => setIsVisible(false)}
        >
          Minimize
        </button>
      </div>
    </div>
  );
};

export default BookingStatusIndicator;
