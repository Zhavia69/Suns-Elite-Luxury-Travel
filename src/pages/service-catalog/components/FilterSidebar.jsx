import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isVisible, 
  onToggle 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'airport-transfer', label: 'Airport Transfers' },
    { value: 'executive-ride', label: 'Executive Rides' },
    { value: 'hourly-chauffeur', label: 'Hourly Chauffeur' },
    { value: 'luxury-drive', label: 'Luxury Drives' },
    { value: 'hotel-transfer', label: 'Hotel Transfers' },
    { value: 'safari-gateway', label: 'Safari Gateways' },
    { value: 'corporate-transport', label: 'Corporate Transport' },
    { value: 'concierge-service', label: 'Concierge Services' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'duration', label: 'Duration' },
    { value: 'newest', label: 'Newest First' }
  ];

  const priceRanges = [
    { id: 'budget', label: 'Budget (Under KSh 5,000)', min: 0, max: 5000 },
    { id: 'mid', label: 'Mid-range (KSh 5,000 - 15,000)', min: 5000, max: 15000 },
    { id: 'premium', label: 'Premium (KSh 15,000 - 30,000)', min: 15000, max: 30000 },
    { id: 'luxury', label: 'Luxury (Above KSh 30,000)', min: 30000, max: Infinity }
  ];

  const features = [
    { id: 'wifi', label: 'Wi-Fi Available' },
    { id: 'refreshments', label: 'Complimentary Refreshments' },
    { id: 'meet-greet', label: 'Meet & Greet Service' },
    { id: 'child-seats', label: 'Child Seats Available' },
    { id: 'luggage-assistance', label: 'Luggage Assistance' },
    { id: '24-7', label: '24/7 Availability' }
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
          </div>
          <Icon name={isVisible ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {/* Filter Sidebar */}
      <div className={`bg-card border border-border rounded-lg p-6 space-y-6 ${
        isVisible ? 'block' : 'hidden lg:block'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>

        {/* Category Filter */}
        <div>
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange('category', value)}
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
          />
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges?.map((range) => (
              <Checkbox
                key={range?.id}
                label={range?.label}
                checked={filters?.priceRanges?.includes(range?.id)}
                onChange={(e) => {
                  const newRanges = e?.target?.checked
                    ? [...filters?.priceRanges, range?.id]
                    : filters?.priceRanges?.filter(id => id !== range?.id);
                  onFilterChange('priceRanges', newRanges);
                }}
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Features</h4>
          <div className="space-y-2">
            {features?.map((feature) => (
              <Checkbox
                key={feature?.id}
                label={feature?.label}
                checked={filters?.features?.includes(feature?.id)}
                onChange={(e) => {
                  const newFeatures = e?.target?.checked
                    ? [...filters?.features, feature?.id]
                    : filters?.features?.filter(id => id !== feature?.id);
                  onFilterChange('features', newFeatures);
                }}
              />
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Availability</h4>
          <div className="space-y-2">
            <Checkbox
              label="Available Today"
              checked={filters?.availableToday}
              onChange={(e) => onFilterChange('availableToday', e?.target?.checked)}
            />
            <Checkbox
              label="Instant Booking"
              checked={filters?.instantBooking}
              onChange={(e) => onFilterChange('instantBooking', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;