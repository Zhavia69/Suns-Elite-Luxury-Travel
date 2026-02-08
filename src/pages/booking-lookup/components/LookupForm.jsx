import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LookupForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    referenceNumber: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
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
    
    if (!formData?.referenceNumber) {
      newErrors.referenceNumber = 'Booking reference number is required';
    } else if (formData?.referenceNumber?.length < 6) {
      newErrors.referenceNumber = 'Reference number must be at least 6 characters';
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
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
            <Icon name="Search" size={24} className="text-primary" />
          </div>
          <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
            Find Your Booking
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your email and booking reference to access your reservation details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Booking Reference"
            type="text"
            placeholder="ST240818001"
            description="Format: ST + Date + Sequence (e.g., ST240818001)"
            value={formData?.referenceNumber}
            onChange={(e) => handleInputChange('referenceNumber', e?.target?.value?.toUpperCase())}
            error={errors?.referenceNumber}
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="ArrowRight"
            iconPosition="right"
          >
            {isLoading ? 'Searching...' : 'Find Booking'}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-3">
            Don't have your reference number?
          </p>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="Mail"
            iconPosition="left"
            onClick={() => console.log('Alternative lookup method')}
          >
            Search by Email & Travel Date
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LookupForm;