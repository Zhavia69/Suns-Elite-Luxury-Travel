import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import ServiceModal from './components/ServiceModal';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import ServiceGrid from './components/ServiceGrid';
import Breadcrumb from './components/Breadcrumb';
import SupportWidget from '../../components/ui/SupportWidget';
import Icon from '../../components/AppIcon';
import { transportService } from '../../utils/supabaseService';

const ServiceCatalog = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState('KES');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'popularity',
    priceRanges: [],
    features: [],
    availableToday: false,
    instantBooking: false
  });

  useEffect(() => {
    loadServices();
    
    // Get currency from localStorage
    const savedCurrency = localStorage.getItem('preferred-currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await transportService?.getServices();
      
      // Transform data to match existing component interface
      const transformedServices = data?.map(service => ({
        id: service?.id,
        name: service?.name,
        category: service?.category?.replace(/_/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase()),
        description: service?.description,
        fullDescription: service?.full_description,
        image: service?.image_url,
        gallery: service?.gallery_urls || [service?.image_url],
        startingPrice: Number(service?.starting_price) || 0,
        duration: service?.duration,
        capacity: service?.capacity,
        isPopular: service?.is_popular,
        keyFeatures: service?.key_features || [],
        pricingDetails: service?.service_pricing?.map(pricing => ({
          label: pricing?.label,
          price: Number(pricing?.price) || 0
        })) || [],
        vehicleOptions: service?.service_vehicles?.map(vehicle => ({
          name: vehicle?.name,
          capacity: vehicle?.capacity,
          price: Number(vehicle?.price) || 0
        })) || []
      })) || [];

      setServices(transformedServices);
      setFilteredServices(transformedServices);
    } catch (error) {
      console.error('Error loading services:', error);
      setError(error?.message || 'Failed to load services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [services, filters, searchTerm]);

  const applyFilters = () => {
    let filtered = [...services];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(service =>
        service?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        service?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        service?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        service?.keyFeatures?.some(feature => 
          feature?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (filters?.category !== 'all') {
      const categoryMap = {
        'airport-transfer': 'Airport Transfer',
        'executive-ride': 'Executive Ride', 
        'hourly-chauffeur': 'Hourly Chauffeur',
        'safari-gateway': 'Safari Gateway',
        'hotel-transfer': 'Hotel Transfer',
        'corporate-transport': 'Corporate Transport',
        'concierge-service': 'Concierge Service',
        'luxury-drive': 'Luxury Drive'
      };
      
      const targetCategory = categoryMap?.[filters?.category] || filters?.category;
      filtered = filtered?.filter(service =>
        service?.category?.toLowerCase()?.includes(targetCategory?.toLowerCase())
      );
    }

    // Apply price range filters
    if (filters?.priceRanges?.length > 0) {
      filtered = filtered?.filter(service => {
        return filters?.priceRanges?.some(rangeId => {
          switch (rangeId) {
            case 'budget':
              return service?.startingPrice < 5000;
            case 'mid':
              return service?.startingPrice >= 5000 && service?.startingPrice < 15000;
            case 'premium':
              return service?.startingPrice >= 15000 && service?.startingPrice < 30000;
            case 'luxury':
              return service?.startingPrice >= 30000;
            default:
              return true;
          }
        });
      });
    }

    // Apply feature filters
    if (filters?.features?.length > 0) {
      filtered = filtered?.filter(service => {
        return filters?.features?.every(featureId => {
          switch (featureId) {
            case 'wifi':
              return service?.keyFeatures?.some(f => f?.toLowerCase()?.includes('wi-fi') || f?.toLowerCase()?.includes('wifi'));
            case 'refreshments':
              return service?.keyFeatures?.some(f => f?.toLowerCase()?.includes('refreshment'));
            case 'meet-greet':
              return service?.keyFeatures?.some(f => f?.toLowerCase()?.includes('meet'));
            case 'child-seats':
              return service?.keyFeatures?.some(f => f?.toLowerCase()?.includes('child'));
            case 'luggage-assistance':
              return service?.keyFeatures?.some(f => f?.toLowerCase()?.includes('luggage'));
            case '24-7':
              return service?.keyFeatures?.some(f => f?.toLowerCase()?.includes('24'));
            default:
              return true;
          }
        });
      });
    }

    // Apply availability filters
    if (filters?.availableToday) {
      // All services are assumed available today
      filtered = filtered?.filter(() => true);
    }

    if (filters?.instantBooking) {
      // Popular services have instant booking
      filtered = filtered?.filter(service => service?.isPopular);
    }

    // Apply sorting
    switch (filters?.sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.startingPrice - b?.startingPrice);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.startingPrice - a?.startingPrice);
        break;
      case 'popularity':
        filtered?.sort((a, b) => (b?.isPopular ? 1 : 0) - (a?.isPopular ? 1 : 0));
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id?.localeCompare(a?.id));
        break;
      case 'duration':
        filtered?.sort((a, b) => a?.duration?.localeCompare(b?.duration));
        break;
      default:
        break;
    }

    setFilteredServices(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      sortBy: 'popularity',
      priceRanges: [],
      features: [],
      availableToday: false,
      instantBooking: false
    });
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
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
            <h2 className="text-xl font-semibold text-foreground mb-2">Unable to Load Services</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={loadServices}
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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Service Catalog - Sun's Travel | Premium Transportation Services</title>
        <meta name="description" content="Explore our comprehensive catalog of luxury transportation services including airport transfers, executive rides, safari gateways, and corporate transport solutions in Kenya." />
        <meta name="keywords" content="luxury transport, airport transfer, executive rides, safari gateway, corporate transport, Kenya, Nairobi" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <Breadcrumb />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
            Premium Transportation Services
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Discover our comprehensive range of luxury transportation solutions designed for discerning travelers. 
            From executive airport transfers to bespoke safari gateways, we deliver exceptional service with 
            professional chauffeurs and premium vehicles.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          searchTerm={searchTerm}
          onClear={handleClearSearch}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isVisible={isFilterVisible}
              onToggle={() => setIsFilterVisible(!isFilterVisible)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  {isLoading ? 'Loading...' : `${filteredServices?.length || 0} Services Available`}
                </h2>
                {searchTerm && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Search" size={14} />
                    <span>Results for "{searchTerm}"</span>
                  </div>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                  className="flex items-center space-x-2 text-primary hover:text-primary/80 luxury-transition"
                >
                  <Icon name="Filter" size={16} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Service Grid */}
            <ServiceGrid
              services={filteredServices}
              onServiceSelect={handleServiceSelect}
              currency={currency}
              isLoading={isLoading}
            />

            {/* No Results */}
            {!isLoading && filteredServices?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Icon name="Search" size={48} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Services Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary hover:text-primary/80 luxury-transition font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currency={currency}
      />
      <SupportWidget />
    </div>
  );
};

export default ServiceCatalog;