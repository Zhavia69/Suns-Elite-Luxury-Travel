import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

// ✅ Import pages (cleaned & consistent naming)
import HomePage from "./pages/homepage";
import ServiceCatalog from "./pages/service-catalog";
import BookingConfirmationManagement from "./pages/booking-confirmation-management";
import ContactSupport from "./pages/contact-support";
import BookingLookup from "./pages/booking-lookup";
import FleetShowcase from "./pages/fleet-showcase";

const Routes = () => {
return ( <BrowserRouter> <ErrorBoundary> <ScrollToTop /> <RouterRoutes>
{/* ✅ MAIN LANDING PAGE */}
<Route path="/" element={<HomePage />} />

      {/* Other routes */}
      <Route path="/service-catalog" element={<ServiceCatalog />} />
      <Route path="/booking-confirmation-management" element={<BookingConfirmationManagement />} />
      <Route path="/contact-support" element={<ContactSupport />} />
      <Route path="/booking-lookup" element={<BookingLookup />} />
      <Route path="/fleet-showcase" element={<FleetShowcase />} />

      {/* Optional: direct access to homepage */}
      <Route path="/homepage" element={<HomePage />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  </ErrorBoundary>
</BrowserRouter>
);
};

export default Routes;
