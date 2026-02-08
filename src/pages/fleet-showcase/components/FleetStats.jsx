import React from 'react';
import Icon from '../../../components/AppIcon';

const FleetStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'Car',
      label: 'Total Vehicles',
      value: stats?.totalVehicles,
      color: 'text-primary'
    },
    {
      icon: 'Users',
      label: 'Max Capacity',
      value: `${stats?.maxCapacity} passengers`,
      color: 'text-success'
    },
    {
      icon: 'MapPin',
      label: 'Service Areas',
      value: `${stats?.serviceAreas} locations`,
      color: 'text-warning'
    },
    {
      icon: 'Clock',
      label: 'Availability',
      value: '24/7 Service',
      color: 'text-accent'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-muted/50 rounded-lg mx-auto mb-3">
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <p className="font-semibold text-lg text-foreground mb-1">{stat?.value}</p>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetStats;