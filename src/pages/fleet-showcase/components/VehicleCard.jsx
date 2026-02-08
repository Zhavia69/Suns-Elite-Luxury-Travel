import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VehicleCard = ({ vehicle, onBookVehicle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // ✅ Always force vehicles to be available
  const alwaysAvailableVehicle = { ...vehicle, available: true };

  // ✅ Rename certain vehicle names
  const getDisplayName = (name) => {
    if (name === "Executive Sedan" || name === "Luxury Sedan") return "Toyota Voxy";
    if (name === "Luxury SUV" || name === "Luxury Suv") return "Toyota Noah";
    return name; // fallback to original name
  };

  const handleBookVehicle = () => {
    onBookVehicle(alwaysAvailableVehicle);
    navigate('/service-catalog', { state: { selectedVehicle: alwaysAvailableVehicle } });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === alwaysAvailableVehicle?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? alwaysAvailableVehicle?.images?.length - 1 : prev - 1
    );
  };

  const formatPrice = (price, currency) => {
    if (currency === 'USD') {
      return `$${price?.usd}`;
    }
    return `KES ${price?.kes?.toLocaleString()}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg luxury-transition">
  {/* Vehicle Image Gallery */}
  <div className="relative h-64 overflow-hidden">
    <Image
      src={
        getDisplayName(alwaysAvailableVehicle?.name) === "Toyota Voxy"
          ? "https://images.unsplash.com/photo-1654704089788-5ac8eb863818?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : getDisplayName(alwaysAvailableVehicle?.name) === "Toyota Noah"
          ? "https://imgcdn.oto.com/large/gallery/exterior/38/849/toyota-voxy-front-angle-low-view-373951.jpg"
          : "https://images.unsplash.com/photo-1654704089788-5ac8eb863818?q=80&w=800&auto=format&fit=crop"
      }
      alt={`${getDisplayName(alwaysAvailableVehicle?.name)} - Image ${currentImageIndex + 1}`}
      className="w-full h-full object-cover"
    />
  


        {/* ✅ Availability Badge (always "Available") */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success border border-success/30">
            Available
          </span>
        </div>

        {/* Image Navigation */}
        {alwaysAvailableVehicle?.images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 w-8 h-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 w-8 h-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {alwaysAvailableVehicle?.images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full luxury-transition ${
                    index === currentImageIndex
                      ? 'bg-primary'
                      : 'bg-background/60 hover:bg-background/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Vehicle Information */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
              {getDisplayName(alwaysAvailableVehicle?.name)}
            </h3>
            <p className="text-muted-foreground text-sm">{alwaysAvailableVehicle?.category}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-primary">
              From {formatPrice(alwaysAvailableVehicle?.startingPrice, 'KES')}
            </p>
            <p className="text-xs text-muted-foreground">per trip</p>
          </div>
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Icon name="Users" size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Passengers</p>
            <p className="font-medium text-sm">{alwaysAvailableVehicle?.capacity?.passengers}</p>
          </div>
          <div className="text-center">
            <Icon name="Luggage" size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Luggage</p>
            <p className="font-medium text-sm">{alwaysAvailableVehicle?.capacity?.luggage}</p>
          </div>
          <div className="text-center">
            <Icon name="Star" size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Rating</p>
            <p className="font-medium text-sm">{alwaysAvailableVehicle?.rating}</p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {alwaysAvailableVehicle?.keyFeatures?.slice(0, 3)?.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {alwaysAvailableVehicle?.keyFeatures?.length > 3 && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                +{alwaysAvailableVehicle?.keyFeatures?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mb-4 justify-center"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Less Details' : 'More Details'}
        </Button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-border pt-4 space-y-4">
            {/* Full Specifications */}
            <div>
              <h4 className="font-medium text-sm mb-2">Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Engine:</span>
                  <span className="ml-2">{alwaysAvailableVehicle?.specifications?.engine}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fuel:</span>
                  <span className="ml-2">{alwaysAvailableVehicle?.specifications?.fuelType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Year:</span>
                  <span className="ml-2">{alwaysAvailableVehicle?.specifications?.year}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span>
                  <span className="ml-2">{alwaysAvailableVehicle?.specifications?.color}</span>
                </div>
              </div>
            </div>

            {/* All Features */}
            <div>
              <h4 className="font-medium text-sm mb-2">Features & Amenities</h4>
              <div className="grid grid-cols-1 gap-2">
                {alwaysAvailableVehicle?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility Options */}
            {alwaysAvailableVehicle?.accessibility && alwaysAvailableVehicle?.accessibility?.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Accessibility</h4>
                <div className="grid grid-cols-1 gap-2">
                  {alwaysAvailableVehicle?.accessibility?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Heart" size={12} className="text-primary" />
                      <span className="text-xs text-muted-foreground">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ✅ Book Vehicle Button (always enabled) */}
        <Button
          variant="default"
          size="default"
          onClick={handleBookVehicle}
          className="w-full"
          iconName="Calendar"
          iconPosition="left"
        >
          Book This Vehicle
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
