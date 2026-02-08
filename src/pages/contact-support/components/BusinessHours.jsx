import React from 'react';
import Icon from '../../../components/AppIcon';

const BusinessHours = () => {
  const businessHours = [
    { day: 'Monday - Friday', hours: '6:00 AM - 11:00 PM', status: 'Full Service' },
    { day: 'Saturday', hours: '7:00 AM - 11:00 PM', status: 'Full Service' },
    { day: 'Sunday', hours: '8:00 AM - 10:00 PM', status: 'Limited Support' },
    { day: 'Public Holidays', hours: '8:00 AM - 8:00 PM', status: 'Holiday Schedule' }
  ];

  const currentDay = new Date()?.getDay();
  const currentHour = new Date()?.getHours();
  
  const isBusinessHours = () => {
    if (currentDay >= 1 && currentDay <= 5) { // Monday-Friday
      return currentHour >= 6 && currentHour < 23;
    } else if (currentDay === 6) { // Saturday
      return currentHour >= 7 && currentHour < 23;
    } else { // Sunday
      return currentHour >= 8 && currentHour < 22;
    }
  };

  const currentStatus = isBusinessHours();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Clock" size={24} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg">Business Hours</h3>
      </div>
      <div className={`flex items-center space-x-2 mb-4 px-3 py-2 rounded-lg ${
        currentStatus ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
      }`}>
        <div className={`w-2 h-2 rounded-full ${currentStatus ? 'bg-success' : 'bg-warning'}`} />
        <span className="font-medium">
          {currentStatus ? 'Currently Open' : 'Currently Closed'}
        </span>
      </div>
      <div className="space-y-3">
        {businessHours?.map((schedule, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
            <div>
              <span className="font-medium text-foreground">{schedule?.day}</span>
              <span className="text-sm text-muted-foreground ml-2">({schedule?.status})</span>
            </div>
            <span className="text-muted-foreground">{schedule?.hours}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Service Availability:</p>
            <ul className="space-y-1">
              <li>• Booking services: Available 24/7 online</li>
              <li>• Customer support: During business hours</li>
              <li>• Emergency assistance: Available 24/7</li>
              <li>• Vehicle operations: 24/7 with advance booking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHours;