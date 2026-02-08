import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SupportWidget from '../../components/ui/SupportWidget';
import LookupForm from './components/LookupForm';
import MagicLinkSent from './components/MagicLinkSent';
import AlternativeLookup from './components/AlternativeLookup';
import SecurityNotice from './components/SecurityNotice';
import HelpSection from './components/HelpSection';
import Icon from '../../components/AppIcon';
import { bookingService } from '../../utils/supabaseService';

const BookingLookup = () => {
  const [bookingNumber, setBookingNumber] = useState('');
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('lookup');
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Mock data for demonstration
  const mockBookings = [
    {
      email: "john.doe@example.com",
      referenceNumber: "ST240818001",
      travelDate: "2024-08-25"
    },
    {
      email: "sarah.wilson@company.com",
      referenceNumber: "ST240818002",
      travelDate: "2024-08-26"
    }
  ];

  const handleLookup = async (e) => {
    e?.preventDefault();
    if (!bookingNumber?.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const data = await bookingService?.getBookingByNumber(bookingNumber?.trim());
      
      if (data) {
        // Transform data to match existing component interface
        const transformedBooking = {
          id: data?.id,
          bookingNumber: data?.booking_number,
          service: {
            name: data?.services?.name,
            category: data?.services?.category,
            description: data?.services?.description
          },
          vehicle: data?.vehicles ? {
            name: data?.vehicles?.name,
            make: data?.vehicles?.make,
            model: data?.vehicles?.model,
            licensePlate: data?.vehicles?.license_plate
          } : null,
          driver: data?.drivers?.user_profiles ? {
            name: data?.drivers?.user_profiles?.full_name,
            phone: data?.drivers?.user_profiles?.phone
          } : null,
          pickupLocation: data?.pickup_location,
          dropoffLocation: data?.dropoff_location,
          pickupDateTime: data?.pickup_datetime,
          passengerCount: data?.passenger_count,
          totalAmount: data?.total_amount,
          status: data?.status,
          paymentStatus: data?.payment_status,
          createdAt: data?.created_at,
          specialRequests: data?.special_requests
        };
        
        setBooking(transformedBooking);
      } else {
        setError('Booking not found. Please check your booking number.');
      }
    } catch (error) {
      console.error('Error looking up booking:', error);
      setError(error?.message || 'Failed to lookup booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLookup = () => {
    setBookingNumber('');
    setBooking(null);
    setError(null);
  };

  const handleLookupSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      const booking = mockBookings?.find(
        b => b?.email?.toLowerCase() === formData?.email?.toLowerCase() && 
             b?.referenceNumber === formData?.referenceNumber
      );
      
      if (booking) {
        setSubmittedEmail(formData?.email);
        setCurrentView('magic-sent');
      } else {
        // In real app, this would show an error
        alert('Booking not found. Please check your email and reference number, or try the alternative lookup method.');
      }
    } catch (error) {
      console.error('Lookup error:', error);
      alert('An error occurred while searching for your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlternativeLookup = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock search by email and date
      const matchingBookings = mockBookings?.filter(
        b => b?.email?.toLowerCase() === formData?.email?.toLowerCase() &&
             b?.travelDate === formData?.travelDate
      );
      
      if (matchingBookings?.length > 0) {
        setSubmittedEmail(formData?.email);
        setCurrentView('magic-sent');
      } else {
        alert('No bookings found matching your criteria. Please contact support for assistance.');
      }
    } catch (error) {
      console.error('Alternative lookup error:', error);
      alert('An error occurred while searching. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendLink = async () => {
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Magic link resent to:', submittedEmail);
    } catch (error) {
      console.error('Resend error:', error);
    }
  };

  const resetToLookup = () => {
    setCurrentView('lookup');
    setSubmittedEmail('');
  };

  const showAlternative = () => {
    setCurrentView('alternative');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'magic-sent':
        return (
          <MagicLinkSent
            email={submittedEmail}
            onBackToForm={resetToLookup}
            onResendLink={handleResendLink}
          />
        );
      case 'alternative':
        return (
          <AlternativeLookup
            onSubmit={handleAlternativeLookup}
            onBackToMain={resetToLookup}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <LookupForm
            onSubmit={handleLookupSubmit}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Booking Lookup - Sun's Travel | Find Your Reservation</title>
        <meta name="description" content="Securely access your Sun's Travel booking details using your email and reference number. Get instant access to your luxury transportation reservation." />
        <meta name="keywords" content="booking lookup, reservation details, Sun's Travel, luxury transport, Kenya" />
        <meta property="og:title" content="Booking Lookup - Sun's Travel" />
        <meta property="og:description" content="Find and access your luxury transportation booking details securely" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sunstravel.co.ke/booking-lookup" />
      </Helmet>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <span>Home</span>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Booking Lookup</span>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-4">
              Find Your Booking
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access your reservation details securely using your email and booking reference number. 
              We'll send you a secure link to view and manage your booking.
            </p>
          </div>

          {/* Main Form Area */}
          <div className="mb-8">
            {renderCurrentView()}
          </div>

          {/* Alternative Lookup Button - Only show on main lookup view */}
          {currentView === 'lookup' && (
            <div className="text-center mb-8">
              <button
                onClick={showAlternative}
                className="text-primary hover:text-primary/80 text-sm font-medium luxury-transition"
              >
                Don't have your reference number? Try alternative lookup →
              </button>
            </div>
          )}

          {/* Security Notice */}
          <SecurityNotice />

          {/* Help Section */}
          <HelpSection />

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Trusted by Travelers Across Kenya
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>Secure Booking System</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span>5-Star Rated Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span>10,000+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LookupForm 
          bookingNumber={bookingNumber}
          setBookingNumber={setBookingNumber}
          onSubmit={handleLookup}
          isLoading={isLoading}
        />
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={20} className="text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={handleClearLookup}
              className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
            >
              Try Different Number
            </button>
          </div>
        )}

        {booking && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Booking Details
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking?.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking?.status === 'completed'? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                }`}>
                  {booking?.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Booking Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking Number:</span>
                      <span className="font-medium">{booking?.bookingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{booking?.service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-medium">KES {booking?.totalAmount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Status:</span>
                      <span className={`font-medium ${
                        booking?.paymentStatus === 'paid' ? 'text-green-600' :
                        booking?.paymentStatus === 'pending'? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {booking?.paymentStatus?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Trip Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pickup:</span>
                      <div className="font-medium">{booking?.pickupLocation}</div>
                    </div>
                    {booking?.dropoffLocation && (
                      <div>
                        <span className="text-muted-foreground">Dropoff:</span>
                        <div className="font-medium">{booking?.dropoffLocation}</div>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pickup Time:</span>
                      <span className="font-medium">
                        {new Date(booking?.pickupDateTime)?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers:</span>
                      <span className="font-medium">{booking?.passengerCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {booking?.vehicle && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium text-foreground mb-2">Assigned Vehicle</h3>
                  <p className="text-sm">
                    {booking?.vehicle?.name} - {booking?.vehicle?.make} {booking?.vehicle?.model}
                    {booking?.vehicle?.licensePlate && (
                      <span className="ml-2 text-muted-foreground">
                        ({booking?.vehicle?.licensePlate})
                      </span>
                    )}
                  </p>
                </div>
              )}
              
              {booking?.driver && (
                <div className="mt-4">
                  <h3 className="font-medium text-foreground mb-2">Driver Information</h3>
                  <div className="text-sm">
                    <p>{booking?.driver?.name}</p>
                    {booking?.driver?.phone && (
                      <p className="text-muted-foreground">{booking?.driver?.phone}</p>
                    )}
                  </div>
                </div>
              )}
              
              {booking?.specialRequests && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium text-foreground mb-2">Special Requests</h3>
                  <p className="text-sm text-muted-foreground">{booking?.specialRequests}</p>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t flex justify-between text-xs text-muted-foreground">
                <span>Booking created: {new Date(booking?.createdAt)?.toLocaleDateString()}</span>
                <button
                  onClick={handleClearLookup}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Search Another Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <SupportWidget />
    </div>
  );
};

export default BookingLookup;