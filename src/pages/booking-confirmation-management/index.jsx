import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingHeader from './components/BookingHeader';
import TripDetails from './components/TripDetails';
import BookingTimeline from './components/BookingTimeline';
import InteractiveMap from './components/InteractiveMap';
import FareBreakdown from './components/FareBreakdown';
import ActionButtons from './components/ActionButtons';
import QuickBookingWidget from '../../components/ui/QuickBookingWidget';
import SupportWidget from '../../components/ui/SupportWidget';
import BookingStatusIndicator from '../../components/ui/BookingStatusIndicator';

const BookingConfirmationManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [currency, setCurrency] = useState('KES');

  // Mock booking data - in real app, this would come from API or route state
  const mockBookingData = {
    reference: 'ST2025081800123',
    confirmationDate: '18 Aug 2025, 17:00',
    status: 'driver_assigned',
    serviceType: 'Executive Airport Transfer',
    vehicle: {
      name: 'Mercedes-Benz E-Class',
      category: 'Executive Sedan',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
      capacity: '4',
      luggage: '3 large bags'
    },
    pickup: {
      address: 'Four Points by Sheraton Nairobi Hurlingham, Argwings Kodhek Road, Nairobi',
      dateTime: '2025-08-19T06:30:00',
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    destination: {
      address: 'Jomo Kenyatta International Airport (JKIA), Terminal 1A',
      eta: '07:45 AM',
      coordinates: { lat: -1.3197, lng: 36.8258 }
    },
    route: {
      distance: '28.5 km',
      duration: '45 minutes',
      type: 'Fastest Route'
    },
    passenger: {
      name: 'James Mitchell',
      email: 'james.mitchell@email.com',
      phone: '+254 700 123 456',
      count: '2',
      specialRequests: 'Child seat required for 5-year-old'
    },
    addons: [
      {
        name: 'Child Safety Seat',
        description: 'Premium child seat (5-12 years)',
        price: 'KES 500',
        icon: 'Baby'
      },
      {
        name: 'Meet & Greet Service',
        description: 'Personalized welcome signboard',
        price: 'KES 1,000',
        icon: 'UserCheck'
      },
      {
        name: 'Complimentary Water',
        description: 'Premium bottled water',
        price: 'Included',
        icon: 'Droplets'
      }
    ],
    fareDetails: {
      baseFare: 3500,
      distanceCharge: 2850,
      timeCharge: 450,
      nightSurcharge: 0,
      airportFee: 500,
      addons: 1500,
      distance: 28.5,
      duration: '45 min',
      perKmRate: 100,
      perMinRate: 10,
      tax: 1360,
      mpesaAmount: 5000,
      cardAmount: 3800
    },
    total: 8800,
    driverInfo: {
      name: 'Samuel Kiprotich',
      vehicle: 'Mercedes E-Class • KCB 456X',
      rating: '4.9',
      phone: '+254 700 987 654'
    }
  };

  useEffect(() => {
    // Get currency preference from localStorage
    const savedCurrency = localStorage.getItem('preferred-currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

    // Simulate real-time booking updates
    const interval = setInterval(() => {
      if (currentStep < 4) {
        // Randomly progress booking status for demo
        if (Math.random() > 0.7) {
          setCurrentStep(prev => Math.min(prev + 1, 4));
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const handleActionCallback = (action) => {
    console.log('Action performed:', action);
    
    switch (action) {
      case 'modify_requested':
        navigate('/contact-support', { 
          state: { 
            purpose: 'booking_modification',
            bookingReference: mockBookingData?.reference 
          }
        });
        break;
      case 'support_contacted':
        // Track support interaction
        break;
      default:
        // Handle other actions
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Booking Status Indicator */}
      <BookingStatusIndicator 
        bookingId={mockBookingData?.reference}
        currentStep={currentStep}
      />
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Booking Header */}
        <BookingHeader 
          bookingReference={mockBookingData?.reference}
          confirmationDate={mockBookingData?.confirmationDate}
          status={mockBookingData?.status}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trip Details & Timeline */}
          <div className="lg:col-span-2 space-y-8">
            <TripDetails tripData={mockBookingData} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BookingTimeline 
                currentStep={currentStep}
                driverInfo={mockBookingData?.driverInfo}
              />
              <FareBreakdown 
                fareDetails={mockBookingData?.fareDetails}
                currency={currency}
              />
            </div>
          </div>

          {/* Right Column - Map & Actions */}
          <div className="space-y-6">
            <InteractiveMap 
              pickup={mockBookingData?.pickup}
              destination={mockBookingData?.destination}
              route={mockBookingData?.route}
            />
            
            <ActionButtons 
              bookingData={mockBookingData}
              onAction={handleActionCallback}
            />
          </div>
        </div>

        {/* Quick Booking Widget for New Bookings */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
              Need Another Ride?
            </h2>
            <p className="text-muted-foreground">
              Book your next luxury transportation experience
            </p>
          </div>
          <QuickBookingWidget variant="compact" className="max-w-4xl mx-auto" />
        </div>

        {/* Booking Lookup Link */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Looking for a different booking?</span>
            <button
              onClick={() => navigate('/booking-lookup')}
              className="text-primary hover:text-primary/80 luxury-transition font-medium"
            >
              Search by reference number
            </button>
          </div>
        </div>
      </main>
      {/* Support Widget */}
      <SupportWidget />
    </div>
  );
};

export default BookingConfirmationManagement;