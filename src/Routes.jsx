import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ServiceCatalog from './pages/service-catalog';
import BookingConfirmationManagement from './pages/booking-confirmation-management';
import ContactSupport from './pages/contact-support';
import BookingLookup from './pages/booking-lookup';
import Homepage from './pages/homepage';
import FleetShowcase from './pages/fleet-showcase';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BookingConfirmationManagement />} />
        <Route path="/service-catalog" element={<ServiceCatalog />} />
        <Route path="/booking-confirmation-management" element={<BookingConfirmationManagement />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/booking-lookup" element={<BookingLookup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/fleet-showcase" element={<FleetShowcase />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
