import React from 'react';
import VehicleCard from './VehicleCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const VehicleGrid = ({ vehicles, onBookVehicle, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-64 bg-muted"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (vehicles?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Car" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">No Vehicles Found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          No vehicles match your current filters. Try adjusting your search criteria or browse all available vehicles.
        </p>
        <Button
          variant="outline"
          onClick={() => window.location?.reload()}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles?.map((vehicle) => (
        <VehicleCard
          key={vehicle?.id}
          vehicle={vehicle}
          onBookVehicle={onBookVehicle}
        />
      ))}
    </div>
  );
};

export default VehicleGrid;