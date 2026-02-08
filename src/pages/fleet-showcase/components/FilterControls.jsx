import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  vehicleCount 
}) => {
  const capacityOptions = [
    { value: '', label: 'Any Capacity' },
    { value: '1-2', label: '1-2 Passengers' },
    { value: '3-4', label: '3-4 Passengers' },
    { value: '5-7', label: '5-7 Passengers' },
    { value: '8+', label: '8+ Passengers' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: 'budget', label: 'Budget (Under KES 5,000)' },
    { value: 'standard', label: 'Standard (KES 5,000 - 15,000)' },
    { value: 'premium', label: 'Premium (KES 15,000 - 30,000)' },
    { value: 'luxury', label: 'Luxury (Above KES 30,000)' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'capacity', label: 'Capacity' },
    { value: 'rating', label: 'Rating' }
  ];

  const hasActiveFilters = filters?.capacity || filters?.priceRange || filters?.sortBy !== 'name';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg">Filter & Sort</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {vehicleCount} vehicle{vehicleCount !== 1 ? 's' : ''} found
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Passenger Capacity"
          options={capacityOptions}
          value={filters?.capacity}
          onChange={(value) => onFilterChange('capacity', value)}
          className="w-full"
        />

        <Select
          label="Price Range"
          options={priceRangeOptions}
          value={filters?.priceRange}
          onChange={(value) => onFilterChange('priceRange', value)}
          className="w-full"
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
          className="w-full"
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            size="default"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="w-full"
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters?.capacity && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                Capacity: {filters?.capacity}
              </span>
            )}
            {filters?.priceRange && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                Price: {priceRangeOptions?.find(opt => opt?.value === filters?.priceRange)?.label}
              </span>
            )}
            {filters?.sortBy !== 'name' && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                Sort: {sortOptions?.find(opt => opt?.value === filters?.sortBy)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;