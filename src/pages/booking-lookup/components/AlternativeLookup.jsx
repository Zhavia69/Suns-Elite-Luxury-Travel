import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AlternativeLookup = ({ onSubmit, onBackToMain, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    travelDate: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.travelDate) {
      newErrors.travelDate = 'Travel date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-luxury p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-lg mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-warning" />
          </div>
          <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
            Alternative Lookup
          </h2>
          <p className="text-sm text-muted-foreground">
            Can't find your reference number? Search using your booking details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            description="Email used when making the booking"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Travel Date"
            type="date"
            description="Date of your scheduled trip"
            value={formData?.travelDate}
            onChange={(e) => handleInputChange('travelDate', e?.target?.value)}
            error={errors?.travelDate}
            required
            disabled={isLoading}
            min={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]}
            max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]}
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            placeholder="+254 700 000 000"
            description="Phone number used for booking (helps narrow search)"
            value={formData?.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
            disabled={isLoading}
          />

          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                We'll search for bookings matching your details and send access links 
                for any matches found to your email address.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="Search"
            iconPosition="right"
          >
            {isLoading ? 'Searching...' : 'Search Bookings'}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onBackToMain}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Reference Lookup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlternativeLookup;