import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CategoryTabs from './components/CategoryTabs';
import FilterControls from './components/FilterControls';
import VehicleGrid from './components/VehicleGrid';
import FleetStats from './components/FleetStats';
import QuickBookingWidget from '../../components/ui/QuickBookingWidget';
import SupportWidget from '../../components/ui/SupportWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { fleetService } from '../../utils/supabaseService';

const FleetShowcase = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    capacity: '',
    priceRange: '',
    sortBy: 'name'
  });

  // Mock fleet data
  const categories = [
    {
      id: 'all',
      name: 'All Vehicles',
      description: 'Browse our complete luxury fleet collection with premium vehicles for every occasion'
    },
    // {
    //   id: 'executive-sedans',
    //   name: 'Executive Sedans',
    //   description: 'Sophisticated sedans perfect for business meetings and airport transfers'
    // },
    // {
    //   id: 'luxury-suvs',
    //   name: 'Luxury SUVs',
    //   description: 'Spacious and comfortable SUVs ideal for families and group travel'
    // },
    // {
    //   id: 'premium-vans',
    //   name: 'Premium Vans',
    //   description: 'High-capacity vehicles for large groups and corporate events'
    // },
    // {
    //   id: 'specialty',
    //   name: 'Specialty Vehicles',
    //   description: 'Unique vehicles for special occasions and VIP transportation'
    // }
  ];

  // Fleet stats data
  const fleetStats = [
    { label: 'Total Vehicles', value: vehicles.length, icon: 'Car' },
    { label: 'Available Now', value: vehicles.filter(v => v.isAvailable).length, icon: 'CheckCircle' },
    { label: 'Vehicle Types', value: new Set(vehicles.map(v => v.type)).size, icon: 'Grid' },
    { label: 'Years Experience', value: '15+', icon: 'Award' }
  ];

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fleetService?.getVehicles();
      
      // Transform data to match existing component interface
      const transformedVehicles = data?.map(vehicle => ({
        id: vehicle?.id,
        name: vehicle?.name,
        make: vehicle?.make,
        model: vehicle?.model,
        year: vehicle?.year,
        category: vehicle?.vehicle_type?.replace(/_/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase()),
        type: vehicle?.vehicle_type,
        capacity: vehicle?.capacity,
        image: vehicle?.image_url,
        features: vehicle?.features || [],
        isAvailable: vehicle?.is_available,
        licensePlate: vehicle?.license_plate
      })) || [];

      setVehicles(transformedVehicles);
      setFilteredVehicles(transformedVehicles);
    } catch (error) {
      console.error('Error loading vehicles:', error);
      setError(error?.message || 'Failed to load vehicles. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles?.filter(vehicle => 
        vehicle?.type === selectedCategory || 
        vehicle?.category?.toLowerCase()?.includes(selectedCategory?.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
  }, [selectedCategory, vehicles]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      capacity: '',
      priceRange: '',
      sortBy: 'name'
    });
  };

  const handleVehicleSelect = (vehicle) => {
    console.log('Selected vehicle:', vehicle);
    // Store selected vehicle in localStorage for booking flow
    localStorage.setItem('selected-vehicle', JSON.stringify(vehicle));
  };

  const handleBookVehicle = (vehicle) => {
    console.log('Booking vehicle:', vehicle);
    // Store selected vehicle in localStorage for booking flow
    localStorage.setItem('selected-vehicle', JSON.stringify(vehicle));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <Icon name="AlertCircle" size={48} />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Unable to Load Fleet</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={loadVehicles}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Luxury Fleet Showcase - Sun's Travel | Premium Vehicles Kenya</title>
        <meta name="description" content="Explore Sun's Travel luxury fleet featuring executive sedans, luxury SUVs, premium vans, and specialty vehicles. Professional chauffeur service in Kenya with 24/7 availability." />
        <meta name="keywords" content="luxury vehicles Kenya, executive transport, chauffeur service, premium cars, airport transfer vehicles, corporate transport fleet" />
        <meta property="og:title" content="Luxury Fleet Showcase - Sun's Travel" />
        <meta property="og:description" content="Browse our premium vehicle collection for luxury transportation in Kenya" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sunstravel.co.ke/fleet-showcase" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-background to-muted/20 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Icon name="Car" size={32} className="text-primary" />
                <span className="text-primary font-medium">Premium Fleet</span>
              </div>
              <h1 className="font-heading font-semibold text-4xl lg:text-6xl text-foreground mb-6">
                Luxury Vehicle
                <span className="text-primary block">Collection</span>
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-8">
                Discover our meticulously maintained fleet of premium vehicles, each designed to provide the ultimate in comfort, safety, and sophistication for your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => document.getElementById('fleet-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  iconName="ArrowDown"
                  iconPosition="right"
                >
                  Browse Fleet
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/service-catalog'}
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Stats */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <FleetStats stats={fleetStats} />
          </div>
        </section>

        {/* Main Fleet Content */}
        <section className="py-12" id="fleet-grid">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Category Navigation */}
            <CategoryTabs
              categories={categories}
              activeCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Filter Controls */}
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              vehicleCount={filteredVehicles?.length}
            />

            {/* Vehicle Grid */}
            <VehicleGrid
              vehicles={filteredVehicles}
              onVehicleSelect={handleVehicleSelect}
              onBookVehicle={handleBookVehicle}
              isLoading={isLoading}
            />

            {/* No Results */}
            {!isLoading && filteredVehicles?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Icon name="Car" size={48} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Vehicles Found</h3>
                <p className="text-muted-foreground mb-4">
                  No vehicles match the selected category.
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-primary hover:text-primary/80 luxury-transition font-medium"
                >
                  Show All Vehicles
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Booking Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading font-semibold text-3xl text-foreground mb-4">
                Ready to Book?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start your luxury journey today with our quick booking system. Select your preferred vehicle and let us handle the rest.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <QuickBookingWidget variant="compact" />
            </div>
          </div>
        </section>

        {/* Support Widget */}
        <SupportWidget />
      </div>
    </>
  );
};

export default FleetShowcase;