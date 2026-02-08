import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceModal = ({ service, isOpen, onClose, currency = 'KES' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingOptions, setShowBookingOptions] = useState(false);

  if (!isOpen || !service) return null;

  const formatPrice = (price) => {
    const symbol = currency === 'USD' ? '$' : 'KSh';
    const formattedPrice =
      currency === 'USD' ? (price / 130)?.toFixed(0) : price?.toLocaleString();
    return `${symbol}${formattedPrice}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === service?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? service?.gallery?.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-luxury-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-foreground">
              {service?.name}
            </h2>
            <p className="text-muted-foreground">{service?.category}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg">
              <Image
                src={service?.gallery?.[currentImageIndex]}
                alt={`${service?.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {service?.gallery?.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                    onClick={prevImage}
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                    onClick={nextImage}
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {service?.gallery?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {service?.gallery?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 luxury-transition ${
                      index === currentImageIndex
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service?.fullDescription}
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">
                Pricing Structure
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Rate</span>
                  <span className="font-medium">
                    {formatPrice(service?.startingPrice)}
                  </span>
                </div>
                {service?.pricingDetails?.map((detail, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{detail?.label}</span>
                    <span className="font-medium">
                      {formatPrice(detail?.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Included Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service?.keyFeatures?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Options */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Available Vehicles
              </h4>
              <div className="space-y-2">
                {service?.vehicleOptions?.map((vehicle, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Car" size={16} className="text-primary" />
                      <div>
                        <p className="font-medium text-sm">{vehicle?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {vehicle?.capacity}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(vehicle?.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="default"
                className="flex-1"
                onClick={() => setShowBookingOptions(true)}
              >
                <Icon name="Calendar" size={16} />
                <span className="ml-2">Book Now</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Booking Options Modal */}
        {showBookingOptions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-card rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
              <h3 className="text-lg font-semibold mb-4">
                How would you like to proceed?
              </h3>
              <div className="flex flex-col gap-3">
                <Button
                  variant="default"
                  onClick={() =>
                    (window.location.href = 'mailto:sammuelryan4050@gmail.com')
                  }
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Write an Email
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = 'tel:+254743248996')}>
                  <Icon name="Phone" size={16} className="mr-2" />
                  Make a Phone Call
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open('https://wa.me/254743248996', '_blank')
                  }
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={() => setShowBookingOptions(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceModal;
