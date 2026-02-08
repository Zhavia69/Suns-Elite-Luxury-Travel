import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import Icon from '../AppIcon';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const QuickBookingWidget = ({ className = '', variant = 'default' }) => {
  const [bookingData, setBookingData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    serviceType: '',
    pickupCoords: null,
    destinationCoords: null
  });

  const serviceOptions = [
    { value: 'executive', label: 'Executive Sedan' },
    { value: 'luxury-suv', label: 'Luxury SUV' },
    { value: 'premium-van', label: 'Premium Van' },
    { value: 'airport-transfer', label: 'Airport Transfer' }
  ];

  const passengerOptions = [
    { value: '1', label: '1 Passenger' },
    { value: '2', label: '2 Passengers' },
    { value: '3', label: '3 Passengers' },
    { value: '4', label: '4 Passengers' },
    { value: '5+', label: '5+ Passengers' }
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));

    // If field is pickup or destination, fetch coordinates from Google Geocoding API
    if (field === 'pickup' || field === 'destination') {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          value
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      )
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results[0]) {
            const coords = data.results[0].geometry.location;
            setBookingData(prev => ({
              ...prev,
              [`${field}Coords`]: coords
            }));
          }
        })
        .catch(err => console.error('Geocoding error:', err));
    }
  };

  const handleQuickQuote = () => {
    console.log('Quick quote requested:', bookingData);
    // Integration with booking system
  };

  const isCompact = variant === 'compact';

  return (
    <div className={`bg-card border border-border rounded-lg shadow-luxury p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg">Quick Booking</h3>
      </div>
      <div className={`grid gap-4 ${isCompact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        <Input
          label="Pickup Location"
          type="text"
          placeholder="Enter pickup address"
          value={bookingData?.pickup}
          onChange={(e) => handleInputChange('pickup', e?.target?.value)}
          className="w-full"
        />

        <Input
          label="Destination"
          type="text"
          placeholder="Enter destination"
          value={bookingData?.destination}
          onChange={(e) => handleInputChange('destination', e?.target?.value)}
          className="w-full"
        />

        <div className={isCompact ? 'col-span-1 sm:col-span-2' : 'col-span-1'}>
          <Select
            label="Service Type"
            placeholder="Select service"
            options={serviceOptions}
            value={bookingData?.serviceType}
            onChange={(value) => handleInputChange('serviceType', value)}
          />
        </div>

        <Input
          label="Date"
          type="date"
          value={bookingData?.date}
          onChange={(e) => handleInputChange('date', e?.target?.value)}
          className="w-full"
        />

        <Input
          label="Time"
          type="time"
          value={bookingData?.time}
          onChange={(e) => handleInputChange('time', e?.target?.value)}
          className="w-full"
        />

        <Select
          label="Passengers"
          options={passengerOptions}
          value={bookingData?.passengers}
          onChange={(value) => handleInputChange('passengers', value)}
        />
      </div>

      {/* Map Section */}
      <div className="mt-6 h-64 w-full">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={bookingData.pickupCoords || { lat: -1.2921, lng: 36.8219 }} // Default: Nairobi
            zoom={bookingData.pickupCoords || bookingData.destinationCoords ? 13 : 10}
          >
            {bookingData.pickupCoords && (
              <Marker position={bookingData.pickupCoords} label="Pickup" />
            )}
            {bookingData.destinationCoords && (
              <Marker position={bookingData.destinationCoords} label="Destination" />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleQuickQuote}
          iconName="Calculator"
          iconPosition="left"
        >
          Get Quote
        </Button>
        <Button
          variant="default"
          className="flex-1"
          onClick={() => console.log('Proceed to booking')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Book Now
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Instant quotes • Secure booking • 24/7 support
      </p>
    </div>
  );
};

export default QuickBookingWidget;
